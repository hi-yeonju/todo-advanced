import { rest } from 'msw';
import { todoDb } from '../data/todoDb';

export const todoHandler = [

  // 리스트 가져오기
  rest.get('/api/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoDb));
  }),

  // 저장
  rest.post('/api/todos', async (req, res, ctx) => {
    const newTodo = await req.json();
    todoDb.push({ ...newTodo, id: Date.now() });
    return res(ctx.status(201), ctx.json(newTodo));
  }),

  // 삭제
  rest.delete('/api/todos/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = todoDb.findIndex(todo => todo.id === Number(id));
    if (index !== -1) {
      todoDb.splice(index, 1);
      return res(ctx.status(200), ctx.json({ message: 'Deleted' }));
    }
    return res(ctx.status(404), ctx.json({ message: 'Not found' }));
  }),

  
  // 수정
  rest.put('/api/todos/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updated = await req.json()
    
    const todo = todoDb.find((t) => t.id === Number(id));

    if (!todo) {
      return res(ctx.status(404), ctx.json({ message: 'Not found' }));
    }

    Object.assign(todo, updated); // 내용과 completed 업데이트
    return res(ctx.status(200), ctx.json(todo));
  }),
  
];
