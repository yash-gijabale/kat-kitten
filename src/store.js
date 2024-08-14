import {configureStore} from '@reduxjs/toolkit'
import userSlice from './redux/slice/userSlice'
import leaderBoardSlice from './redux/slice/leaderBoardSlice'


const store = configureStore({
    reducer:{
        user: userSlice,
        leaderBoard: leaderBoardSlice
    }
})

export default  store