import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperHeroesPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => {
      return axios.get("http://localhost:4000/superheroes");
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      <h1>RQSuperHeroesPage</h1>
      {data?.data.map((hero) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </main>
  );
};

export default RQSuperHeroesPage;
