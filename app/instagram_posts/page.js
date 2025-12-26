import { useEffect, useState } from "react";
import Image from "next/image";

export default function InstagramPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://yourdomain.com/api/instagram_feed.php")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setPosts([]));
  }, []);

  return (
    <main style={{ padding: "50px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>Instagram Feed</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {posts.map(post => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
            {post.media_type === "VIDEO" ? (
              <video
                src={post.media_url}
                muted
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px"
                }}
              />
            ) : (
              <Image
                src={post.media_url}
                alt={post.caption || "Instagram"}
                width={300}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px"
                }}
              />
            )}
          </a>
        ))}
      </div>
    </main>
  );
}
