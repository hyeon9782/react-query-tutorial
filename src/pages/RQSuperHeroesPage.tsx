import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  // staleTime : 데이터가 만료되어 새로운 데이터를 다시 가져와야 하는 시간 (기본값 0)
  // cacheTime : 쿼리의 데이터를 캐시로 저장하는 기간 (기본값 5분)
  // RQ는 한 번 요청한 쿼리를 cache에 저장하기 하고 (기본 5분) cache에 저장된 쿼리는 서버에서서 가져오는
  // 것이 아니라 cache에서 가져옵니다. (Network에서 fetch는 확인할 수 있다)
  // 하지만 데이터 패칭을 자주할 필요가 없는 페이지인 경우 staleTime을 통해 데이터 패칭 자체를 일정 시간동안
  // 안할 수 있수 있습니다.
  // refetchOnMount - true 해당 컴포넌트가 mount될 때마다 데이터 패칭, false면 패칭 ㄴ
  // 'always'라면 staleTime과 상관없이 언제나 마운트될 때 데이터 패칭
  // refetchOnWindowFocus - 사용자가 Window를 Focus 했을 때 데이터 패칭
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    staleTime: 30000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
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
