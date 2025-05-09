import { useTodo } from "@/hooks/todo";
import { TodoType } from "@/type/todo";

type Props = {
    item:TodoType
}

  
const TodoCheckbox = ({
    item,
}:Props) => {

    // 투두 액션 커스텀훅
    const {
        updateTodo, // 수정
    } = useTodo()

    
    // 체크 상태 업데이트
    const handleChange = (check:boolean) => {
        updateTodo.mutate({ ...item, checked: check })
    }

    
    return (
        <div>
            <input type="checkbox" 
            checked={item?.checked}
            onChange={e => {
                handleChange(e.target.checked)
                // setChecked(e.target.checked)
            }} />
        </div>
    );
}

export default TodoCheckbox;