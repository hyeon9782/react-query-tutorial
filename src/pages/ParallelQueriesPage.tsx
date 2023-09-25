import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQueriesPage = () => {
  // 병렬 쿼리를 사용할 때는 별칭을 사용하여 데이터를 사용하자
  const { data: superHeroes } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  console.log(superHeroes);
  console.log(friends);

  return <div>ParallelQueriesPage</div>;
};

export default ParallelQueriesPage;
