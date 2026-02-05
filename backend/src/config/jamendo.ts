import axios from "axios";

const JAMENDO_URL = "https://api.jamendo.com/v3.0";
const CLIENT_ID = process.env.JAMENDO_CLIENT_ID;

if (!CLIENT_ID) {
  console.warn("⚠️ JAMENDO_CLIENT_ID is missing in .env");
}

export const jamendoApi = axios.create({
  baseURL: JAMENDO_URL,
  timeout: 8000, // 8stimeout

  params: {
    client_id: CLIENT_ID,
    format: "json"
  }
});

// (helps debugging)
jamendoApi.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("❌ Jamendo API Error:", err?.response?.data || err.message);
    return Promise.reject(err);
  }
);
