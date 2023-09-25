import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // select: (data) => {
    //   // select를 사용해서 서버에서 온 데이터를 가공해서 넘겨줄 수 있다.
    //   // 여기서 return해준 값이 data에 담긴다.
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSuperHero,
    onSuccess: () => {
      queryClient.invalidateQueries(["super-heroes"]); // 해당 key값을 가지고 있는 쿼리를 무효화함
      // 해당 쿼리를 서버에서 다시 가져옴
    },
  });
};
