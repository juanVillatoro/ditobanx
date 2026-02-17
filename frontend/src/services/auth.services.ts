import { axiosInstance } from "../api/axios";

import type { UserCreate } from "../types/user.types";

export const createUser = async (data: UserCreate) => {
    return await axiosInstance.post("/users", data);
}

export const getAllUsers = async () => {
    return (await axiosInstance.get("/users")).data;
}