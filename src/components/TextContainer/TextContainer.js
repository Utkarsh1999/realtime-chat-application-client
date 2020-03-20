import React from 'react'
import onlineIcon from '../../icons/onlineIcon.png';
import './TextContainer.css';

export default function TextContainer({users}) {
    
    
    return (
        <div className="textContainer">
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
      <h3>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h3>
      <h3>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h3>
    </div>
    
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
              {
            users
                ? (
                    users.map(({name}) => (
                  <div key={name} className="activeItem">
                    <img alt="Online Icon" src={onlineIcon}/>
                     &nbsp;{name}
                    
                  </div>
                ))
                )
        : null}
              </h2>
            </div>
          </div>
        
    
  </div>
    )
}
