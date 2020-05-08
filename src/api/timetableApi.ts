import axios from 'axios';
import {TimetableState} from "../models/TimetableResponse";
import * as moment from 'moment';

export const getTimeTables = (): Promise<TimetableState> => {
    return axios.get<TimetableState>('/timetables').then(res => res.data);
};

export interface TimetableSearchOptions {
    from: string;
    to: string;
    when: string;
    cityList: string[];
}

export const searchTimeTable = (options: TimetableSearchOptions): Promise<any> => {
    const time = moment.default(options.when).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    console.log(time);

    let url = `/timetables/search?from=${encodeURIComponent(options.from)}&to=${encodeURIComponent(options.to)}&when=${time}`;
    if (options.cityList != null && options.cityList.length > 0) {
        url += `&citylist=${encodeURIComponent(options.cityList.join(","))}`;
    }

    return axios.get<any>(url).then(res => res.data);
};