import axios from 'axios';
import {ReportResponse} from "../models/ReportResponse";

export const getReports = (): Promise<ReportResponse> => {
    return axios.get<ReportResponse>('/reports').then(res => res.data);
};