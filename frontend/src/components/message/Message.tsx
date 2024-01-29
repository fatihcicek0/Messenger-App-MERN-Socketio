import './message.css'
export default function Message({ own }: { own?: boolean }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"></img>
                <p className="messageText">Hello This is a message that be new</p>
            </div>
            <div className="messageBottom">
             1 hour ago
            </div>
        </div>
    )
}