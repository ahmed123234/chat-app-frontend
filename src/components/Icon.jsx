import { connect } from 'mongoose'
import React from 'react'

function Icon({backgroundColor, content = undefined, children, onClick}) {
  return (
    <>
        <div className=' pl-3  py-2 flex items-start justify-start gap-4 cursor-pointer hover:bg-blue-100 transition-all duration-100'
          onClick={onClick}
        >
            <div className={`w-8 h-8 text-center rounded-full ${backgroundColor} flex align-middle justify-center items-center relative`}>
                    {!content && children[0]}
                    {!!content && children}
            </div>
            
            {content === undefined && children[1]}
            {!!content &&<span>{content}</span>}
        </div>       
    </>
  )
}

export default Icon