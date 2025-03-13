import { useState, useEffect } from "react";

export function useMediumPosts(username = "milindkusahu") {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        setLoading(true);

        const corsProxy = "https://api.allorigins.win/get?url=";
        const mediumRssFeed = `https://medium.com/feed/@${username}`;
        const encodedUrl = encodeURIComponent(mediumRssFeed);

        const response = await fetch(`${corsProxy}${encodedUrl}`);
        const data = await response.json();

        if (!data.contents) {
          throw new Error("Failed to fetch Medium posts");
        }

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");

        const items = xmlDoc.querySelectorAll("item");
        const mediumPosts = await Promise.all(
          Array.from(items).map(async (item) => {
            const content =
              item.querySelector("content\\:encoded")?.textContent || "";
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = content;

            const link = item.querySelector("link")?.textContent || "";

            let thumbnail = null;
            try {
              if (link) {
                const articleResponse = await fetch(
                  `${corsProxy}${encodeURIComponent(link)}`
                );
                const articleData = await articleResponse.json();

                if (articleData.contents) {
                  const articleDoc = new DOMParser().parseFromString(
                    articleData.contents,
                    "text/html"
                  );

                  // Try to extract Open Graph image
                  const ogImage = articleDoc.querySelector(
                    'meta[property="og:image"]'
                  );
                  if (ogImage && ogImage.getAttribute("content")) {
                    thumbnail = ogImage.getAttribute("content");
                  }

                  // If no OG image, try Twitter image
                  if (!thumbnail) {
                    const twitterImage = articleDoc.querySelector(
                      'meta[name="twitter:image"]'
                    );
                    if (twitterImage && twitterImage.getAttribute("content")) {
                      thumbnail = twitterImage.getAttribute("content");
                    }
                  }
                }
              }
            } catch (imgError) {
              console.warn("Error fetching OG image:", imgError);
              // Continue without the image
            }

            // If still no image, extract from content as before (fallback)
            if (!thumbnail) {
              // Try to find Medium's featured image
              const featuredImage = tempDiv.querySelector(
                'img[src*="cdn-images"]'
              );
              if (featuredImage && featuredImage.src) {
                thumbnail = featuredImage.src;
              } else if (tempDiv.querySelector("img")) {
                // Get any image as last resort
                thumbnail = tempDiv.querySelector("img").src;
              }
            }

            // Extract the first paragraph for excerpt
            let excerpt = "";
            const paragraphs = tempDiv.querySelectorAll("p");
            for (let i = 0; i < paragraphs.length; i++) {
              const text = paragraphs[i].textContent.trim();
              if (text.length > 10) {
                // Ensure it's not an empty paragraph
                excerpt = text;
                break;
              }
            }

            // Shorten excerpt if needed
            if (excerpt.length > 160) {
              excerpt = excerpt.substring(0, 157) + "...";
            }

            // Get publication date
            const pubDate = new Date(
              item.querySelector("pubDate")?.textContent || ""
            );

            const guid = item.querySelector("guid")?.textContent || "";

            const postId = guid.split("/").pop();

            return {
              id: postId,
              title: item.querySelector("title")?.textContent || "Untitled",
              link,
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
          })
        );

        setPosts(mediumPosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching Medium posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, [username]);

  return { posts, loading, error };
}

function calculateReadTime(content) {
  // Average reading speed (words per minute)
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${readTimeMinutes} min read`;
}

export default useMediumPosts;
