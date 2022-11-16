export interface IUserRequest {
    username: string
    password: string
}

export interface ITransactionRequest {
    value: number
    creditedUserId: string
    debitedUserId: string
}