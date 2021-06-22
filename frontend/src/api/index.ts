import axios from "axios"

// TODO: Set API Address
const config = axios.create({
	baseURL: "http://localhost:60000"
});

config.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("TOKEN") || null}`;
config.defaults.headers.get["Accept"] = "application/json"
config.defaults.headers.post["Accept"] = "application/json"

export default config;