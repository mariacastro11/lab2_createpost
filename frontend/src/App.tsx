import { useEffect, useState } from "react";
import "./App.css";

interface Post {
  id: string;
  title: string;
  img_url: string;
  description: string;
}

function App() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://lab2-createpost.vercel.app/posts");
      const data = await res.json();
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const post = async (title: string, img_url: string, description: string) => {
    const res = await fetch("https://lab2-createpost.vercel.app/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, img_url, description }),
    });

    const newPost = await res.json();

    setPosts((prevPosts) => [newPost, ...prevPosts]);

    setTitle("");
    setImage("");
    setDescription("");

    setPage(0);
  };

  const deletePost = async (id: string) => {
    const res = await fetch(`https://lab2-createpost.vercel.app/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

    const data = await res.json();
    console.log(data);
  };

  const pageRendering = () => {
    if (page == 0) {
      return (
        <div>
          <h1>Posts</h1>
          <button onClick={() => setPage(1)}>New Post</button>
          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <h2>{post.title}</h2>
                <img src={post.img_url} />
                <p>{post.description}</p>
                <button onClick={() => deletePost(post.id)}>Delete Post</button>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => setPage(0)}>Posts</button>
          <h1>New Post</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              post(title, image, description);
            }}
          >
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                value={image}
                type="text"
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>

            <button type="submit">Create Post</button>
          </form>
        </div>
      );
    }
  };
  return <div className="container">{pageRendering()}</div>;
}

export default App;