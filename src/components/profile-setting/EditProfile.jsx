import React from 'react'
import classNames from "classnames"
import { useContext, useState } from "react";
import { UserContext } from "../../ReactContext";

function EditProfile({settingSelected, setSettingSelected, editProfile, setEditProfile}) {

    // const camera = useRef(null);
    // const [image, setImage] = useState(null);
    // const [camVisible, setCamVisible] = useState(false);
    const {currentUsername, currentUserId, setCurrentUsername, currentName, setCurrentName, profilePhoto} = useContext(UserContext)
    // const {profilePhoto, setProfilePhoto} = useContext(UserContext);
    const [ editPhotoVisible, setEditPhotoVisible ] = useState(false);

    // const videoConstraints = {
    //     width: 1280,
    //     height: 720,
    //     facingMode: "user"
    //   };

      const COLORS = [
        'bg-green-200', 'bg-red-200', 'bg-yellow-200', 'bg-teal-200',
        'bg-purple-200', 'bg-blue-200'
    ];

    const userIdBased10 = parseInt(currentUserId, 16);
    const colorIndex = userIdBased10 % COLORS.length;
    const color = COLORS[colorIndex];

    return (
        <>
            <div className={classNames(' bg-white h-full w-full m-0 absolute inset-0 p-4 transition-all duration-500', {
                "visible": settingSelected === "edit profile",
                "hidden": settingSelected === ""
            })}>

                <div className='flex items-end gap-4 py-2'>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className=" w-6 h-6 text-black cursor-pointer hover:opacity-60"
                        onClick={() => setSettingSelected("")}

                    >
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>

                    <h3 className=' text-lg text-black'>Edit profile</h3>
                </div>

                <div className="flex my-4 ">


                </div>

                <div className=' flex flex-col gap-3 text-center items-center'>
                    {/* <div className= {`w-28 h-28 text-center rounded-full flex align-middle justify-center items-center relative
                    
                        ${color}
                    `}>
                        
                        <span className="text-center opacity-70 text-6xl">{currentUsername[0]}</span>
                    </div> */}

                    {!profilePhoto && <div className={`w-28 h-28 text-center rounded-full ${color} flex align-middle justify-center items-center relative`}
                    >
                        <span className="text-center opacity-70 text-6xl">{currentUsername[0]}</span>
                    </div>}

                    {profilePhoto && 
                    
                        <div className={`w-28 h-28 text-center rounded-full flex align-middle justify-center items-center relative`}
                        >
                            <img src={`${profilePhoto}`} alt=""  className=' rounded-full w-full h-full'/>
                        </div>
                    }

                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                            setEditPhotoVisible(!editPhotoVisible)
                        }}
                    >Edit picture or avatat</span>

                    <form className="flex flex-col items-start gap-2 w-full">
                        <div className="mb-2 text-left">
                            <label className=" text-gray-500" htmlFor="">Name</label>
                            <input type="text" value={currentName} 
                                className=" border-b-2 w-full p-1"
                                onChange={(e) => setCurrentName(e.target.value)}
                            />
                        </div>
                        
                        <div className="mb-2 text-left">
                            <label htmlFor="" className=" text-gray-500">Username</label>
                            <input type="text" value={currentUsername} 
                                className="border-b-2 w-full p-1 inline-block"
                                onChange={(e) => setCurrentUsername(e.target.value)}
                            />
                        </div>
                        <button className="p-2  mb-2 text-center hover:bg-blue-400 bg-blue-600 text-white rounded-sm">save changes</button>

                    </form>
                </div>

              {editPhotoVisible && <div className='flex bg-gray-500 flex-col absolute w-full h-1/4 left-0'>
                        <div className='flex items-center gap-2 p-6 text-white cursor-pointer'
                            onClick={() => {setSettingSelected("change photo")
                                // console.log("edit phot now ", settingSelected);
                            }
                            }
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

                            <span>New profile picture</span>
                        </div>

                        <div className='flex items-center gap-2 p-6 text-red-700'>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-700">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

                            
                            <span className='text-red-700'>Remove current picture</span>
                        </div>
                    
                </div>}

            </div>
        </>
    )
}

export default EditProfile