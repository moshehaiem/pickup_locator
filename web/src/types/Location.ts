export type Location = {
    location_id: string;
    latitude: number;
    longitude: number;
    athletes_present: number;
    athletes_needed: number;
    date: string;
    start_time: string;
    end_time: string;
    message: string | null;
}