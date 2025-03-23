import { useState, useEffect } from "react";
import axios from "axios";

export function useMediumPosts(username = "milindkusahu") {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
        );

        if (response.status !== 200 || response.data.status !== "ok") {
          throw new Error("Failed to fetch Medium posts");
        }

        if (!response.data.items || response.data.items.length === 0) {
          throw new Error("No Medium posts found");
        }

        const mediumPosts = response.data.items.map((item) => {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = item.content;

          let thumbnail = item.thumbnail;

          if (!thumbnail) {
            const imgElement = tempDiv.querySelector("img");
            if (imgElement && imgElement.src) {
              thumbnail = imgElement.src;
            }
          }

          if (!thumbnail) {
            thumbnail =
              "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png";
          }

          let excerpt = item.description || "";

          if (!excerpt || excerpt.startsWith("<")) {
            const paragraphs = tempDiv.querySelectorAll("p");
            for (let i = 0; i < paragraphs.length; i++) {
              const text = paragraphs[i].textContent.trim();
              if (text.length > 10) {
                excerpt = text;
                break;
              }
            }
          }

          excerpt = excerpt.replace(/<[^>]*>/g, "");

          if (excerpt.length > 160) {
            excerpt = excerpt.substring(0, 157) + "...";
          }

          const pubDate = new Date(item.pubDate);

          return {
            id: item.guid || Math.random().toString(36).substring(2, 15),
            title: item.title || "Untitled",
            link: item.link || "",
            pubDate,
            formattedDate: pubDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            excerpt,
            thumbnail,
            readTime: calculateReadTime(tempDiv.textContent),
            author: username,
          };
        });

        setPosts(mediumPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching Medium posts:", err);
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, [username]);

  return { posts, loading, error };
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content ? content.trim().split(/\s+/).length : 0;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${readTimeMinutes} min read`;
}

export default useMediumPosts;
