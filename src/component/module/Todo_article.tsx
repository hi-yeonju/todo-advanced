"use client"
import { TodoType } from '@/type/todo';
import styles from './Todo_article.module.css'
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';

const Todo_article = (todo:TodoType) => {

    const queryClient = useQueryClient();

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(todo.checked)
    },[todo.checked])

    // 수정
    const updateTodo = useMutation({
        mutationFn: (todo: TodoType) =>
          fetcher(`/api/todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: { 'Content-Type': 'application/json' },
          }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });

    const handleChange = (check:boolean) => {
        updateTodo.mutate({ ...todo, checked: check })
    }

    const handleEdit = () => {
        if(!editValue) return
        updateTodo.mutate({ ...todo, name: editValue }, {
            onSuccess: res => {
                setIsEdit(false)
            }
        })
    }

    // 삭제
    const deleteTodo = useMutation({
        mutationFn: (id: number) => fetcher(`/api/todos/${id}`, { method: 'DELETE' }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });

    
    const handleDelete = (check:boolean) => {
        if(!confirm('할 일을 삭제하시겠습니까?')) return

        deleteTodo.mutate(todo.id)
    }

    
    // 드롭다운
    const [dropdownActive, setDropdownActive] = useState(false)
    const toggle = () => {
        setDropdownActive(prev => !prev)
    }

    const onEdit = () => {
        setIsEdit(true)
        setDropdownActive(false)
        setTimeout(() => {
            editInputRef.current?.focus()
        }, 100);
    }

    // 수정
    const editInputRef = useRef<HTMLInputElement>(null)
    const [isEdit, setIsEdit] = useState(false)
    const [editValue, setEditValue] = useState(todo.name)

    return (
        <div className='relative'>
            <div className={`border border-gray-200 py-3 px-4 rounded-lg flex items-center leading-1  ${checked ? 'bg-blue-50' : ''}`}>
                <div className="flex-1">
                    {isEdit ? (
                        <input type="text" ref={editInputRef} className='font-medium outline-0' placeholder='오늘 할 일' value={editValue} onChange={e => setEditValue(e.target.value)} />
                    ) : (
                        <h5 className={`font-medium ${checked ? ' text-blue-300 line-through' : ''}`}>{todo.name}</h5>
                    )}
                </div>
               
                <div className='inline-flex items-center gap-1'>
                    {isEdit ? (
                        <>
                            <button className='w-10 rounded-md text-xs text-white bg-gray-400 h-8' onClick={() => setIsEdit(false)}>취소</button>
                            <button className='w-10 rounded-md text-xs text-white bg-blue-500 h-8' onClick={handleEdit}>수정</button>
                        </>
                    ) : (
                        <>
                            <div>
                                <input type="checkbox" 
                                checked={checked}
                                onChange={e => {
                                    handleChange(e.target.checked)
                                    // setChecked(e.target.checked)
                                }} />
                            </div>
                            <button className="p-2 rounded hover:bg-gray-100 leading-1" onClick={toggle}>
                                ⋮
                            </button>
                        </>
                    )}

                </div>
    
            </div>
            {/* 드롭다운 메뉴 */}
            {dropdownActive && (
            <div className=" absolute top-8 right-0 mt-2 w-20 bg-white border border-gray-200 rounded shadow-lg z-10 text-center">
                <ul className="py-1 text-sm text-gray-700">
                    <li>
                        <button className="block w-full px-4 py-2 hover:bg-gray-100" onClick={onEdit}>편집</button>
                    </li>
                    <li>
                        <button className="block w-full px-4 py-2 hover:bg-gray-100" onClick={handleDelete}>삭제</button>
                    </li>
                </ul>
            </div>
            )}

        </div>
    );
}

export default Todo_article;