import React from "react";
import '../App.css'
const Card = (props) => {
    console.log(props)
    return (
        <div
            style={!props.show ? { left: (props?.left * 25) + 650, right: '50vw', position: 'absolute' } : {}}
            className={!props.show ? 'card' : 'open_card'}
        >
            <h3>{props?.data?.title}</h3>
        </div>
    )
}

export default Card