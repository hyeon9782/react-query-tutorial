import axios from "axios";
import { useEffect, useState } from "react";

const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/superheroes").then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <main>
      <h1>SuperHeroesPage</h1>
      {data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </main>
  );
};

export default SuperHeroesPage;
