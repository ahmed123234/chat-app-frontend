import React from 'react'

function AddGroup({ settingSelected, setSettingSelected }) {
    return (
        <>
            {settingSelected !== "create group" && <span className='fixed z-10 bg-blue-500 rounded-full p-3 bottom-5  left-1/4 hover:bg-blue-600 transition-all duration-500 cursor-pointer'

                onClick={() => setSettingSelected("create group")}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

            </span>}
        </>
    )
}

export default AddGroup