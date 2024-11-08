import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import Avatar from './Avatar';
import Logo from './Logo';
import { UserContext } from '../ReactContext';
import { uniqBy } from 'lodash'
import axios from 'axios';
import Contact from './Contact';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Profile from './Profile';
import Search from './Search';
import ChatHead from './ChatHead';
import ActiveNow from './ActiveNow';
import ProfileSettings from './profile-setting/ProfileSettings';
import UsersList from './UsersList';
import Group from './Group';
import AddGroup from './AddGroup';
import NewGroupLayout from './NewGroupLayout';

function Chat({ username }) {
    // conncet to websocket server
    const [ws, setWs] = useState(null);
    const groupRef = useRef(null);
    // const [activeVisible, setActiveVisible] = useState(true);
    const [settingSelected, setSettingSelected] = useState("");
    const [chatSlideVisible, setChatSlideVisible] = useState(false);
    const { onlinePeople, setOnlinePople } = useContext(UserContext);
    const { offlinePeople, setOfflinePeople } = useContext(UserContext);
    const { groups, setGroups,  defaultEmoji, 
        setDefaultEmoji } = useContext(UserContext);


    const { selectedUserId, setSelectedUserId, currentGroupMembers, setCurrentGroupMembers } = useContext(UserContext);
    const { selectedUsername, setSelectedUsername, profilePhoto, selectedUserPhoto, setSelectedUserPhoto } = useContext(UserContext)
    
    const [pickerVisible, setPickerVisible] = useState(false);
    const { activeNowVisible, setActiveNowVisible } = useContext(UserContext)
    // const [chatVisible, setChatVisible] = useState(false);
    // const [settingVisible, setSettingVisible] = useState(false);


    const reducer = (state, action) => {
        switch (action.type) {
            case 'setChatVisible':
                return { chatVisible: true, settingVisible: state.settingVisible }

            case 'setSettingVisible':
                return { chatVisible: state.chatVisible, settingVisible: true }

            case 'clrChatVisible':
                return { chatVisible: false, settingVisible: state.settingVisible }

            case 'clrSettingVisible':
                return { chatVisible: state.chatVisible, settingVisible: false }

        }
    }
    const displayState = { chatVisible: false, settingVisible: false };
    const [state, dispatch] = useReducer(reducer, displayState);

    // set the new message state
    const [newMessageText, setNewMessageText] = useState(defaultEmoji);

    // grap the current user to not be displayed in the content list
    const { currentUsername,
        currentUserId,
        setCurrentUserId,
        setCurrentUsername } = useContext(UserContext);

    // set the sent messages states 
    // messages are an array of objects
    const [messages, setMessages] = useState([]);

    // reference on the scrolled container of messages
    const divUnderMessages = useRef();

    useEffect(() => {
        connecToWSS();

    }, [selectedUserId]);

    function connecToWSS() {
        try {
            const ws = new WebSocket(`wss://${import.meta.env.VITE_SERVER_URL}`) // connected to websocket server
            setWs(ws);

            ws.addEventListener('message', (e) => handleMessage(e));
            ws.addEventListener('close', () => {
                setTimeout(() => {
                    console.log("Disconected. try to reconnect again by %s", username);
                    connecToWSS()
                }, 1000);
            })
        }catch(err) {
            console.log("Error: %s", err);
        }
    }

    const showOnlinePeople = (online) => {
        //define regular object
        const people = {};

        online.forEach(({ username, userId, activeStatus, profilePicture }) => {
            people[userId] = { username, activeStatus, profilePicture };
        });

        console.log("online people", people);
        setOnlinePople(people);
    }

    function handleMessage(event) {

        const messageData = JSON.parse(event.data);
        // console.log("new message", messageData);
        // console.log(event, messageData);

        if ('online' in messageData) {
            showOnlinePeople(messageData.online);
        }
        if ('text' in messageData) {
            // const { text, id, filename } = messageData
            // set the incomming messages
            /**
             * grap all the prev messages and add the incomming ones
             */
            if (messageData.sender === selectedUserId) {
                setMessages(prev => (uniqBy([...prev, { ...messageData }], '_id')));
                console.log("sender", messageData.sender, "selected user", selectedUserId);

                // console.log("incomming messages", messages.filter(message => message.isOur == false));
            }
        }
    }

    //send message
    const sendMessage = (ev, file = null) => {
        if (ev)
            ev.preventDefault();
        setPickerVisible(false);
        // console.log("the sended message is", newMessageText);

        // we will send the message to the wss
        // send the message and also send the user information of the selected user (the destination of the message)
        ws.send(JSON.stringify({
            message: {
                recipient: selectedUserId, //the selected userId
                text: newMessageText || defaultEmoji, //message text from the source
                file, // the file will be sent as binary data
            }
        }));

        if (file) {
            axios.get(`/messages/${selectedUserId}`).then(res => {
                const { data } = res;
                setMessages(uniqBy(data, '_id'));
                console.log("the current messages ", data);
            });
        } else {
            // empty the input filed
            setNewMessageText('');
            setMessages(prev => ([...prev, {
                text: newMessageText,
                sender: currentUserId,
                recipient: selectedUserId,
                _id: Date.now(),
            }
            ]));
        }

        // console.log("sended Messages", messages);

    }


    const sendFile = (event) => {

        console.log(event.target.files);
        const file = event.target.files[0];
        // read the file
        const reader = new FileReader();
        reader.readAsDataURL(file) //it will return the data  in form of base 64 [convert the binary data to base64

        // triggered after finishing read the data
        reader.onload = () => {

            // data is stored in reader result object
            sendMessage(null, {
                data: reader.result, // the data read from the file
                name: file.name,
                type: file.type// some information about the file 
            })
        }
        // sending the file using regular request without using web socket

        // axios.post("/message").then(res => {

        // });

        // use web socket is better to notify the recipient of the sent message

    }


    useEffect(() => {
        axios.get(`/groups/${currentUserId}`).then((res) => {

            console.log("user groups is ", res.data.groups);
            setGroups(res.data.groups)
            console.log("groups inside state is ", groups);

        })
    }, [currentUserId])

    // call an Api to specify the online People when the online people state will change
    useEffect(() => {
        /**
         * fetch all the people from the database 
         * and then we will filter all the online ones from onlinePeople state
         *  to grqp the offline ones
         * **/
        axios.get('/people').then(res => {
            const { data } = res;
            const offlinePeopleArray = data.filter(user => user._id !== currentUserId)
            .filter(user => !Object.keys(onlinePeople).includes(user._id));
            console.log("all users", data);

            // setOfflinePeople(offlinePeopleArray)
            const offlinePeople = {};

            offlinePeopleArray.forEach(person => {
                const { username, profilePicture, _id } = person;
                offlinePeople[_id] = { username, profilePicture };
            })
            console.log("offline people", offlinePeople);
            setOfflinePeople(offlinePeople);

        });

    }, [onlinePeople])




    // applay the effect on messages state is changed
    useEffect(() => {
        // auto scroll the bar if needed
        const div = divUnderMessages.current;
        if (div) {
            div.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    // this arrow function will exexcuted when the selectedUserId changed
    useEffect(() => {
        if (selectedUserId) {
            axios.get(`/messages/${selectedUserId}`).then(res => {
                const { data } = res;
                setMessages(uniqBy(data, '_id'));
                console.log("the current messages ", data);
            });
        }
    }, [selectedUserId]);


    const onEmojiSelect = (event) => {
        console.log(event.native);
        setNewMessageText(state => state + " " + event.native)
    }


    // const selectContent= (userId) => {
    //     console.log("the selected user is ", userId);
    // }

    // const onlinePeopleExcludeCurrentUser = {...onlinePeople};

    // delete onlinePeopleExcludeCurrentUser[currentUserId];

    // delete duplicates from the messages state using lodash
    // const messagesWithoutDuplicates = uniqBy(messages, 'id');

    return (
        <>
            {/* <h1>Welcome {username} Chat Here</h1> */}
            <div className="flex h-screen overflow-hidden">
                <div className="w-1/3 bg-white flex flex-col relative">

                    <div className='flex-grow overflow-auto'>
                        <Logo />

                        {<AddGroup settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}

                        <div className=' relative top-14 mb-8 '>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
                                <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                            </svg> */}

                            <Swiper className='my-3 mx-5 pb-10 '
                                // install Swiper modules
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={50}
                                slidesPerView={1}
                                // navigation
                                pagination={{ clickable: true, progressbarFillClass: true }}
                                // scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => swiper.isBeginning ? setChatSlideVisible(true) : setChatSlideVisible(false)}
                            // onSlideChange={() => console.log('slide change')}
                            >
                                <SwiperSlide className=''>
                                    {/* {setChatSlideVisible(true)} */}
                                    <UsersList settingSelected={settingSelected} setSettingSelected={setSettingSelected} />

                                    {settingSelected === 'create group' && <Group ref={groupRef} settingSelected={settingSelected} setSettingSelected={setSettingSelected} />}

                                </SwiperSlide>
                                <SwiperSlide className=''>
                                    {/* {setChatSlideVisible(false)} */}
                                    <Search />
                                </SwiperSlide>
                                <SwiperSlide className='overflow-y-auto'>
                                    {/* {setChatSlideVisible(false)} */}
                                    <Profile setWs={setWs} settingSelected={settingSelected} setSettingSelected={setSettingSelected} dispatch={dispatch} />
                                </SwiperSlide>

                            </Swiper>


                        </div>

                    </div>

                    {/* <div className='p-2 text-center flex align-middle justify-center'>

                        <span className='text-md text-gray-700 mr-2 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            {currentUsername}</span>
                        <button
                            className={`text-sm text-gray-500 cursor-pointer bg-blue-100 py-1 px-2 boder rounded-sm`}

                            onClick={() => { logout(); console.log("ws is", ws); }}
                        >
                            Logout
                        </button>
                    </div> */}
                </div>
                <div className="flex flex-col w-2/3 h-full p-2 bg-blue-50 relative">


                    <ProfileSettings settingSelected={settingSelected} setSettingSelected={setSettingSelected} />

                    {settingSelected === "create new group" && <NewGroupLayout settingSelected={settingSelected} setSettingSelected={setSettingSelected} groupMembers={groupRef.current} />}

                    {/* add a refrence on the scrolled container to make the scroll automatic  */}
                    {(!settingSelected || settingSelected === "create group") && (
                        <div className='flex-grow ' /**overflow-y-auto */>

                            {/* no selected user to chat */}
                            {!selectedUserId && (
                                <div className='flex items-center justify-center flex-grow h-full'>
                                    <div className="text-gray-400 fs-4">&larr; {/** larr: left arrow */} Selected a person from side par to start chating</div>

                                </div>
                            )}


                            {/* there is a selected user to chat (using bang bang(!!) to check that) */}
                            {!!selectedUserId && (
                                // set the outgoiing messages
                                <div className='relative h-full'>

                                    <ChatHead setPickerVisible={setPickerVisible} setSettingSelected={setSettingSelected} settingSelected={settingSelected} />

                                    <div className='absolute top-14 left-0 right-0 overflow-y-scroll bottom-2 '>
                                        {messages.map(message =>

                                            <div key={message._id} className={` ${message.sender === currentUserId ? ' text-right' : 'text-left'}`}>

                                                <div className={`flex  ${message.sender === currentUserId ? 'justify-end' : 'justify-start'} align-top items-start gap-0`}>

                                                    {message.sender === selectedUserId && (
                                                        !!selectedUserPhoto && <img className='inline-block ml-2 w-8 h-8 text-center rounded-full' src={selectedUserPhoto} />
                                                        ||
                                                        !selectedUserPhoto && <Avatar username={selectedUsername} userId={selectedUserId} />
                                                    )}

                                                    <div className={`text-left inline-block  overflow-hidden p-2 m-2 rounded-md text-md ${message.sender === currentUserId ?

                                                        'bg-blue-500 text-white' :
                                                        'bg-white text-grey-500'}  max-w-lg`

                                                    }>

                                                        {(message.text.match(/http*/) ?

                                                            <a className={`flex items-center gap-1 cursor-pointer hover:underline 
                                                                            ${message.sender !== currentUserId ? 'hover:text-blue-700' :
                                                                    'hover:text-blue-100'} target='blank`}
                                                                href={message.text} target='blank'
                                                            >

                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                                    <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                                                </svg>
                                                                {message.text}

                                                            </a>

                                                            : message.text) || (message.file &&

                                                                <div className=' '>

                                                                    <a className={`flex items-center gap-1 cursor-pointer hover:underline 
                                                                            ${message.sender !== currentUserId ? 'hover:text-blue-700' :
                                                                            'hover:text-blue-100'} target='blank`}
                                                                        href={`${axios.defaults.baseURL}/uploads/${message.file}`}
                                                                    >

                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                                            <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                                                        </svg>
                                                                        {message.file}

                                                                    </a>

                                                                </div>
                                                            )}

                                                    </div>

                                                    {message.sender === currentUserId && (
                                                        !!profilePhoto && <img className='inline-block ml-2 w-8 h-8 text-center rounded-full' src={profilePhoto} />
                                                        ||
                                                        !profilePhoto &&

                                                        <Avatar username={currentUsername} userId={currentUserId} />
                                                    )}

                                                </div>

                                            </div>
                                        )}

                                        {/* to style the smooth scroll behaviour */}
                                        <div ref={divUnderMessages}></div>
                                    </div>

                                </div>

                            )}
                        </div>)}

                    {(!settingSelected || settingSelected === "create group") && (<div className=' mx-1 flex flex-col overflow-y-auto'>
                        {!!selectedUserId && (
                            <form className='flex gap-2 items-center' onSubmit={sendMessage}>

                                <div className=' ml-1  relative grid grid-cols-1 flex-grow'>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        className="w-6 h-6 text-yellow-400 top-1 right-5 absolute translate-y-1/2 translate-x-1/2 cursor-pointer focus:border-blue-500"
                                        onClick={() => setPickerVisible(state => !state)}
                                    >
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
                                    </svg>

                                    <input type="text" className='p-2 bg-white my-2 border rounded-3xl  border-gray-600 focus:border-none'
                                        placeholder='Type your message here'
                                        value={newMessageText}
                                        onChange={(ev) => setNewMessageText(ev.target.value)}
                                    />

                                </div>


                                {/* emoji */}
                                {/* <label className='bg-gray-500  p-2 text-gray-600 border bodrer-gray-200 rounded-sm cursor-pointer'
                                    onClick={() => setPickerVisible(state => !state)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-400">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
                                    </svg>

                                </label> */}

                                <label className='bg-blue-200 p-2 text-gray-600 border bodrer-blue-200 rounded-sm cursor-pointer'>
                                    <input type="file" name="" id="" className=' hidden' onChange={sendFile} />
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
                                    </svg>

                                </label>

                                <button type='submit' className='p-2 text-white bg-blue-500 rounded-sm'>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                    </svg>

                                </button>
                            </form>

                        )}

                        {/* <Picker  pickerStyle={{width: '100%'}}></Picker> */}
                        {pickerVisible && <Picker className=" m-4" data={data} previewPosition='none' onEmojiSelect={onEmojiSelect}></Picker>}
                    </div>)}

                </div>

            </div>
        </>
    )
}

export default Chat