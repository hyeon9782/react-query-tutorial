import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
import { useState } from "react";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

// Polling이란?
// 정기적으로 데이터를 가져오는 프로세스를 나타냄
// 예를 들어 매초 데이터를 가져오는 싶은 다양한 주식의 실시간 가격을 표시하는 컴포넌트
// 사용자와의 상호 작용에 의존하는 것이 아니라 항상 원격 데이터와 동기화되도록 보장
// refetchInterval을 통해서 밀리초 단위로 숫자를 설정할 수 있다 (기본값은 false)
// 하지만 refetchInterval만 사용할 경우 사용자가 브라우저에 focus를 하지 않을 경우에는
// 데이터 패칭이 이루어지지 않는다. 만약 브라우저를 포커스 해도 데이터 패칭을 하고 싶다면
// refetchIntervalInBackground를 true로 설정해야 한다.

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alrterEgo, setAlrterEgo] = useState("");
  // 데이터 패칭이 성공했을 때
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };
  // 데이터 패칭에 실패했을 때
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };
  // React Query 4에서는 onSuccess와 onError를 사용하지 않습니다.
  // data 또는 error 값을 통해서 해당 작업을 대신 수행하기를 권장합니다.

  // staleTime : 데이터가 만료되어 새로운 데이터를 다시 가져와야 하는 시간 (기본값 0)
  // cacheTime : 쿼리의 데이터를 캐시로 저장하는 기간 (기본값 5분)
  // RQ는 한 번 요청한 쿼리를 cache에 저장하기 하고 (기본 5분) cache에 저장된 쿼리는 서버에서서 가져오는
  // 것이 아니라 cache에서 가져옵니다. (Network에서 fetch는 확인할 수 있다)
  // 하지만 데이터 패칭을 자주할 필요가 없는 페이지인 경우 staleTime을 통해 데이터 패칭 자체를 일정 시간동안
  // 안할 수 있수 있습니다.
  // refetchOnMount - true 해당 컴포넌트가 mount될 때마다 데이터 패칭, false면 패칭 ㄴ
  // 'always'라면 staleTime과 상관없이 언제나 마운트될 때 데이터 패칭
  // refetchOnWindowFocus - 사용자가 Window를 Focus 했을 때 데이터 패칭
  // const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
  //   queryKey: ["super-heroes"],
  //   queryFn: fetchSuperHeroes,
  //   select: (data) => {
  //     // select를 사용해서 서버에서 온 데이터를 가공해서 넘겨줄 수 있다.
  //     // 여기서 return해준 값이 data에 담긴다.
  //     const superHeroNames = data.data.map((hero) => hero.name);
  //     return superHeroNames;
  //   },
  //   // enabled: false, // 컴포넌트가 mount될 때 데이터를 패칭하는 것을 비활성화
  //   // staleTime: 30000,
  //   // refetchOnMount: true,
  //   // refetchOnWindowFocus: true,
  //   // refetchInterval: 2000,
  //   // refetchIntervalInBackground: true,
  // });

  const { data, isLoading, isError, error, isFetching, refetch } =
    useSuperHeroesData();
  // mutate에 인수를 넣으면 addSuperHero함수에 전달된다.
  const {
    mutate: addHero,
    isLoading: addLoading,
    isError: addIsError,
    error: addError,
  } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alrterEgo });
    const hero = { name, alrterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    onError(error);
    return <h2>{error.message}</h2>;
  }

  return (
    <main>
      <h1>RQSuperHeroesPage</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alrterEgo}
          onChange={(e) => setAlrterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={() => refetch()}>Fetch heroes</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName) => {
        return <div>{heroName}</div>;
      })} */}
    </main>
  );
};

export default RQSuperHeroesPage;
