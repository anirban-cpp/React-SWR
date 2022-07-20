import useSWR from "swr";

// useSWR does re-fetching on focus and also caching

const Users = () => {
  const { data, error } = useSWR("http://jsonplaceholder.typicode.com/users");

  if (error) return <h1>{error}</h1>;

  return (
    <div className="users">
      <h1 style={{ marginBottom: '2rem' }}>Fetcher from SWRConfig</h1>
      {data ? (
        data.map((user) => <h1 key={user.id}>{user.name}</h1>)
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Users;
