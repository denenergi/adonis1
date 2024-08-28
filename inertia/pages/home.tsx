import { useEffect, useState } from "react";
import { TodoService } from "../services/todo.service";
import { ITodo } from "../types/todo";
import TodoCard from "../components/TodoCard";
import AddTodo from "../components/AddTodo";

export default function Home() {
  const [todos, setTodos] = useState<ITodo[] | []>([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [changeTodo, setChangeTodo] = useState<ITodo | null>(null)

  useEffect(() => {
    TodoService.getTodos().then(res => setTodos(res));
  }, [visibleModal])

  return (
    <div className="flex flex-col items-center gap-4 relative p-6 h-full">
      <h1 className="uppercase text-5xl">Todos</h1>
      <div className="flex p-2 gap-x-1 gap-y-10 flex-row w-full flex-wrap justify-around">
        {todos.map(todo => <TodoCard todo={todo} todos={todos} setTodos={setTodos} key={todo.id} setChangeTodo={setChangeTodo} setVisibleModal={setVisibleModal}/>)}
      </div>
      <button onClick={() => setVisibleModal(true)} className="flex p-2 border bg-sky-400 rounded-lg hover:bg-sky-500">Add new todo</button>
      {visibleModal && (<AddTodo type={changeTodo ? 'patch' : 'post'} setVisibleModal={setVisibleModal} todo={changeTodo} setChangeTodo={setChangeTodo}/>)}
    </div>
  );
}