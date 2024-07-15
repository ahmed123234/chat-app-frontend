import React from 'react'
import Avatar from './Avatar'
import axios from 'axios'

function Contact({id, onClick, selected, username, online, profilePicture, settingSelected}) {
    return (
        <div key={id}
            className={`flex items-center gap-2 border-b border-gray-100 cursor-pointer ${selected ? 'bg-blue-50' : ''}`}
            onClick={onClick}
        >
            {/* check uf the user is the selected user */}
            {selected && (
                <div className='w-1 h-12 bg-blue-500 rounded-r-md'></div>
            )}

            <div className='flex items-center gap-4 py-2 pl-4 '>
                {/* add avatar for each person */}
                {!profilePicture && <Avatar online={online} username={username} userId={id}/>}
                {!!profilePicture &&  <img className='w-8 h-8 text-center rounded-full' src={`${axios.defaults.baseURL}/uploads/profile_pictures/${profilePicture}`} />}
                <div className='text-gray-800'>{username}</div>
            </div>
            

        </div>
    )
}

export default Contact
