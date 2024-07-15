import React, { useState } from 'react'
import classNames from 'classnames'

function Switch({ isSelected, onClick}) {
  return (
    <>
        <div className= {classNames('flex w-9 items-center relative h-3 rounded-full transition-all duration-500 cursor-pointer', {
             'bg-blue-400':isSelected,  'bg-gray-400': !isSelected
        })}
        onClick={onClick}
        >
            <span className={classNames('h-5  w-5 bg-gray-600 rounded-full transition-all duration-500 shadow-lg', {
               ' bg-blue-600 ml-4': isSelected, 
            })}></span>

        </div>
    </>
  )
}

export default Switch