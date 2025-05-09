"use client"
import Button from "@/component/ui/button/Button";
import { useTodo } from "@/hooks/todo";
import { FormEvent, useState } from "react";

const TodoWrite = () => {
    

    // 할 일 입력값
    const [title, setTitle] = useState('');

    // 투두 액션 커스텀훅
    const {
        createTodo, // 등록
        defaultOnSuccess, // 기본 성공 후 동작
    } = useTodo()



    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        if(!title) {
            alert('할 일을 입력해주세요')
            return
        }

        createTodo.mutate(title, {
            onSuccess: () => {
                defaultOnSuccess()
                setTitle('')
            }
        })

    }
    
    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 mb-5 rounded-lg flex gap-2">
            <input type="text" placeholder='오늘 할일' className='flex-1  border border-gray-200 h-11 px-3' value={title} onChange={e => setTitle(e.target.value)} />
            <Button variant="blue" size="m" type="submit">등록</Button>
        </form>
    );
}

export default TodoWrite;