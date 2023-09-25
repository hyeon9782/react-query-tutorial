import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = ({ queryKey }) => {
  // queryFn에는 queryKey가 전달되기 때문에 queryKey의 1번 인데스의 값을 id값으로 사용하면 된다.
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: fetchSuperHero,
  });
};
