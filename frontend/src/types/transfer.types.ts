export interface TransferCreate {
    fromUserId: string;
    toUserId: string;
    amount: number;
    idempotencyKey: string;
}