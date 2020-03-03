import React from 'react'
import axios from 'axios'
import { useAsync } from 'react-async'

async function getUser({ id }: any): Promise<any> { // useAsync를 쓸 때에는 파라미터를 객체로 지정해야 한다.
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}
function User({ id }: { id: number }) {
  const { data: user, error, isLoading } = useAsync({
    promiseFn: getUser,
    id,
    watch: id // Vue의 watch와 같음. 변경되면 함수를 다시 부름.
  })

  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User