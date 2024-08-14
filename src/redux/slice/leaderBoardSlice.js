import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { server } from '../../config';
const initialState = [];

// Slice
const leaderBordSlice = createSlice({
    name: 'leaderBoard',
    initialState,
    reducers: {
        updateScore: (state, action) => {
            state = [...action.payload];
            return state
        },
    },
});

export const { updateScore } = leaderBordSlice.actions;


export const getLeaderBoard = (status) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/getall/${status}`);
        dispatch(updateScore(data));
        console.log(data)
    } catch (error) {
        console.log('getAll error', error)
    }
};

export default leaderBordSlice.reducer;
