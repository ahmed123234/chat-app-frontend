import { SwiperSlide } from "swiper/react"
import Avatar from "./Avatar"

function ActiveContact({ id, onClick, selected, username}) {

    return (
        <SwiperSlide key={id}
            className={`my-2 flex flex-col items-start gap-0 border-b border-gray-100 cursor-pointer ${selected? 'opacity-80': ""}`}
            onClick={onClick}
        >
            {/* <div className='flex items-center gap-2 py-2 pl-4 '> */}
                <Avatar online={true} username={username} userId={id} />
                <div className='text-gray-800'>{username}</div>
            {/* </div> */}

        </SwiperSlide>
    )

}

export default ActiveContact