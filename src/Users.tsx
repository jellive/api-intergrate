import React, { useState } from 'react'
import axios from 'axios'
import { useAsync } from 'react-async'
import User from './User'


type User = {
    id: number
    username: string,
    name: string
}

async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

function Users() {
    const [userId, setUserId] = useState(0)
    // react hook 규칙에 따르면 커스텀 훅은 capitalized가 되어야 한다. (via https://stackoverflow.com/questions/55846641/react-hook-usestate-is-called-in-function-app-which-is-neither-a-react-funct)
    const { data: users, error, isLoading, run } = useAsync({ deferFn: getUsers }) // react-async에서 사용자의 액션에 따라 부르고 싶을 때에는 promiseFn이 아닌 deferFn을 넣는다.


    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={run}>불러오기</button>;
    return (
        <>
            <ul>
                {users!!.map((user: User) => (
                    <li key={user.id}
                        onClick={() => setUserId(user.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {user.username} ({user.name})
          </li>
                ))}
            </ul>
            <button onClick={run}>다시 불러오기</button>
            {userId && <User id={userId} />}
        </>
    );
}

export default Users