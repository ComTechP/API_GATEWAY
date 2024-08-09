export interface generateSessionTokenInterface {
    access_token: string;
    refresh_token: string;
    issued_at: Date;
    expires_at: Date;
    expiresIn: number;
    user_id: number;
}

export interface createSessionTokenInterface {
    access_token: string;
    refresh_token: string;
    issued_at: Date;
    expires_at: Date;
    expiresIn: number;
    user_id: number;
}