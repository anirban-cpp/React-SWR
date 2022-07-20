import "./App.css";
import FetchData from "./components/FetchData";
import { SWRConfig } from "swr";
import Users from "./components/Users";
import axios from "axios";
import Posts from "./components/Posts";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

/*
  SWR first provides the data from the cache and in the meantime, sends the request to get updated data
  and based on that revalidates the data (provides updated data)
*/

function App() {
  return (
    <div className="App">
      <FetchData />
      <SWRConfig value={{ fetcher }}>
        {/* Now all components wrapped by this config can get the data without requiring the fetcher */}
        {/* This is useful if we need to get data by switching routes. Every time we switch routes if we have to fetch data, it is redundunt.
            This is a solution */}
        <Users />
      </SWRConfig>
      <Posts/>
    </div>
  );
}

export default App;
