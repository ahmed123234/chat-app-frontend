import React, { useContext, useEffect, useState } from 'react'
import Switch from '../Switch'
import classNames from 'classnames'
import { UserContext } from '../../ReactContext'
import axios from 'axios';

function ActiveStatus({settingSelected,  setSettingSelected }) {
    const {activeStatus, setActiveStatus, activeNowVisible, setActiveNowVisible} = useContext(UserContext);
    const [ active, setActive ] = useState(activeStatus);

   
    const [activeNow, setActiveNow] =useState(activeNowVisible);

    useEffect(() => {
        setActiveNow(activeNowVisible);
   }, [activeNowVisible])

   useEffect(() => {
    setActive(activeStatus);
    }, [activeStatus])

    useEffect(() => {

        if (active !== null || active !== undefined) {
            console.log("update active status to", active);
            axios.put(`/user?search=activeStatus&state=${active}`).then(() => {
                setActiveStatus(active)
            })
        }
    }, [active])


    useEffect(() => {
        if(activeNow !== undefined) {
            axios.put(`/user?search=activeNowVisible&state=${activeNow}`).then(res => {
                console.log(res.data);
                setActiveNowVisible(activeNow)
            })
        }
    }, [activeNow])
    
    return (
        <div className={classNames(' bg-white h-full w-full m-0 absolute inset-0 p-4 transition-all duration-500', {
            "visible": settingSelected === "active sattus",
            "hidden": settingSelected === ""
        })}>

            <div className='flex items-end gap-4 py-2'>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                    className=" w-6 h-6 text-black cursor-pointer hover:opacity-60"
                    onClick={() => setSettingSelected("")}

                >
                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>

                <h3 className=' text-lg text-black'>active status</h3>

            </div>
            <hr />

            <div className='flex items-center m-3'>

                <span className=' flex-grow'>"Show when you're active"</span>
                <Switch isSelected={active} onClick={() => {setActive(!active);}}
                    // parentClass={{'bg-gray-400':true,  'bg-gray-100': false}} 
            
                    // childClass={{' bg-black-600 ml-4': true, 'bg-white': false }} 
                />
            </div>

            <div>

            </div>

            <div className='flex items-center m-3'>

                <span className=' flex-grow'>see active status in inbox</span>
                <Switch 
                    isSelected={activeNow} onClick={() => setActiveNow(!activeNow)}
                // parentClass={{'bg-gray-400':true,  'bg-gray-100': false}} 
            
                // childClass={{' bg-black-600 ml-4': true, 'bg-white': false }} 
                />
            </div>

        </div>
    )
}

export default ActiveStatus