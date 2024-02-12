import { useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/converstations/Conversation";
import Message from "../../components/message/Message";
import './home.css'
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
export default function Home() {
    const scrollRef: any = useRef();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState<{ _id: string }>();

    interface IMessage {
        sender?: string,
        text: string,
        createdAt: string
    }

    const [messages, setMessages] = useState<IMessage[]>([{ "sender": "", "text": "", "createdAt": "" }]);
    const [newMessage, setNewMessage] = useState<string>();

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
    useEffect(() => {

        const getMessages = async () => {
            try {
                const res = await api().get('/messages/' + currentChat?._id)
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getMessages();
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat?._id
        }

        try {
            const res = await api().post('/messages', message);
            console.log(res);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    {
                        conversations.map(c => {
                            return (
                                <div onClick={() => { setCurrentChat(c) }}>
                                    <Conversation conversation={c} currentUser={user} />
                                </div>

                            )
                        })
                    }
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBocWrapper">
                    {currentChat
                        ? <>
                            <div className="chatBoxTop">

                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message message={m} own={m.sender === user._id} />
                                    </div>

                                ))}


                            </div>
                            <div className="chatBottomBox">
                                <textarea
                                    name=""
                                    placeholder="write something..."
                                    className="chatMessageInput"
                                    onChange={(e) => { setNewMessage(e.target.value) }}
                                    value={newMessage}
                                >

                                </textarea>
                                <button onClick={handleSubmit} className="chatSubmitButton" >Send</button>
                            </div>
                        </>
                        : <span className="noConversationText">Open a conversation to start a chat.</span>
                    }
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