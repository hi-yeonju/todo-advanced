import { todo_action_add, todo_action_delete, todo_action_update, todo_get_list } from "@/api/todo";
import { TodoType } from "@/type/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTodo = () => {

    const queryClient = useQueryClient();
    
    const defaultOnSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
    };

    // 리스트
    const todosQuery = useQuery<TodoType[]>({
        queryKey: ['todos'],
        queryFn: todo_get_list,
    });

    // 등록
    const createTodo = useMutation({
        mutationFn: todo_action_add,
        onSuccess: res => {
            defaultOnSuccess()
        }
    });


    // 수정
    const updateTodo = useMutation({
        mutationFn: todo_action_update,
        onSuccess: () => defaultOnSuccess(),
    });


    // 삭제
    const deleteTodo = useMutation({
        mutationFn: todo_action_delete,
        onSuccess: () => defaultOnSuccess(),
    });

    return {
        todosQuery,
        createTodo,
        updateTodo,
        deleteTodo,
        defaultOnSuccess,
    }
}