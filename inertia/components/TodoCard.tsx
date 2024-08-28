import { FC } from "react";
import { ITodo } from "../types/todo";
import { TodoService } from "../services/todo.service";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai"
import { FaEdit } from "react-icons/fa";

interface Props {
    todo: ITodo,
    todos: ITodo[],
    setTodos: (word: ITodo[]) => void,
    setChangeTodo: (todo: ITodo) => void
    setVisibleModal: (visible: boolean) => void
}

const TodoCard: FC<Props> = ({ todo, todos, setTodos, setChangeTodo, setVisibleModal }) => {
    const editTodoHandler = async () => {
        setVisibleModal(true)
        setChangeTodo(todo)
    }

    const deleteTodoHandler = async (id: number) => {
        try {
            await TodoService.deleteTodo(id);
            const newArrayTodo = todos.filter(el => el.id !== id)
            setTodos(newArrayTodo)
            toast.success('Todo has been deleted.');
        } catch (err) {
            toast.error("Something wrong")
        }
    }

    return (
        <>
            <div className="p-4 basis-1/4 bg-cyan-300 rounded-md hover:scale-105 border-solid border-2 border-white transition duration-300 ease-out hover:ease-in hover:border-black box-border flex justify-between flex-col relative pb-8">
                <img src={todo?.file ? `storage/${todo.file}` : `storage/files/empty.png`} alt="todo" className="w-full rounded-md mb-2 bg-white h-full object-cover" />
                <div>
                    <p className="text-black text-center text-lg uppercase min-h-[28px]">{todo.name}</p>
                    <div className="text-black text-center flex items-center justify-center min-h-[20px]"><p>{todo.descriptions}</p></div>
                </div>
                <button className="absolute bottom-3 left-3" onClick={() => editTodoHandler()}><FaEdit size={20} /></button>
                <button className="absolute bottom-3 right-3" onClick={() => deleteTodoHandler(todo.id)}><AiFillDelete size={20} /></button>
            </div>
        </>
    );
}

export default TodoCard