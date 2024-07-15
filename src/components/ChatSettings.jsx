import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../ReactContext';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import axios from 'axios';

function ChatSettings({ settingSelected, setSettingSelected }) {

    const {
        selectedUserPhoto,
        setSelectedUserPhoto,
        selectedUserId,
        setSelectedUserId,
        selectedUsername,
        setSelectedUsername,
        activeStatus,
        setActiveStatus,
        activeNowVisible,
        setActiveNowVisible,
        defaultEmoji,
        setDefaultEmoji,
        defaultChatColor,
        setDefaultChatColor,
        currentGroupMembers, 
        setCurrentGroupMembers 

    } = useContext(UserContext);

    const [customizeChat, setCustomizeChat] = useState("");
    const [colorClicked, setColorClicked] = useState(1);
    // const [emoji, setEmoji] = useState(defaultEmoji);
    const onEmojiSelect = (event) => {
        console.log(event.native);
        setDefaultEmoji(event.native)
        updateEmoji()
        // setCustomizeChat("");
    }

    useEffect(() => {
        axios.patch(`/groups/${selectedUserId}/color`, {chatColor: defaultChatColor}).then(res => {
            console.log(res.data);
        })
        // currentGroupMembers.forEach(({userId}) => {
        //     axios.patch(`${userId}/groups`, {})
        // })
    }, [defaultChatColor]);



    // useEffect(() => {
       const updateEmoji = () => { 
        axios.patch(`/groups/${selectedUserId}/emoji`, {chatEmoji: defaultEmoji}).then(res => {
            console.log(res.data);
        })
    
    }
    // }, [emoji]);

    // useEffect(() => {
    //     setDefaultEmoji(emoji)
    // }, [emoji])

    return (
        <>
            <div className={classNames(' bg-white  m-0 absolute inset-0  box-border transition-all duration-500 overflow-y-auto w-full', {
                "visible": settingSelected === "chat settings",
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
                    </div>


                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="w-6 h-6  hover:text-gray-600 mr-2 cursor-pointer rotate-90">
                        <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>

                </div>


                <hr className=' block m-0 p-0 bg-gray-400' />

                <div className='flex flex-col items-center text-center justify-center align-middle mt-20 gap-3'>
                    <img src={selectedUserPhoto} alt="" className=' w-52 h-52 rounded-full inline-block my-3' />

                    <h3 className=''>{selectedUsername}</h3>

                    <div className='flex justify-center items-center gap-7'>
                        <span className=' p-3 bg-gray-100 cursor-pointer rounded-full hover:bg-gray-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                            </svg>
                        </span>

                        <span className=' p-3 bg-gray-100 cursor-pointer rounded-full hover:bg-gray-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
                            </svg>

                        </span>

                    </div>
                </div>

                <div className='flex flex-col gap-4 mx-4 my-6 items-start'>

                    <div className='flex gap-5 items-center cursor-pointer hover:bg-gray-100 w-full rounded-sm p-2'
                        onClick={() => setCustomizeChat("color")}
                    >

                        {/* <span className=' p-1 cursor-pointer bg-blue-500 text-center rounded-full'> */}
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${'text' + defaultChatColor.substring(2)}`}>
                            <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
                        </svg> */}
                        <span className= {`flex justify-center items-center w-8 h-8  rounded-full ${defaultChatColor} `}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>

                        </span>

                        <span>Color</span>

                        {/* </span> */}
                    </div>

                    <div className='flex gap-5 items-center cursor-pointer hover:bg-gray-100  w-full rounded-sm p-2'
                        onClick={() => setCustomizeChat("emoji")}
                    >
                        {defaultEmoji === "" &&
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className="w-8 h-8 text-blue-500 cursor-pointer">
                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                            </svg>

                        }

                        {
                            defaultEmoji && <span className='text-center flex items-center rounded-full w-8 h-8 text-2xl bg-gray-50'>
                                {defaultEmoji}
                            </span>
                        }

                        <span>Emoji</span>
                    </div>

                    <div className='flex gap-5 items-center cursor-pointer hover:bg-gray-100 w-full rounded-sm p-2'

                    >

                        <span className=' flex items-center rounded-full text-black font-bold text-center w-8 h-8 box-border cursor-pointer bg-white text-2xl '>Aa</span>
                        <span>Nicknames</span>
                    </div>


                    <h4 className=' text-gray-400 '>Group Info</h4>


                    <div className='flex gap-5 items-center cursor-pointer hover:bg-gray-100  w-full rounded-sm p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                        </svg>


                        <span>See group members</span>
                    </div>


                    <h4 className=' text-gray-400 '>Privacy & support</h4>


                    <div className='flex gap-5 items-center cursor-pointer hover:bg-gray-100  w-full rounded-sm p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>


                        <span>Something's wrong</span>
                    </div>

                    <div className='flex gap-5 items-center cursor-pointer hover:bg-gray-100  w-full rounded-sm p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 rotate-180 text-red-700">
                            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>


                        <span className=' text-red-500'>Leave Chat</span>
                    </div>

                </div>

            </div>

            {customizeChat &&


                <div className=' absolute w-full h-screen bg-black opacity-50 top-0 left-0 bottom-0'>


                </div>

            }



            {/* {customizeChat === "color" && */}

            <div
                className={classNames(`bg-white absolute rounded-3xl
                         left-3 right-3 w-11/12 mx-auto h-96 opacity-100 p-4 
                         pb-8 overflow-y-auto transition-all duration-700`, {
                    "bottom-3": customizeChat !== "",
                    "-bottom-96": customizeChat == ""

                }
                )} >
                {/* <div className=' absolute'> */}


                <div className='flex items-center rounded-t-3xl bg-white z-10 shadow-sm p-3 mx-auto w-full'>
                    <h2 className=' flex-grow font-bold font-sans '>Customize your chat</h2>
                    <span className=' text-center bg-gray-100 pinter hover:opacity-70 p-2  cursor-pointer rounded-full'
                        onClick={() => setCustomizeChat("")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                        </svg>
                    </span>
                </div>
                {/* </div> */}

                {customizeChat === "color" && <div className='m-3 flex gap-3 items-center flex-wrap'>
                    {/* <span className=' w-20 h-20 bg-gray-300 rounded-full cursor-pointer hover:opacity-30 '> */}
                    <span className={classNames(' text-center flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full box-border cursor-pointer hover:opacity-70')}

                        onClick={() => { setDefaultChatColor('bg-blue-600'), setColorClicked(1) }}
                    >
                        {colorClicked === 1 &&
                            <Tick />
                        }
                    </span>

                    {/* </span> */}

                    <span className={classNames('w-16 h-16 flex items-center justify-center bg-green-600 rounded-full cursor-pointer hover:opacity-60', {
                    })}
                        onClick={() => { setDefaultChatColor('bg-green-600'), setColorClicked(2) }}
                    >
                        {colorClicked === 2 &&
                            <Tick />

                        }

                    </span>

                    <span className='w-16 h-16  bg-red-600 flex items-center justify-center rounded-full cursor-pointer hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-red-600'), setColorClicked(3) }}
                    >
                        {colorClicked === 3 &&
                            <Tick />

                        }
                    </span>

                    <span className=' w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-yellow-600'), setColorClicked(4) }}
                    >
                        {colorClicked === 4 &&
                            <Tick />

                        }

                    </span>

                    <span className=' w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-orange-600'), setColorClicked(5) }}
                    >
                        {colorClicked === 5 &&
                            <Tick />

                        }

                    </span>

                    <span className=' w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-purple-600'), setColorClicked(6) }}
                    >
                        {colorClicked === 6 &&
                            <Tick />

                        }
                    </span>

                    <span className='w-16 h-16 bg-pink-600 rounded-full  flex items-center justify-center cursor-pointer hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-pink-600'), setColorClicked(7) }}
                    >
                        {colorClicked === 7 &&
                            <Tick />

                        }

                    </span>

                    <span className='w-16 h-16 bg-gray-500 rounded-full cursor-pointer flex items-center justify-center hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-gray-500'), setColorClicked(8) }}
                    >
                        {colorClicked === 8 &&
                            <Tick />

                        }

                    </span>

                    <span className='w-16 h-16 bg-green-400 rounded-full cursor-pointer flex items-center justify-center hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-green-400'), setColorClicked(9) }}
                    >
                        {colorClicked === 9 &&
                            <Tick />

                        }

                    </span>

                    <span className='w-16 h-16 bg-pink-400 rounded-full cursor-pointer flex items-center justify-center hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-pink-400'), setColorClicked(10) }}
                    >
                        {colorClicked === 10 &&
                            <Tick />
                        }

                    </span>

                    <span className='w-16 h-16 bg-slate-600 rounded-full cursor-pointer flex items-center justify-center hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-slate-600'), setColorClicked(11) }}
                    >
                        {colorClicked === 11 &&
                            <Tick />
                        }
                    </span>

                    <span className='w-16 h-16 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-blue-500'), setColorClicked(12) }}
                    >
                        {colorClicked === 12 &&
                            <Tick />
                        }
                    </span>

                    <span className='w-16 h-16 bg-red-500 rounded-full cursor-pointer flex items-center justify-center hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-red-500'), setColorClicked(13) }}
                    >
                        {colorClicked === 13 &&
                            <Tick />
                        }
                    </span>

                    <span className='w-16 h-16 bg-purple-500 rounded-full cursor-pointer flex items-center justify-center hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-purple-500'), setColorClicked(14) }}
                    >
                        {colorClicked === 14 &&
                            <Tick />
                        }
                    </span>
                    <span className='w-16 h-16 bg-yellow-500 rounded-full cursor-pointer flex items-center justify-center hover:opacity-60'
                        onClick={() => { setDefaultChatColor('bg-yellow-500'), setColorClicked(15) }}
                    >
                        {colorClicked === 15 &&
                            <Tick />
                        }
                    </span>
                </div>
                }

                {customizeChat === "emoji" &&
                    <Picker className=" m-4" data={data} previewPosition='none' onEmojiSelect={onEmojiSelect}></Picker>

                }

                <div className='flex gap-6 justify-center items-center'> {/** absolute bottom-3 left-1/2 -translate-x-1/2 */}
                    <span className={classNames('cursor-pointer p-2 px-4 rounded-xl ', {
                        "bg-gray-400": customizeChat === "color",
                        "bg-gray-200": customizeChat !== "color"
                    })}


                    >Color</span>
                    <span className={classNames(
                        'cursor-pointer p-2 px-4 rounded-xl', {

                        "bg-gray-400": customizeChat === "emoji",
                        "bg-gray-200": customizeChat !== "emoji"
                    }
                    )}>Emoji</span>

                </div>
            </div>
            {/* } */}



        </>
    )
}

function Tick() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8 text-white">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
        </svg>

    )
}

export default ChatSettings



