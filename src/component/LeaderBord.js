import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css'
const LeaderBoard = () => {

    const [leaderBoard, setLeaderBorad] = useState([])

    const getLeaderBoard = async () => {
        let { data } = await axios.get('http://localhost:8080/getall')
        console.log(data)
        setLeaderBorad(data)
    }

    useEffect(() => {
        getLeaderBoard()
        const intervalId = setInterval(() => {
            getLeaderBoard(); // Fetch the leaderboard data every 5 seconds
        }, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    },[])

    console.log(leaderBoard)

    return (
        <div className="leader_bord">
            <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems:'center', fontWeight:'500', color:'white'}} >
                <span>Name</span>
                <span>Score</span>
            </div>
            {
                leaderBoard.map(user => {
                    return (
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', borderBottom:'1px solid white', padding:"10px 0", color:'white' }}>
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