"use client"
import { TodoType } from '@/type/todo';
import { useEffect, useState } from 'react';
import { useTodo } from '@/hooks/todo';
import DropdownBtn from '@/component/ui/dropdown/DropdownBtn';
import TodoCheckbox from './TodoCheckbox';
import TodoEdit from './TodoEdit';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities"

const TodoItems = (todo: TodoType) => {


    /*
     * 드래그 설정
    */
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    // 투두 액션 커스텀훅
    const {
        deleteTodo, // 삭제
    } = useTodo()


    // 체크 여부 반영
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(todo.checked)
    }, [todo.checked])



    // 드롭다운 - 삭제
    const handleDelete = () => {
        if (!confirm('할 일을 삭제하시겠습니까?')) return

        deleteTodo.mutate(todo.id)
    }

    // 드롭다운 - 편집
    const onEdit = () => {
        setIsEdit(true)
    }

    // 수정
    const [isEdit, setIsEdit] = useState(false)

    if (isEdit) {
        return <TodoEdit todo={todo} toggle={() => setIsEdit(false)} />
    }

    return (
        <div
            className='relative'
            ref={setNodeRef}
            style={style}
        >
            <div className={`border border-gray-200 py-3 px-4 rounded-lg flex items-center leading-1  ${checked ? 'bg-blue-50' : ''}`}>
                <div className="flex-1">
                    <h5 className={`font-medium ${checked ? ' text-blue-300 line-through' : ''}`}>{todo.name}</h5>
                </div>

                <div className='inline-flex items-center gap-1'>
                    <TodoCheckbox
                        item={todo}
                    />
                    <DropdownBtn
                        data={[
                            {
                                name: '편집',
                                onClick: onEdit
                            },
                            {
                                name: '삭제',
                                onClick: handleDelete
                            },
                        ]}
                    />

                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-md cursor-grab active:cursor-grabbing"
                        {...attributes}
                        {...listeners}
                    >
                        ⋮⋮
                    </button>
                </div>

            </div>



        </div>
    );
}

export default TodoItems;