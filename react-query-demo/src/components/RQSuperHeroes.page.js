//1. import hook from react-query
import axios from "axios";
import { useQuery } from "react-query"; // all data fetching hook

// results is an object that includes all the info that i've ever need
// so you have to distructure.
// isLoading - loading status, data - holding the data
// just made it into the function to avoid inline function
const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  // results is an object that includes all the info that i've ever need
  // so you have to distructure.
  // isLoading - loading status, data - holding the data
  // isError - error status
  // error- error thrown from axios
  // isFetching - isLoading is not changed, background isFetching is going on. (flag)
  // refetch - manually trigger the query.

  // want sideAffect after fetch (like opening modal and so on...)
  const onSuccess = (data) => {
    console.log("perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("perform side effect after encoutering error", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // cacheTime: 5000, // time that takes be cached.
      // staleTime: 30000, // time that takes to change from fresh to stale. When it's fresh, even though query instance is mounted newly, fetch won't happen (query is not fetched in background) (for 30 seconds). Put what's not updated so often. default is zero.
      refetchOnMount: true, // default is true. Every time component is mounted, it will be refetched.
      // refetchOnMount: "aways", // whether it's stale or not, it will be refetched every single time
      // refetchOnWindowFocus: true, // In traditional way, component detects data change once it's refreshed, but if you set it to true, UI will be synced with remote data.
      // polling : fetching the data in refular interval. (like stock  - every single 1second)
      refetchInterval: 2000, // query will automatically refetch in every 2 seconds.
      refetchIntervalInBackground: true, // even browser is not focused it's still keep refetching in interval
      // how to fetch on click but not on component mount
      enabled: false,
      onSuccess,
      onError,
      // automatically receive data as argument
      // select: (data) => {
      //   const superHeroNames = data.data.map((hero) => hero.name);
      //   return superHeroNames;
      // },
    }
  );
  // at least 2 argument (unikey to identify this query)
  // second argument : call back func that returns a promise (make a get request to server)
  // third argument : configure cache time, default is 5 min, but if you want to change, set Cache time.
  // Stale time : doesn't necessarily change too often.
  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  // after a delay we see a error message,
  // it's because react-query retrys api fail
  if (isError) {
    // error itself is just object so just display error.message
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>fetch heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
      {/* heroName refers to superHeroNames in select */}
      {/* {data.map((heroName) => (
        <div>{heroName}</div>
      ))} */}
    </>
  );
};
