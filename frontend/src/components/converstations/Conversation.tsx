import { useEffect, useState } from 'react'
import './conversation.css'
import api from '../../utils/api';
export default function Conversation({ conversation, currentUser }: { conversation: { members: [] }, currentUser: { _id: string } }) {
    const [user, setUser] = useState<{ userName: string }>({ "userName": "" });
    useEffect(() => {
        const friendId = conversation.members?.find((m: any) => m !== currentUser._id);
        const getUser = async () => {
            
            try {
                const res = await api().get('/users?userId=' + friendId);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation])

    return (
        <div className="conversation">
            <img className="conversationImg" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"></img>
            <span className="conversationName">{user.userName}</span>
        </div>
    )
}