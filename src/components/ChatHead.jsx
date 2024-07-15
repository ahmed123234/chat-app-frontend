import React, { useContext, useRef } from 'react'
import { UserContext } from '../ReactContext'
import AvatarColor from './AvatarColor';
// import AvatarColor from './AvatarColor'

function ChatHead({setPickerVisible, setSettingSelected, settingSelected}) {
    const { selectedUsername, setSelectedUserId, setSelectedUsername, selectedUserPhoto } = useContext(UserContext)
    
    // const colorRef = useRef(null);
    const { selectedUserId } = useContext(UserContext)
    // const [color, setColor] = useState("")

    const COLORS = [
        'bg-green-200', 'bg-red-200', 'bg-yellow-200', 'bg-teal-200',
        'bg-purple-200', 'bg-blue-200'
    ];

    const userIdBased10 = parseInt(selectedUserId, 16);
    const colorIndex = userIdBased10 % COLORS.length;
    const color = COLORS[colorIndex]

    console.log("selected photo", selectedUserPhoto);
    
    return (
        <>
            <div className='flex align-middle border-b-2 boredr-gray-300 py-2 w-full'>
                <div className='flex items-center gap-2 grow'>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-6 h-8 text-blue-600 cursor-pointer"

                        onClick={() => {setSelectedUserId(""); setSelectedUsername(""); setPickerVisible(false)}}
                    
                    >
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>

                    {!selectedUserPhoto && <div className={` inline-block ml-2 w-8 h-8 text-center rounded-full ${color} flex align-middle justify-center items-center relative`}>
                        <span className="text-center opacity-70 ">{selectedUsername[0]}</span>
                    </div>
                    }
                    {!!selectedUserPhoto && <img className='inline-block ml-2 w-8 h-8 text-center rounded-full'  src={selectedUserPhoto}/>}

                    <h3 className=' text-lg text-black'>{selectedUsername}</h3>

                </div>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600 cursor-pointer"
                    onClick={() => setSettingSelected("chat settings")}
                >
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>

                {/* <AvatarColor /> */}


            </div>
        </>
    )
}

export default ChatHead