// File: services/auth.js
import axios from 'axios';

const API_URL = "http://192.168.1.150:5000/api/auth"; // your local backend IP

// ✅ Send OTP to phone
export const sendOtp = async ({ phone }) => {
  try {
    const res = await axios.post(`${API_URL}/send-otp`, { phone });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Send OTP failed";
    console.log("Send OTP error:", message);
    throw new Error(message);
  }
};

// ✅ Verify OTP and login/create user
export const verifyOtp = async ({ phone, otp }) => {
  try {
    const res = await axios.post(`${API_URL}/verify-otp`, { phone, otp });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "OTP verification failed";
    console.log("Verify OTP error:", message);
    throw new Error(message);
  }
};
