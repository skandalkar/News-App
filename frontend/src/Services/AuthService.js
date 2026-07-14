import axios from "axios";

const backEndUrl = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
    baseURL: `${backEndUrl}/api/v1`,
});

export const signup = (data) =>
    API.post("/auth/signup", data);

export const login = (data) =>
    API.post("/auth/login", data);

export const verifyOTP = (data) =>
    API.post("/otp/verify", data);

export const resendOTP = (data) =>
    API.post("/otp/resend", data);
