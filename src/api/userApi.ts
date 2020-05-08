import axios from 'axios';

export const getUserInfo = (token: string): Promise<any> => {
    return axios.get<any>(`/user/get_info?token=${encodeURIComponent(token)}`).then(res => {
        return {
            ok: res.status == 200,
            data: res.data
        }
    }).catch(err => {
        return {
            ok: false,
            data: null
        }
    })
};