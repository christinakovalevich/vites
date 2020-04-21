import React from 'react';

import './AvatarContainer.css'

const AvatarContainer = ({title = 'unknown', img = {}}) => {
    return (
        <div className="avatar-container border">
            <div className="avatar-image"><img src={img} alt="Oops"/></div>
            <div className="avatar-title">{title}</div>
        </div>
    )
}

export default AvatarContainer;
