import api from "@/utils/CustomizeApi";

export const register = (email: string, password: string) => {
    return api.post('/api/register', { email, password });
}

export const getAllYachtHome = () => {
    return api.get('/api/customer/allYacht');
}

export const login = (username: string, password: string) => {
    return api.post('/login/signin', {
        username: username,
        password: password
    });
};


export const getIdCustomer = (idAccount: any) => {
    return api.get(`/api/customer/idCustomer/${idAccount}`);
}