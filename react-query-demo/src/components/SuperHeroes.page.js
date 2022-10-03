import { useState, useEffect } from "react";
import axios from "axios";

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(""); // add state to track error

  // classic way to do it
  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data); // subkcal도 async 안 쓰고 이렇게 하면 될 듯
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false); // classic way to do it
      });
  }, []);

  // 함수가 JSX 리턴하는 거 왜 나 자주 안쓰지..?
  if (isLoading) {
    return <h3>Loading..</h3>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <h3 key={hero.name}>{hero.name}</h3>;
      })}
    </>
  );
};
