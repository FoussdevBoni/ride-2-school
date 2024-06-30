import React, { useState } from 'react';

function ChatBoxScreen(props) {
    const [nom , setNom ]= useState('Boni')


    return (
        <div>
            {nom}
        </div>
    );
}

export default ChatBoxScreen;