import axios from "axios";
import Cookies from 'js-cookie';
// import { useDispatch } from 'react-redux';
// import { setToken, clearToken } from '../redux/slices/authSlice';
const apiUrl = "https://mensa-test-backend.vercel.app"

type UserProfile = {
    username?: string,
    email: string,
    password: string
}

export interface User{
    values: UserProfile
}
export const SignUser = async ({values} : User) => {
    try {
        const response = await axios.post(`${apiUrl}/signup`, {
            username: values.username,
            email: values.email,
            password: values.password
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    } finally {
        window.location.href = '/login'
    }
}

export const LoginUser = async ({ values }: User) => {
    console.log('Attempting to login with values:', values);
    // const dispatch = useDispatch();
    try {
        const response = await axios.post(`${apiUrl}/login`, {
            email: values.email,
            password: values.password
        });
        Cookies.set('token', response.data.token, { expires: 7, path: '/' });
        // const token = Cookies.get('token')
        // console.log(token)
        // dispatch(setToken(response.data.token));
        console.log('Login successful, response:', response.data);
        return response.data;
    } catch (error : any) {
        console.error("Login error:", error.response ? error.response.data : error.message);
        return { error: error.response ? error.response.data : "An unexpected error occurred" };
    } finally{
     window.location.href = '/'
    }
};
