import axios from 'axios';
import * as moment from 'moment';

export interface PurchaseInfo {
    date?: string;
    discount: number;
    quantity: number;
    timetableId: string;
    userId: string;
}

export const doPurchase = (purchase: PurchaseInfo): Promise<any> => {
    if (purchase.date == null) {
        purchase.date = moment.default(new Date()).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }
    return axios.post<any>('/purchase', purchase).then(res => (res.status == 200));
};

export const getPurchases = (userId: string): Promise<any> => {
    return axios.get<any>(`/purchases?userId=${userId}`).then(res => {
        return {
            ok: res.status == 200,
            data: res.data
        }
    });
};
