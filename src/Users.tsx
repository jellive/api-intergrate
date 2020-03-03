import React from 'react'
import UseAsync from './useAsync'
import axios from 'axios'


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
    // react hook 규칙에 따르면 커스텀 훅은 capitalized가 되어야 한다. (via https://stackoverflow.com/questions/55846641/react-hook-usestate-is-called-in-function-app-which-is-neither-a-react-funct)
    const [state, refetch] = UseAsync(getUsers, [], true)

    const { loading, data: users, error } = state

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return <button onClick={refetch}>불러오기</button>;
    return (
        <>
            <ul>
                {users!!.map((user: User) => (
                    <li key={user.id}>
                        {user.username} ({user.name})
          </li>
                ))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
        </>
    );
}

export default Users