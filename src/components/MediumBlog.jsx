import { useMediumPosts } from "./MediumBlogFetcher";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FALLBACK_POSTS = [
  {
    id: "fallback-1",
    title: "Building Responsive React Components with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive UI components using React and Tailwind CSS. This guide walks through best practices and common patterns.",
    thumbnail: "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png",
    link: "https://medium.com/@milindkusahu",
    formattedDate: "Mar 15, 2025",
    readTime: "5 min read",
    author: "milindkusahu",
  },
  {
    id: "fallback-2",
    title: "Optimizing Performance in React Applications",
    excerpt:
      "Discover techniques to improve the performance of your React applications, from code splitting to memoization and efficient state management.",
    thumbnail: "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png",
    link: "https://medium.com/@milindkusahu",
    formattedDate: "Feb 28, 2025",
    readTime: "7 min read",
    author: "milindkusahu",
  },
  {
    id: "fallback-3",
    title: "Creating Animations with GSAP in React",
    excerpt:
      "A comprehensive guide to implementing smooth animations in your React projects using GreenSock Animation Platform (GSAP).",
    thumbnail: "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png",
    link: "https://medium.com/@milindkusahu",
    formattedDate: "Jan 20, 2025",
    readTime: "6 min read",
    author: "milindkusahu",
  },
];

function MediumBlog() {
  const {
    posts: fetchedPosts,
    loading,
    error,
  } = useMediumPosts("milindkusahu");
  const [displayPosts, setDisplayPosts] = useState([]);
  const [useFallback, setUseFallback] = useState(false);
  const containerRef = useRef(null);
  const retryTimeoutRef = useRef(null);

  const placeholderImage =
    "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png";

  useEffect(() => {
    if (loading) return;

    if (error || fetchedPosts.length === 0) {
      if (!useFallback) {
        console.log("Using fallback posts due to error:", error);
        setUseFallback(true);
        setDisplayPosts(FALLBACK_POSTS);

        retryTimeoutRef.current = setTimeout(() => {
          setUseFallback(false);
        }, 30000);
      }
    } else {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      setUseFallback(false);
      setDisplayPosts(fetchedPosts);
    }
  }, [fetchedPosts, loading, error, useFallback]);

  useEffect(() => {
    if (displayPosts.length > 0 && containerRef.current) {
      gsap.from(".blog-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }
  }, [displayPosts]);

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="medium-blog">
      <h2 className="headline-2 mb-8">From My Blog</h2>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-zinc-800/50 rounded-xl h-96 animate-pulse"
            >
              <div className="h-48 bg-zinc-700/50"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-zinc-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-700/50 rounded"></div>
                <div className="h-4 bg-zinc-700/50 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : displayPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              key={post.id}
              className="blog-card group bg-zinc-800/30 rounded-xl overflow-hidden hover:bg-zinc-800/50 transition-colors border border-zinc-700/30 hover:border-zinc-700/70 block h-full"
            >
              <div className="h-48 overflow-hidden bg-zinc-700/20">
                <img
                  src={post.thumbnail || placeholderImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = placeholderImage;
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-xl font-medium text-zinc-50 line-clamp-2">
                    {post.title}
                  </h3>
                </div>
                <p className="text-zinc-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>{post.formattedDate}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-zinc-400">
            No posts found. Start writing on Medium to see your posts here!
          </p>
        </div>
      )}

      {useFallback && (
        <div className="mt-4 text-center">
          <p className="text-zinc-400 text-sm italic">
            Displaying sample posts while trying to connect to Medium...
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <a
          href={`https://medium.com/@${
            displayPosts[0]?.author || "milindkusahu"
          }`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary inline-flex items-center"
        >
          Read More on Medium
          <span className="material-symbols-rounded">arrow_forward</span>
        </a>
      </div>
    </div>
  );
}

export default MediumBlog;
