import { useEffect } from 'react'
import './conversation.css'
export default function Conversation({ conversation, currentUser }: { conversation: { member: [] }, currentUser: { _id: string } }) {

    useEffect(() => {
        const friendId = conversation.member.find((m: any) => m !== currentUser._id)
        
    }, [])

    return (
        <div className="conversation">
            <img className="conversationImg" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"></img>
            <span className="conversationName">Jhon Doe</span>
        </div>
    )
}