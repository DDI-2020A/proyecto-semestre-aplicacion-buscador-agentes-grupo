import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import { Rate } from 'antd';

const Detail = ({ icon, text }) => {
    const css = {
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        icon: {
            fontSize: 30,
        },
        text: {
            fontSize: 15,
            color:'gray'
        }

    }

    return (
        <div style={css.root}>
            <div style={css.icon}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <span style={css.text}>{text}</span>
        </div>
    );
}
const Details = ({ user }) => {

    return (
        <div>
            <Rate disabled defaultValue={user.score} />
            <Detail icon={faBusinessTime} text={"Negocios cerrados"} />
        </div>
    );
}

export default function UserCard() {
    return (
        <div>
            
        </div>
    )
}
