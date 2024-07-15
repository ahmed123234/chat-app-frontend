import React, { useContext, useState } from 'react'
import { UserContext } from '../ReactContext';
import classNames from 'classnames';
import UsersSearchList from './UsersSearchList';
import axios from 'axios';
import Contact from './Contact';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function NewGroupLayout({ settingSelected, setSettingSelected, groupMembers }) {

    // const [searchKey, setSearchKey] = useState("");
    // const { onlinePeople } = useContext(UserContext);
    // const { offlinePeople } = useContext(UserContext);
    // const { currentUserId } = useContext(UserContext);
    // const { selectedUserId, setSelectedUserId } = useContext(UserContext);
    // const { selectedUsername, setSelectedUsername, setSelectedUserPhoto } = useContext(UserContext)

    // const [groupVisible, setGroupVisible] = useState(false)
    const [groupName, setGroupName] = useState("")
    const [clicked, setClicked] = useState(false);
    const [groupPhoto, setGroupPhoto] = useState("");
    const [chatMembers, setChatMembers] = useState(groupMembers.getGroupMembers());
    const { groups, setGroups } = useContext(UserContext);


    // const [groupMembers, setGroupMembers] = useState([]);
    console.log("members", groupMembers);

    const createGroup = () => {
        if (groupName && groupPhoto) {

            // const members = [];

            // chatMembers.forEach(member =>
            //     members.push(member.userId)
            // )

            axios.post('/groups/create', { name: groupName, members: chatMembers, profilePicture: groupPhoto }).then(res => {
                
                const group = res.data;
                console.log(group);
                setGroups(prev => [...prev, group]);
                console.log(groups);

                chatMembers.forEach( async ({userId}) => {

                    const res = await axios.patch(`${userId}/groups/new`, group);
                    console.log(res.data);
             
                 })

            })

          

        } else {
            console.log("error some thing went wrong");
        }
    }

    const uploadGroupPicture = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setGroupPhoto(reader.result);
        }
        // reader.onload(() => {
        //     // reader.result;
        //     setGroupPhoto(reader.result);            
        // })

    }


    return (
        <>

            <div className={classNames(' bg-white  m-0 absolute inset-0  box-border transition-all duration-500 overflow-y-auto w-full', {
                "visible": settingSelected === "create new group",
                "hidden": settingSelected === ""
            })}>

                <div className='flex items-center fixed z-10 py-2  bg-white shadow-sm  w-2/3 box-border'>

                    <div className='flex items-center gap-4 flex-grow px-4 mx-3 box-border'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className=" w-6 h-6 text-black cursor-pointer hover:opacity-60"
                            onClick={() => setSettingSelected("")}

                        >
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>

                        <h2 className='p-2 font-sans font-bold'
                            onChange={(e) => setSearchKey(e.target.value)}

                        >
                            New group chat
                        </h2>
                    </div>

                    {groupName === "" &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-6 h-6 text-black hover:text-red-600 mr-2 cursor-pointer"

                            onClick={() => setSettingSelected("")}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    }

                    {(groupName && chatMembers.length !== 0) &&
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-6 h-6 text-black mr-2 hover:text-green-600 cursor-pointer"
                            onClick={() => {
                                createGroup()
                                setSettingSelected("")
                            }}

                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    }

                </div>




                <hr className=' block m-0 p-0 bg-gray-400' />


                <div className='flex flex-col gap-4 justify-start m-2 px-4 mt-20'>

                    {/* <label htmlFor="">Group Name</label> */}

                    {/* <img src="" alt="" /> */}

                    <div className='flex flex-col justify-center align-middle items-center '

                        onClick={() => setClicked(true)}
                    >

                        <label className='w-52 h-52 rounded-full cursor-pointer bg-red-300 relative'>
                            <img src={groupPhoto} alt="" className=' absolute w-full h-full rounded-full top-0 left-0' />

                            <input type="file" name="" id="" hidden
                                onChange={(e) => uploadGroupPicture(e.target.files[0])}
                            />

                            {!groupPhoto &&
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className=" w-20 h-20 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:-translate-y-1.5 hover:opacity-70  transition-all duration-200"
                                >
                                    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                </svg>
                            }

                        </label>

                        <input type="text"
                            placeholder='Enter a group name'
                            disabled={chatMembers.length == 0}
                            className='border-b-gray-100 p-2 border-b-2 focus:outline-none focus:border-b-gray-300 text-center font-semibold text-gray-400'

                            onChange={(e) => { setGroupName(e.target.value) }}

                        />

                    </div>

                    <div className='flex gap-5 m-2 mt-12 '>

                        <div className='flex flex-col  gap-2 w-full bg-transparent shadow-sm rounded-md '>
                            <h2 className=' font-sans font-semibold'>Group Members</h2>


                            {/* add the current user contact */}
{/* 
                            <Contact

                                key={currentUserId}
                                selected={false}
                                id={currentUserId}
                                username={currentUsername}
                                online={activeStatus}
                                profilePicture={profilePicture === '' ? undefined : profilePicture.split}
                                onClick={undefined}
                            /> */}

                            {chatMembers.map(member => {

                                const { userId, username, profilePicture, activeStatus } = member;
                                return (

                                    <div className='flex items-center hover:bg-slate-100 hover:translate-y-0 transition-all duration-200'>
                                        <div className=' flex-grow'>
                                            <Contact

                                                key={userId}
                                                selected={false}
                                                id={userId}
                                                username={username}
                                                online={activeStatus}
                                                profilePicture={profilePicture === '' ? undefined : profilePicture}
                                                onClick={undefined}
                                            />
                                        </div>

                                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg> */}

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 cursor-pointer hover:opacity-75"

                                            onClick={() => { setChatMembers(prev => prev.filter(member => member.userId !== userId)) }}
                                        >
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>


                                    </div>

                                )
                            })}
                        </div>

                        {/* <div className='flex flex-col  gap-2 w-1/2'>
                            <h2>More settings</h2>

                        </div> */}
                    </div>

                </div>


                {/* {groupVisible && <div className=' sticky bottom-0 left-0 p-2 bg-white border-gray-400 shadow-md m-0 w-full cursor-pointer '>
                    <div className='bg-gray-300 text-gray-500 text-center p-1 m-0 hover:text-black hover:translate-y-0.5 transition-all duration-200'
                        onClick={() => setSettingSelected("create new group")}
                    >
                        CREATE GROUP CHAT
                    </div>
                </div>} */}
            </div>
        </>
    )
}

export default NewGroupLayout