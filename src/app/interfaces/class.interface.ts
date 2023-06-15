export interface Class {
    id?: number;
    teacher_id: number;
    student_id: number;
    creation?: string;
    title?: string;
    start_hour: number;
    end_hour: number;
    start_date: Date | string | null;
    cancel_date: string;
}
