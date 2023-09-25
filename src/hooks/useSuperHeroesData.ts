import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    select: (data) => {
      // select를 사용해서 서버에서 온 데이터를 가공해서 넘겨줄 수 있다.
      // 여기서 return해준 값이 data에 담긴다.
      const superHeroNames = data.data.map((hero) => hero.name);
      return superHeroNames;
    },
  });
};

export default useSuperHeroesData;
