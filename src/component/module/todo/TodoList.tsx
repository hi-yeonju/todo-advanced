"use client"
import { TodoType } from '@/type/todo';
import { useTodo } from '@/hooks/todo';
import DataFetchLayout from '../DataFetchLayout';
import TodoItems from './TodoItems/Index';
import TodoWrite from './TodoWrite';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

const TodoList = () => {

    // 투두 액션 커스텀훅
    const {
        todosQuery, // 등록
    } = useTodo()



    /*
     * 드래그 이벤트
    */

    const sensors = useSensors(
        useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8,
        },
        }),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    )


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        console.log(event)

        // if (over && active.id !== over.id) {
        // const oldIndex = todos.findIndex((todo) => todo.id === active.id)
        // const newIndex = todos.findIndex((todo) => todo.id === over.id)
        
        // onReorder(arrayMove(todos, oldIndex, newIndex))
        // }
    }

    return (
        <div className='p-5 bg-gray-100 min-h-screen'>

            {/* 할 일 입력 */}
            <TodoWrite />


            {/* 리스트 출력 */}
           
          
            <DataFetchLayout fetchData={todosQuery} placeholder='할 일을 등록해보세요!'>
                {({ data }) => (
                    <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={data.map(todo => todo.id)}
                            strategy={verticalListSortingStrategy}
                        >
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
                        </SortableContext>
                    </DndContext>

                )}
            </DataFetchLayout>

           
        </div>
    );
}

export default TodoList;