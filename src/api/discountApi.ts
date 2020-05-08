import axios from 'axios';

export const getDiscounts = (): Promise<any> => {
    return axios.get<any>(`/discounts`).then(res => res.data);
};