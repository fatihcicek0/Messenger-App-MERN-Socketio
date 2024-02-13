import { useEffect } from 'react'
import './chatOnline.css'

interface IProps {
    currentId: string,
    onlineUsers: [{ userId: string }]
}

export default function ChatOnline({ onlineUsers, currentId }: IProps) {
    useEffect(() => {
        console.log(onlineUsers);
    }, [])
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img
                        className='chatOnlineImg'
                        src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                    ></img>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Jon Doe</span>
            </div>
        </div>
    )
}