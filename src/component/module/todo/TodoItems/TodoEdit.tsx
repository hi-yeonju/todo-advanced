import Button from "@/component/ui/button/Button";
import { useTodo } from "@/hooks/todo";
import { TodoType } from "@/type/todo";
import { useEffect, useRef, useState } from "react";

const TodoEdit = ({
    todo,
    toggle
}:{
    todo:TodoType
    toggle:() => void
}) => {

        // 투두 액션 커스텀훅
    const {
        updateTodo, // 수정
        defaultOnSuccess,
    } = useTodo()

    
    // 제목 업데이트
    const handleEdit = () => {
        if(!editValue) {
            alert('할 일을 입력해주세요')
            return
        }
        updateTodo.mutate({ ...todo, name: editValue }, {
            onSuccess: () => {
                defaultOnSuccess()
                toggle()
            }
        })
    }
    

    // 수정
    const editInputRef = useRef<HTMLInputElement>(null)
    const [editValue, setEditValue] = useState(todo.name)

    useEffect(() => {
        editInputRef.current?.focus()
    },[])

    
    return (
        <div className='relative'>
            <div className={`border border-gray-200 py-3 px-4 rounded-lg flex items-center leading-1 bg-gray-50`}>
                <div className="flex-1">
                    <input type="text" ref={editInputRef} className='font-medium outline-0' placeholder='오늘 할 일' value={editValue} onChange={e => setEditValue(e.target.value)} />
                </div>
               
                <div className='inline-flex items-center gap-1'>
                    <Button variant="gray" onClick={toggle}>취소</Button>
                    <Button variant="blue" onClick={handleEdit}>수정</Button>

                </div>
    
            </div>
         


        </div>
    );
}

export default TodoEdit;