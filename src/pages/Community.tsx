import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, Trash2, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

interface Profile {
  user_id: string;
  username: string | null;
  display_name: string | null;
}

interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: Profile;
  likes: { user_id: string }[];
  comments: Comment[];
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: Profile;
}

const postSchema = z.string().trim().min(1, "Post cannot be empty").max(1000, "Max 1000 characters");
const commentSchema = z.string().trim().min(1, "Comment cannot be empty").max(500, "Max 500 characters");

const initials = (p?: Profile) => {
  const name = p?.display_name || p?.username || "U";
  return name.slice(0, 2).toUpperCase();
};

const Community = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<"feed" | "members">("feed");
  const [posts, setPosts] = useState<Post[]>([]);
  const [members, setMembers] = useState<Profile[]>([]);
  const [newPost, setNewPost] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setLoading(true);
    const [postsRes, profilesRes] = await Promise.all([
      supabase.from("posts").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("user_id, username, display_name"),
    ]);

    const profileMap = new Map<string, Profile>();
    (profilesRes.data || []).forEach((p) => profileMap.set(p.user_id, p));
    setMembers(profilesRes.data || []);

    const postIds = (postsRes.data || []).map((p) => p.id);
    const [likesRes, commentsRes] = await Promise.all([
      postIds.length
        ? supabase.from("likes").select("post_id, user_id").in("post_id", postIds)
        : Promise.resolve({ data: [] as any[] }),
      postIds.length
        ? supabase.from("comments").select("*").in("post_id", postIds).order("created_at", { ascending: true })
        : Promise.resolve({ data: [] as any[] }),
    ]);

    const enriched: Post[] = (postsRes.data || []).map((p) => ({
      ...p,
      profile: profileMap.get(p.user_id),
      likes: (likesRes.data || []).filter((l: any) => l.post_id === p.id),
      comments: (commentsRes.data || [])
        .filter((c: any) => c.post_id === p.id)
        .map((c: any) => ({ ...c, profile: profileMap.get(c.user_id) })),
    }));
    setPosts(enriched);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCreatePost = async () => {
    if (!user) return;
    const parsed = postSchema.safeParse(newPost);
    if (!parsed.success) {
      toast({ title: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("posts").insert({ user_id: user.id, content: parsed.data });
    if (error) return toast({ title: "Could not post", description: error.message, variant: "destructive" });
    setNewPost("");
    loadAll();
  };

  const handleDeletePost = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return toast({ title: "Could not delete", variant: "destructive" });
    loadAll();
  };

  const handleToggleLike = async (post: Post) => {
    if (!user) return toast({ title: "Sign in to like posts" });
    const liked = post.likes.some((l) => l.user_id === user.id);
    if (liked) {
      await supabase.from("likes").delete().eq("post_id", post.id).eq("user_id", user.id);
    } else {
      await supabase.from("likes").insert({ post_id: post.id, user_id: user.id });
    }
    loadAll();
  };

  const handleAddComment = async (postId: string) => {
    if (!user) return;
    const draft = commentDrafts[postId] || "";
    const parsed = commentSchema.safeParse(draft);
    if (!parsed.success) {
      toast({ title: parsed.error.errors[0].message, variant: "destructive" });
      return;
    }
    const { error } = await supabase
      .from("comments")
      .insert({ post_id: postId, user_id: user.id, content: parsed.data });
    if (error) return toast({ title: "Could not comment", variant: "destructive" });
    setCommentDrafts((d) => ({ ...d, [postId]: "" }));
    loadAll();
  };

  const handleDeleteComment = async (id: string) => {
    await supabase.from("comments").delete().eq("id", id);
    loadAll();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 lg:px-8 pt-24 pb-12 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Community</h1>
          <p className="text-muted-foreground mt-2 text-sm">Share recipes, swap tips, meet other cooks.</p>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          {(["feed", "members"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "feed" ? "Feed" : `Members (${members.length})`}
            </button>
          ))}
        </div>

        {tab === "feed" && (
          <>
            {user ? (
              <div className="rounded-card shadow-card bg-background p-4 mb-6 border border-border">
                <Textarea
                  placeholder="Share something with the community…"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  maxLength={1000}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-muted-foreground tabular-nums">{newPost.length}/1000</span>
                  <Button onClick={handleCreatePost} size="sm" className="rounded-full">
                    <Send className="w-4 h-4 mr-1" /> Post
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-card bg-secondary/40 p-4 mb-6 text-sm text-muted-foreground text-center">
                <Link to="/auth" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>{" "}
                to share posts and join the conversation.
              </div>
            )}

            {loading ? (
              <p className="text-muted-foreground text-sm text-center py-12">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-12">
                No posts yet. Be the first to share!
              </p>
            ) : (
              <div className="space-y-4">
                {posts.map((post, i) => {
                  const liked = user && post.likes.some((l) => l.user_id === user.id);
                  const isMine = user?.id === post.user_id;
                  const showComments = openComments[post.id];
                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="rounded-card shadow-card bg-background p-5 border border-border"
                    >
                      <header className="flex items-start gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-display font-semibold text-sm">
                            {initials(post.profile)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-foreground text-sm">
                            {post.profile?.display_name || post.profile?.username || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(post.created_at).toLocaleString()}
                          </p>
                        </div>
                        {isMine && (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Delete post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </header>
                      <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">{post.content}</p>

                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                        <button
                          onClick={() => handleToggleLike(post)}
                          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                            liked ? "text-primary" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                          <span className="tabular-nums">{post.likes.length}</span>
                        </button>
                        <button
                          onClick={() => setOpenComments((s) => ({ ...s, [post.id]: !s[post.id] }))}
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="tabular-nums">{post.comments.length}</span>
                        </button>
                      </div>

                      {showComments && (
                        <div className="mt-4 space-y-3">
                          {post.comments.map((c) => (
                            <div key={c.id} className="flex items-start gap-2 text-sm">
                              <Avatar className="w-7 h-7">
                                <AvatarFallback className="bg-secondary text-foreground text-[10px] font-semibold">
                                  {initials(c.profile)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 bg-secondary/50 rounded-card-inner px-3 py-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-semibold text-xs text-foreground">
                                    {c.profile?.display_name || c.profile?.username || "Anonymous"}
                                  </span>
                                  {user?.id === c.user_id && (
                                    <button
                                      onClick={() => handleDeleteComment(c.id)}
                                      className="text-muted-foreground hover:text-destructive"
                                      aria-label="Delete comment"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                                <p className="text-foreground text-sm whitespace-pre-wrap">{c.content}</p>
                              </div>
                            </div>
                          ))}
                          {user && (
                            <div className="flex gap-2 pt-1">
                              <Input
                                placeholder="Write a comment…"
                                value={commentDrafts[post.id] || ""}
                                onChange={(e) =>
                                  setCommentDrafts((d) => ({ ...d, [post.id]: e.target.value }))
                                }
                                maxLength={500}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddComment(post.id);
                                  }
                                }}
                              />
                              <Button size="sm" onClick={() => handleAddComment(post.id)}>
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.article>
                  );
                })}
              </div>
            )}
          </>
        )}

        {tab === "members" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.length === 0 ? (
              <p className="text-muted-foreground text-sm col-span-full text-center py-12">
                No members yet.
              </p>
            ) : (
              members.map((m) => (
                <div
                  key={m.user_id}
                  className="rounded-card shadow-card bg-background p-4 border border-border flex items-center gap-3"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-display font-semibold">
                      {initials(m)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground truncate">
                      {m.display_name || m.username || "Anonymous"}
                    </p>
                    {m.username && (
                      <p className="text-xs text-muted-foreground truncate">@{m.username}</p>
                    )}
                  </div>
                </div>
              ))
            )}
            <div className="col-span-full text-center text-xs text-muted-foreground flex items-center justify-center gap-1 mt-2">
              <Users className="w-3 h-3" /> {members.length} member{members.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Community;
