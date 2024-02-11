import { useEffect, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/converstations/Conversation";
import Message from "../../components/message/Message";
import './home.css'
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
export default function Home() {
    const [conversations, setConversations] = useState([]);
    const { user }: any = useAuth();

    useEffect(() => {

        const getConversations = async () => {
            try {
                const res = await api().get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getConversations();
    }, [])

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {
                        conversations.map(c => {
                            return (<Conversation conversation={c}  currentUser={user}/>)
                        })
                    }
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBocWrapper">
                    <div className="chatBoxTop">
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                        <Message />
                    </div>
                    <div className="chatBottomBox">
                        <textarea name="" placeholder="write something..." className="chatMessageInput"></textarea>
                        <button className="chatSubmitButton">Send</button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                </div>
            </div>
        </div>
    )
}