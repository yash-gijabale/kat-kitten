import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css'
// import { server } from '../config.js'
import { useDispatch, useSelector } from 'react-redux'
import { getLeaderBoard } from "../redux/slice/leaderBoardSlice.js";
const LeaderBoard = () => {

    const [leaderBoard, setLeaderBorad] = useState([])
    const dispatch = useDispatch()

    const leader = useSelector(state => state.leaderBoard)
    // const getLeaderBoard = async () => {
    //     let { data } = await axios.get(`/api/getall`)
    //     console.log(data)
    //     setLeaderBorad(data)
    // }

    useEffect(() => {
        dispatch(getLeaderBoard(0))
        const intervalId = setInterval(() => {
            dispatch(getLeaderBoard(0))
        }, 5000);

        return () => clearInterval(intervalId);
    }, [])


    useEffect(() => {
        if (leader?.length) {
            setLeaderBorad(leader)
        }
    }, [leader])


    return (
        <div className="leader_bord">
            <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '500', color: 'white' }} >
                <span>Name</span>
                <span>Score</span>
            </div>
            {
                leaderBoard.map(user => {
                    return (
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid white', padding: "10px 0", color: 'white' }}>
                            <span>{user?.Member}</span>
                            <span>{user?.Score}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default LeaderBoard