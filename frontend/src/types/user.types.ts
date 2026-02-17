export interface UserCreate {
    name: string;
    email: string;
    password: string;
    balance: number;
}

export interface Wallet {
    balance: string;
    currency: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    Wallet: Wallet;
}