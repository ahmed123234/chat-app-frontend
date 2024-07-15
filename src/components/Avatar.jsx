
function Avatar({ username, userId, online=undefined }) {
    /* I would like to calculate the color for each user depending on the userId */
    const COLORS = [
        'bg-green-200', 'bg-red-200', 'bg-yellow-200', 'bg-teal-200',
        'bg-purple-200', 'bg-blue-200' 
    ];

    const userIdBased10 = parseInt(userId, 16);
    const colorIndex = userIdBased10 % COLORS.length;
    const color = COLORS[colorIndex];

    // console.log("userId", userId, " userbased10", userIdBased10, " ", colorIndex);

    
    return (
        <>

            <div className={` w-8 h-8 text-center rounded-full ${color} flex align-middle justify-center items-center relative`}>
                <span  className="text-center opacity-70">{username[0]}</span>

                { online !== undefined && (
                    <span className={` w-3 h-3 inline-block absolute bottom-0 right-0 rounded-full border border-white ${online? 'bg-green-400': 'bg-gray-400'}`}></span>
                )}
            </div>
        </>
    )
}

export default Avatar