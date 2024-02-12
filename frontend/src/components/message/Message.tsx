import './message.css'

interface Iprops{
    own?: boolean,
    message:{
        text:string,
        createdAt:string
    } 
}
export default function Message({ own,message }: Iprops) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"></img>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">
             1 hour ago
            </div>
        </div>
    )
}