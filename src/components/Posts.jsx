import useSWR, { mutate } from "swr";
import axios from "axios";

// useSWR does re-fetching on focus and also caching
// we can disable revalidation on focus by specifying it in the options

/*
    Say we are already focusing on the screen and during that time data is changed,
    to ensure that happens we use the mutate method
    The mutate method checks our end-point and if there is new data it only fetches that and adds
    it to our cached data. As such we get updated data even though we were still focusing on our webpage
*/

const fetcher = (...args) => axios(...args).then((res) => res.data);

const Post = {
  userId: 11,
  id: 101,
  title: "new Post",
  body: "new Post body",
};

const Posts = () => {
  const { data, error } = useSWR(
    "http://jsonplaceholder.typicode.com/posts",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  ); // in this case if user moves away and again focuses back, re-fetching of data won't happen

  if (!data && !error) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>
        Posts Fetch No relvalidation on focus
      </h1>
      {data.splice(0, 10).map((post) => (
        <h1 key={post.id}>{post.title}</h1>
      ))}
      <button
        className="add-btn"
        onClick={async () => {
          await fetcher("http://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(Post),
          });
          mutate("http://jsonplaceholder.typicode.com/posts");
        }}
      >
        Add Post
      </button>
    </div>
  );
};

export default Posts;
