import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite-colors"],
    queryFn: fetchColors,
    getNextPageParam: (lastPage, pages) => {
      // 현재 pages의 길이가 전체 pages의 길이보다 작을 경우 현재 pages의 길이에 +1을 해서
      // 보내고 해당 값은 다음에 fetchNextPage를 실행할 때 pageParam으로 사용된다.
      // undefined가 반환되면 hasNextPage가 false가 된다.
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <div>
        {data?.pages.map((group, index) => {
          return (
            <div key={index}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id}. {color.label}
                </h2>
              ))}
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      {isFetching && !isFetchingNextPage ? "Fetching..." : null}
    </>
  );
};

export default InfiniteQueriesPage;
