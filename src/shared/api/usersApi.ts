import axios from "axios";
import type { User } from "../types/user";

const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "x-api-key": "reqres-free-v1",
  },
});

export const usersApi = {
  async getUsers(page: number = 1): Promise<{ data: User[]; total: number }> {
    const res = await api.get(`/users?page=${page}`);
    return {
      data: res.data.data,
      total: res.data.total,
    };
  },

  async getUserById(id: string): Promise<User> {
    const res = await api.get(`/users/${id}`);
    return res.data.data;
  },

  async updateUser(id: string, data: Partial<User>) {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },
};
