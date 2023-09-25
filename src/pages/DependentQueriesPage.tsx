// 쿼리가 다른 커리에 의존성이 있을 때 사용
// 실제로는 Context API 등을 통해 email을 제공할 수 있지만
// 간단한 실습을 위해 Props로 내려준다.
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// props로 받은 email로 user 정보를 가져오고
const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
// 가져온 user 정보에서 channelId값을 가져와서 Courses 데이터를 가져온다.
// 만약 아직 channelId값을 가져오지 못했다면 에러가 발생하기 때문에
// 이럴 경우를 대비해 !!과 enabled 속성을 통해서 channelId가 있을 때만 쿼리를 호출한다.
const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserByEmail(email),
  });
  const channelId = user?.data.channelId;
  useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId, // channelId가 있을 때만 쿼리가 실행되도록
  });
  return <div>DependentQueriesPage</div>;
};

export default DependentQueriesPage;
