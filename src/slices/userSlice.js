import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    process: "",
    designation:"",
    registerNumber:"",
    userName:"",
    idToken: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setProcess: (state, action) => {
            state.process = action.payload;
        },
        setDesignation: (state, action) => {
            state.designation = action.payload;
        },
        setRegisterNumber: (state, action) => {
            state.registerNumber = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setIdToken: (state, action) => {
            state.idToken = action.payload;
        },
        clearUser: (state) => {
            state.process = "";
            state.designation = "";
            state.registerNumber = "";
            state.userName = "";
            state.idToken = null;
        }   
    },
});

export const { setProcess, setDesignation, setRegisterNumber, setUserName, setIdToken, clearUser } = userSlice.actions;

export const selectProcess = (state) => state.user.process;
export const selectDesignation = (state) => state.user.designation;
export const selectRegisterNumber = (state) => state.user.registerNumber;
export const selectUserName = (state) => state.user.userName;
export const selectIdToken = (state) => state.user.idToken;

export default userSlice.reducer;