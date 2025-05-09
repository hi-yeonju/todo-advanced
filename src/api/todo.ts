import { fetcher } from "@/lib/fetcher";
import { TodoType } from "@/type/todo";

// 리스트
export const todo_get_list = (): Promise<TodoType[]> => fetcher('/api/todos')

// 등록
export const todo_action_add = (newTitle: string) => fetcher('/api/todos', {
    method: 'POST',
    body: JSON.stringify({ name: newTitle, checked: false }),
    headers: { 'Content-Type': 'application/json' },
})

// 수정
export const todo_action_update =  (todo: TodoType) => fetcher(`/api/todos/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' },
})

// 삭제
export const todo_action_delete = (id: number) => fetcher(`/api/todos/${id}`, { method: 'DELETE' })
