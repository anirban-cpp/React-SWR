import axios from "axios";
import useSWR from "swr";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

// useSWR does re-fetching on focus and also caching

const FetchData = () => {
  const { data, error } = useSWR(
    "http://jsonplaceholder.typicode.com/users",
    fetcher
  );

  if (error) return <h1>{error}</h1>;

  return (
    <div className="App">
      {data ? (
        data.map((user) => <h1 key={user.id}>{user.name}</h1>)
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default FetchData;
