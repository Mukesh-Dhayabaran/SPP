import axios from "axios"

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1"
const API_KEY = "AIzaSyAliekmxv6-uHPA8bny3lS36deWM_bNdOs"
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`

export const RegisterAPI = (inputs) => {
    
    sessionStorage.setItem("username", inputs.name);
    
    let data = {
        displayName : inputs.name,
        email : inputs.email,  
        password : inputs.password
    }
    return axios.post(REGISTER_URL,data)
}

const LOOKUP_URL = `/accounts:lookup?key=${API_KEY}`;

export const fetchUserProfile = (idToken) => {
  return axios.post(LOOKUP_URL, {
    idToken: idToken
  });
};


export const LoginAPI = (inputs) => {
    console.log(inputs.password);
    let data = {
        email : inputs.email,
        password : inputs.password
    }
    return axios.post(LOGIN_URL,data);
}