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
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes",
    fetchSuperHeroes
  ); // at least 2 argument (unikey to identify this query)
  // second argument : call back func that returns a promise (make a get request to server)

  if (isLoading) {
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
      {data?.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </>
  );
};
