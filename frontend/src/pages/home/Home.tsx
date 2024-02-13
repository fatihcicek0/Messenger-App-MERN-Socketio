import { useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/converstations/Conversation";
import Message from "../../components/message/Message";
import './home.css'
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { io } from "socket.io-client";
export default function Home() {

    interface IMessage {
        sender?: string,
        text: string,
        createdAt: number
    }

    const initialMessage = { sender: "", text: "", createdAt: 0 };
    const scrollRef: any = useRef();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState<{ _id: string, members: [] }>();
    const [messages, setMessages] = useState<IMessage[]>([initialMessage]);
    const [newMessage, setNewMessage] = useState<string>();
    const [arrivalMessage, setArrivalMessage] = useState<IMessage>(initialMessage);
    const [onlineUsers, setOnlineUsers] = useState<[{ userId: string }]>([{ userId: "" }]);
    const socket = useRef<any>();
    const { user }: any = useAuth();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data: any) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, [])

    useEffect(() => {
        const isInclude = currentChat?.members.find(member => member === arrivalMessage.sender);
        if (arrivalMessage && isInclude) {
            setMessages((prev: any) => [...prev, arrivalMessage])
        }

    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users: any) => {
            setOnlineUsers(users);
        })
    }, [user])

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
        //send with socket 
        const receiverId = currentChat?.members.find(member => member !== user._id);
        console.log("receiver", receiverId);
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await api().post('/messages', message);
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
                    <ChatOnline onlineUsers={onlineUsers} currentId={user._id} />
                </div>
            </div>
        </div>
    )
}