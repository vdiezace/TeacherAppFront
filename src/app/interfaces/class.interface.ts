export interface Class {
    id?: number;
    teachers_id: number;
    students_id: number;
    creation?: string;
    title?: string;
    start_hour: number;
    end_hour: number;
    start_date: Date | string | null;
    cancel_date: string;
}
