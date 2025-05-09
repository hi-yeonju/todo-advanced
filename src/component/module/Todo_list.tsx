"use client"
import { FormEvent, useState } from 'react';
import Todo_article from './Todo_article';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TodoType } from '@/type/todo';
import { fetcher } from '@/lib/fetcher';



const Todo_list = () => {

    const [list, setList] = useState([])

    const [title, setTitle] = useState('');

    const queryClient = useQueryClient();

    const { data: todos, isLoading } = useQuery<TodoType[]>({
        queryKey: ['todos'],
        queryFn: () => fetcher('/api/todos'),
    });


    const createTodo = useMutation({
        mutationFn: (newTitle: string) =>
          fetcher('/api/todos', {
            method: 'POST',
            body: JSON.stringify({ name: newTitle, checked: false }),
            headers: { 'Content-Type': 'application/json' },
          }),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
          setTitle('');
        },
    });


    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        createTodo.mutate(title)

    }

    return (
        <div className='p-5 bg-gray-100 min-h-screen'>

            {/* 할 일 입력 */}
            <form onSubmit={handleSubmit} className="bg-gray-50 p-4 mb-5 rounded-lg flex gap-2">
                <input type="text" placeholder='오늘 할일' className='flex-1  border border-gray-200 h-11 px-3' value={title} onChange={e => setTitle(e.target.value)} />
                <button type='submit' className='w-14 rounded-lg text-sm text-white bg-blue-500 h-11'>등록</button>
            </form>

            {/* 리스트 출력 */}
            {todos && todos?.length > 0 ? (
                <div className="p-5 bg-white rounded-lg flex flex-col gap-2">
                    {todos?.slice() // 원본 배열 수정 방지
                     .sort((a, b) => Number(a.checked) - Number(b.checked)) // false → true 순
                    .map((item:TodoType) => (
                        <Todo_article
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            checked={item.checked}
                        />
                    ))}

                </div>
            ) : (
                <p className="text-center text-sm text-gray-400 py-5">할 일을 등록해보세요!</p>
            )}
           
        </div>
    );
}

export default Todo_list;