import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

const fetchSuperHeroes = () => {
  // return axios.get("http://localhost:4000/superheroes");
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheroes", hero);
  return request({ url: "/superheroes", method: "post", data: hero });
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
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries(["super-heroes"]); // 해당 key값을 가지고 있는 쿼리를 무효화함
    //   // 해당 쿼리를 서버에서 다시 가져옴

    //   // 보통 post요청에서는 새롭게 생성한 데이터를 반환해주기 때문에
    //   // 위와 같이 fetch요청을 한 번 더 보낼 필요가 없습니다.
    //   // post요청에서 반환된 값을 이용하여 기존에 있던 query값에 값을 업데이트
    //   // 하여 network 요청 횟수를 절약할 수 있습니다. setQueryData를 활용하면
    //   // 첫 번째 인수로 key값을 두 번째 인수로 콜백 함수에 리턴값으로 새로운 데이터를 리턴해줍니다.
    //   // 해당 콜백 함수의 첫 번째 인수에는 이전의 query data가 담겨있습니다.
    //   // oldQueryData에는 data 뿐만 아니라 다양한 값들이 있기 때문에 전개 연산자를 통해 복사하고
    //   // data또한 전개 연선자를 통해 복사한 후 반환받은 값을 추가해줍니다.
    //   queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    // onMutate 함수는 mutation 함수가 실행되기 직전에 실행되며
    // mutation 함수가 받을 것과 동일한 변수가 전달됩니다.
    onMutate: async (newHero) => {
      await queryClient.cancelQueries(["super-heroes"]);
      const prevHeroData = queryClient.getQueryData(["super-heroes"]);
      queryClient.setQueryData(["super-heroes"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        prevHeroData,
      };
    },
    // mutation에 실패했을 때 미리 저장해둔 prevHeroData를 통해 낙관적 업데이트
    // 전으로 데이터를 복원하여 데이터의 일관성을 유지합니다.
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["super-heroes"], context?.prevHeroData);
    },
    // 이 함수는 mutation이 완료된 후 호출됩니다.
    // super-heroes key를 가진 query의 캐시를 무효화시키고 서버에서 새로운 데이터
    // 를 다시 가져오도록 하여 클라이언트와 서버 간의 데이터 일관성을 유지합니다.
    onSettled: () => {
      queryClient.invalidateQueries(["super-heroes"]);
    },
  });
};
