import axios from 'axios';
import {TimetableState} from "../models/TimetableResponse";

export const getTimeTables = (): Promise<TimetableState> => {
    return axios.get<TimetableState>('/timetables').then(res => res.data);
};