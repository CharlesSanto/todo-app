import api from "./api";

export const todoService = {
    getTodos: async () => {
        const response = await api.get('/todos');
        return response.data;
    },

    getTodoById: async (id) => {
        const response = await api.get(`/todos/${id}`);
        return response.data;
    },

    createTodo: async (todoData) => {
        const response = await api.post('/todos', todoData);
        return response.data;
    },

    updateTodo: async (id, todoData) => {
        const response = await api.patch(`/todos/${id}`, todoData);
        return response.data;
    },

    deleteTodo: async (id) => {
        await api.delete(`/todos/${id}`);
    }
}