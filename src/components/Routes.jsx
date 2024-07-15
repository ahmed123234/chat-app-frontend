import React from 'react'
import RegisterAndLoginForm from './RegisterAndLoginForm'
import { UserContext } from '../ReactContext';
import { useContext } from 'react';
import Chat from './Chat';

function Routes() {

    // Grap the informartion from the whole context
    const {currentUsername, currentUserId} = useContext(UserContext)
    // console.log("username", username);

    if (currentUsername) return <Chat username={currentUsername}/>
  
    return (
    <>
     <RegisterAndLoginForm />
    </>
  )
}

export default Routes