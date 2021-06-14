import axios from "axios"

// TODO: Set API Address
axios.defaults.baseURL = "http://localhost:"
axios.defaults.headers.get["Accept"] = "application/json"
axios.defaults.headers.post["Accept"] = "application/json"