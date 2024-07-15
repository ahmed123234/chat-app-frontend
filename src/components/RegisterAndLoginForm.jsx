import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../ReactContext';

function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginedOrRegisterd, setIsLoginedOrRegisterd] = useState('Login')
  // console.log(username, password);

  const { setCurrentUsername, setCurrentUserId,  setActiveStatus, setActiveNowVisible, setProfilePhoto, currentUserId } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = (isLoginedOrRegisterd == 'Register')? '/register':  '/login';
   
    const { data } = await axios.post(URL, { username, password });
    console.log(data);

    setCurrentUsername(username);
    setCurrentUserId(data._id);
    setActiveStatus(data.activeStatus);
    setActiveNowVisible(data.activeNowVisible);
    if (data.profilePicture) 
      setProfilePhoto(`${axios.defaults.baseURL}/uploads/profile_pictures/${data.profilePicture}`)

    
  }

  return (
    <>
      <div className="flex items-center h-screen mb-12 bg-blue-50">
        <form className='w-64 mx-auto' onSubmit={ handleSubmit }>
          <input type="text" placeholder='username' className='block w-full p-2 mb-2 border rounded-sm' 
            value={username} onChange={(e) => setUsername(e.target.value)}
          
          />
          <input type="password" name="" id="" placeholder='password' className='block w-full p-2 mb-2 border rounded-sm' 
            value={password} onChange={(e) => setPassword(e.target.value)}

          />
          <button type='submit' className='block w-full p-2 text-white bg-blue-500 rounded-sm'>{isLoginedOrRegisterd}</button>

          <div className='mt-2 text-center'>
            
            {isLoginedOrRegisterd === 'Register' && (
              <div>
                Already a member? 
                <button type='button' 
                onClick={() => {
                  setIsLoginedOrRegisterd('Login')
                  setUsername('')
                  setPassword('')
                }}> Login here </button>
            
              </div>
            ) || (
              <div>
                Don't have an account? 
                <button type='button' 
                onClick={() => {
                  setIsLoginedOrRegisterd('Register')
                  setUsername('')
                  setPassword('')  
                }}> Register here </button>
            
              </div>


            )} 
            
          </div>
        
        </form>
      </div>
    </>
  )
}

export default RegisterAndLoginForm