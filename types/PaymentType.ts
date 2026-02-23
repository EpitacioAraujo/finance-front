export type PaymentType = {
    name: string;
    cycle_type: string;
    cycle_day_start: number;
    cycle_day_end: number;
    id?: string;
    created_at?: Date;
    updated_at?: Date;
}