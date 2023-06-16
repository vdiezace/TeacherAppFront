export interface Review {
    id?: number;
    teachers_id: number;
    students_id: number;
    rating: number;
    comment?: string;
}
