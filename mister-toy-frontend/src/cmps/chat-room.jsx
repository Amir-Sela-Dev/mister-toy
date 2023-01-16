import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { saveToy } from "../store/toy.action.js"
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_IS_TYPING, SOCKET_EVENT_STOP_TYPING } from '../services/socket.service'


export function ChatRoom({ toyId, setIsChatOpen, isChatOpen, toy }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [whoIsTyping, setwhoIsTyping] = useState(null)

    const loggedInUser = useSelector(storeState => storeState.userModule.user)


    useEffect(() => {
        socketService.on(SOCKET_EVENT_IS_TYPING, whosTyping)
        socketService.on(SOCKET_EVENT_STOP_TYPING, () => { setIsTyping(false) })
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId)
        onLoadsMsgs()

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_IS_TYPING, setIsTyping)
            socketService.off(SOCKET_EVENT_STOP_TYPING, setIsTyping)
        }
    }, [])

    useEffect(() => {
        if (!msg.txt) socketService.emit(SOCKET_EVENT_STOP_TYPING)
    }, [msg])

    function addMsg(newMsg) {
        socketService.emit(SOCKET_EVENT_STOP_TYPING)
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    async function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Guest'
        const newMsg = { from, txt: msg.txt }
        if (!toy.msgs) toy.msgs = []
        console.log(toy);
        toy.msgs.push(newMsg)
        await saveToy(toy)
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '', from })
    }

    function handleFormChange(ev) {
        const from = loggedInUser?.fullname || 'Guest'
        socketService.emit(SOCKET_EVENT_IS_TYPING, from)

        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    function onLoadsMsgs() {
        if (toy.msgs) setMsgs(toy.msgs)
    }

    function whosTyping(from) {
        setIsTyping(true)
        setwhoIsTyping(from)
    }


    return <section className="chat-room">
        <button className="close-chat" onClick={() => { setIsChatOpen(!isChatOpen) }}>X</button>
        <div className="chat-main">


            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
                {(isTyping) && <li> {whoIsTyping + ' '} is typing... </li>}
            </ul>

            <form onSubmit={sendMsg} className='chat-form' >
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>
        </div>

    </section>

}