export interface Review {
    id?: number;
    teacher_id: number;
    student_id: number;
    rating: number;
    comment?: string;
}
