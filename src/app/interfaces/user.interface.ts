export interface User {
    users_id?: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    subscribed?: string;
    unsubscribed?: string;
}
