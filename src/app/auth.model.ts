export interface Login {
    email: string;
    password: string;
}

export interface User {
    access_token: string;
    token_type: string;
    expires_in: number;
}