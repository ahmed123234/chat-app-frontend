import classNames from 'classnames'
import { useContext, useState } from 'react';
import { UserContext } from '../../ReactContext';
import axios from 'axios';

function SwitchAccount ({settingSelected, setSettingSelected}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { 
        currentUsername,
        currentUserId,
        setCurrentUserId,
        setCurrentUsername, 
        activeStatus,
        setActiveStatus,
        activeNowVisible,
        setActiveNowVisible

    } = useContext(UserContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/login', { username, password });

        console.log(data.id);

        setCurrentUsername(username);
        setCurrentUserId(data._id);
        setActiveStatus(data.activeStatus);
        setActiveNowVisible(data.activeNowVisible);

        setSettingSelected("")
    }

  return (
    <div className={classNames(' bg-white h-full w-full m-0 absolute inset-0 p-4 transition-all duration-500', {
        "visible": settingSelected === "message requests",
        "hidden": settingSelected === ""
    })}>

        <div className='flex items-end gap-4 py-2'>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                className=" w-6 h-6 text-black cursor-pointer hover:opacity-60"
                onClick={() => setSettingSelected("")}

            >
                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>

            <h3 className=' text-lg text-black'>Add Account</h3>

        </div>
        <hr  className=''/>

        <div className=' py-2 w-40  m-auto  text-center '>
            Log in using your Facebook account. You'll be
            able to switch between accounts to see your 
            new messages
        </div>

        <div className=' '>
        {/* flex gap-2 items-center w-3/4 m-auto */}
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='flex flex-col gap-2 items-start my-2'>
                    <input 
                        className='inline-block w-full border-b-2 p-2 outline-none focus-visible:border-none'
                        type="text" 
                        placeholder='Email or phone number or username'
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input 
                        className='inline-block w-full border-b-2 p-2 outline-none focus-visible:border-none'
                        type="password" 
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} 
                    
                    />
                </div>
                <div className='my-4'> 
                    <input type="checkbox" name="" id="radio"  required defaultChecked/>
                    <label className=' pl-3' htmlFor="radio">
                        Require a password when switching to this account 
                        from this device
                    </label>
                </div>
                <button className='w-full bg-blue-500 hover:bg-blue-950 transition-all duration-500 text-white py-1 my-2'>
                    ADD ACCOUNT
                </button>

            </form>

        </div>
        
    </div>
  )
}

export default SwitchAccount