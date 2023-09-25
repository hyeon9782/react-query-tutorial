import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = ({ queryKey }) => {
  // queryFn에는 queryKey가 전달되기 때문에 queryKey의 1번 인데스의 값을 id값으로 사용하면 된다.
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: fetchSuperHero,
    initialData: () => {
      // queryClient에서 key값이 super-heroes인 query 값을 가져와서
      // 해당 페이지의 데이터와 일치하는 데이터를 찾은 후에 기본값으로 설정
      const hero = queryClient
        .getQueryData(["super-heroes"])
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return {
          data: hero,
        };
      } else {
        // 초기 데이터를 확보하는 것을 실패했을 경우 반드시 undefined를 넘겨줘야한다.
        // 그렇지않으면 런타임 에러가 발생
        return undefined;
      }
    },
  });
};
