import { instance } from "../api/axios.api";
import { ITodo, ITodoCreated } from "../types/todo";

export const TodoService = {
    async getTodos() {
        const { data } = await instance.get('todos');
        return data.data
    },

    async postTodo(todo: ITodoCreated) {
        const { data } = await instance.post('todos', todo);
        return data.data
    },

    async deleteTodo(id: number) {
        const { data } = await instance.delete(`todos/${id}`);
        return data.data
    },
    async editTodo(todo: ITodo) {
        const { data } = await instance.put(`todos/${todo.id}`, todo);
        return data.data
    },
}