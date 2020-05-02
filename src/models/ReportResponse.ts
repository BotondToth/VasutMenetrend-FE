export interface ReportResponse {
    year: number,
    month: string,
    sold: number,
    discountTickets: number,
    income: number,
    profit: number
}

export interface ReportState {
    reports: ReportResponse[],
    loading: boolean,
    error: null
}