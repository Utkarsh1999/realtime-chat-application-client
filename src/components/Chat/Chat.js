import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Infobar from '../InfoBar/Infobar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './Chat.css';


let socket;

const Chat = ({location})=> {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://utkarsh1999.herokuapp.com/';

    useEffect(() => {
       const {name,room} = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room},(error)=>{
            if(error){
                alert(error);
            }
        });
        
    },[ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages, message]);
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users);
            console.log("users in room: "+users.name);
          })

        return()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[messages]);

    // function for sending messages
    const sendMessage = (event)=>{
        event.preventDefault();
        console.log(event)
        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room} />
                <Messages messages={messages} name={name} />
                <Input 
                    message={message} 
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    )
}

export default Chat;
