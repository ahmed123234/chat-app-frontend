import React from 'react'

function GroupOptions() {
    return (
        <>
            <div className='flex items-center gap-4 py-2 fixed top-0'>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    className=" w-6 h-6 text-black cursor-pointer hover:opacity-60"
                    onClick={() => setSettingSelected("")}

                >
                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>

                <input type="text" placeholder='Search' className=' block border-b-2 border-gray-400  p-2 focus:outline-none'
                    onChange={(e) => setSearchKey(e.target.value)}

                />

            </div>


            {/* {groupVisible && <div className=' sticky bottom-0 left-0 p-2 bg-white border-gray-400 shadow-md m-0 w-full cursor-pointer '>
                    <div className=' bg-gray-300 text-gray-500 text-center p-1 m-0 hover:text-black hover:translate-y-0.5 transition-all duration-200'>

                        START GROUP CHAT
                    </div>
                </div>} */}
        </>
    )
}

export default GroupOptions