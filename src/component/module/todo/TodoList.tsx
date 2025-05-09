"use client"
import { TodoType } from '@/type/todo';
import { useTodo } from '@/hooks/todo';
import DataFetchLayout from '../DataFetchLayout';
import TodoItems from './TodoItems/Index';
import TodoWrite from './TodoWrite';



const TodoList = () => {

    // 투두 액션 커스텀훅
    const {
        todosQuery, // 등록
    } = useTodo()


    return (
        <div className='p-5 bg-gray-100 min-h-screen'>

            {/* 할 일 입력 */}
            <TodoWrite />


            {/* 리스트 출력 */}
            <DataFetchLayout fetchData={todosQuery} placeholder='할 일을 등록해보세요!'>
                {({ data }) => (
                    <div className="p-5 bg-white rounded-lg flex flex-col gap-2">
                        {data?.map((item:TodoType) => (
                            <TodoItems
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                checked={item.checked}
                            />
                        ))}

                    </div>
                )}
            </DataFetchLayout>

           
        </div>
    );
}

export default TodoList;