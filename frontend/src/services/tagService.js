import api from "./api";

export const tagService = {
    getTags: async () => {
        const response = await api.get('/tags');
        return response.data;
    },

    createTag: async (tagData) => {
        const response = await api.post('/tags', tagData);
        return response.data;
    },

    updateTag: async (id, tagData) => {
        const response = await api.patch(`/tags/${id}`, tagData);
        return response.data;
    },

    deleteTag: async (id) => {
        const response = await api.delete(`/tags/${id}`);
        return response.data;
    }
}