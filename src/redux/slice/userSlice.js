import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial State
const initialState = {
    userData: null,
    loading: false,
    error: null,
};

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUserPending: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginUserFulfilled: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
        },
        loginUserRejected: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        incrementFulfilled: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
        },
        loadUser: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
        },
    },
});

// Action Creators
export const {
    loginUserPending,
    loginUserFulfilled,
    loginUserRejected,
    incrementFulfilled,
    loadUser,
} = userSlice.actions;

// Thunks
export const loginUser = (userData) => async (dispatch) => {
    dispatch(loginUserPending());
    try {
       
        const { data } = await axios.post('http://localhost:8080/set', { username: userData.name });
        console.log(data)
        localStorage.setItem('userData', JSON.stringify(data));
        dispatch(loginUserFulfilled(data));
    } catch (error) {
        dispatch(loginUserRejected(error.response?.data || error.message));
    }
};

export const increment = (userData) => async (dispatch) => {
    try {
        const updateData = { username: userData.name, points: 1 };
        const { data } = await axios.put('http://localhost:8080/increment', updateData);
        localStorage.setItem('userData', JSON.stringify(data));
        dispatch(incrementFulfilled(data));
    } catch (error) {
        dispatch(loginUserRejected(error.response?.data || error.message));
    }
};

export const loadUserData = () => (dispatch) => {
    try {
        const updateData = JSON.parse(localStorage.getItem('userData'));
        dispatch(loadUser(updateData));
        console.log(updateData)
    } catch (error) {
        dispatch(loginUserRejected(error.message));
    }
};

// Reducer
export default userSlice.reducer;