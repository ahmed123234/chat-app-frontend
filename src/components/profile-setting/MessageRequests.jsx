import classNames from 'classnames'
import { useContext } from 'react';
import { UserContext } from '../../ReactContext';
import Contact from '../Contact';

function MessageRequests({settingSelected, setSettingSelected}) {
    const {onlinePeople} = useContext(UserContext)
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

            <h3 className=' text-lg text-black'>Message Requests</h3>

        </div>
        <hr  className=''/>

        <div className=' py-2 bg-slate-50'>
            Open a request to get info about who's messaging you.<br />
            They won't know you've seen it until you accept the message request. 
        </div>

        <hr  className=''/>

        {onlinePeople && (

Object.keys(onlinePeople).map(userId =>
    <Contact
        key={userId}
        selected={false}
        id={userId}
        username={onlinePeople[userId].username}
        online={(!onlinePeople[userId].activeStatus? undefined: true)}
        onClick={() => { 
            setSelectedUserId(userId);
            setSelectedUsername(onlinePeople[userId].username)
            // dispatch({type: "setChatVisible"})
            // dispatch({type: "clrSettingVisible"}) 
            // console.log("state of the display ", displayState);  
        
        }}

    />
)
)}
        
    </div>
  )
}

export default MessageRequests