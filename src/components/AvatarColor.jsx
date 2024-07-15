import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react'
import { UserContext } from '../ReactContext';


const AvatarColor= forwardRef((props, ref) => {
    const { selectedUserId } = useContext(UserContext)
    const [color, setColor] = useState("")

    const COLORS = [
        'bg-green-200', 'bg-red-200', 'bg-yellow-200', 'bg-teal-200',
        'bg-purple-200', 'bg-blue-200'
    ];

    const userIdBased10 = parseInt(selectedUserId, 16);
    const colorIndex = userIdBased10 % COLORS.length;

     setColor(COLORS[colorIndex]);

     useImperativeHandle(ref, () => ({
        getAvatarColor() {
            console.log(color);
            color;
        }
     }))


    return (
        <>
            {color}
        </>
    )
});

export  default AvatarColor