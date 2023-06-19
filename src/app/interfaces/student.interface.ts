export interface Student {
    id?: number,
    role_id: number,
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    phone: number,
    avatar?: string,
    latitude?: string,
    longitude?: string,
    city_id?: number,
    province_id?: number,
    address: string,
    is_active?: number,
    subscribed?: string;
}
