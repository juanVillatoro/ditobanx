import { axiosInstance } from "../api/axios";

import type { TransferCreate } from "../types/transfer.types";

export const createTransfer = async (data: TransferCreate) => {
    return await axiosInstance.post("/transfers", data);
}