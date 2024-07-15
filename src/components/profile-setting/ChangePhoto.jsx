// import { Camera } from 'react-camera-pro'
// import { useRef, useSatte } from 'react'
import WebCam from "react-webcam"
import classNames from "classnames"
import { useContext, useState } from "react";
import { UserContext } from "../../ReactContext";
import axios from "axios";

function ChangePhoto({ settingSelected, setSettingSelected }) {

    // const camera = useRef(null);
   
    const [camVisible, setCamVisible] = useState(false);
    const { currentUsername, currentUserId, setCurrentUsername, currentName, setCurrentName } = useContext(UserContext)
    const { profilePhoto, setProfilePhoto } = useContext(UserContext);
    const [image, setImage] = useState(profilePhoto);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const COLORS = [
        'bg-green-200', 'bg-red-200', 'bg-yellow-200', 'bg-teal-200',
        'bg-purple-200', 'bg-blue-200'
    ];

    const userIdBased10 = parseInt(currentUserId, 16);
    const colorIndex = userIdBased10 % COLORS.length;
    const color = COLORS[colorIndex];

    const updateProfilePicture = async () => {
        if (image) {
            // axios.put(`/user/update-picture`, JSON.stringify(image)).then(res => {
            //     console.log(res.data);
            // });
            const res = await fetch(`http://localhost:4001/user/update-picture`, {
                method: "PUT",
                body: JSON.stringify({ image }),
                headers: {
                    "content-type": "application/json",
                }, credentials: "include"
            })

            const data = await res.json();
            console.log(data);
            setProfilePhoto(image);
        }

    }

    const handleFile = (ev) => {
        const reader = new FileReader();
        reader.readAsDataURL(ev.target.files[0])
        reader.onload = () => {
            setImage(reader.result);
            updateProfilePicture();
        }
    }

    return (
        <>
            <div className={classNames(' bg-white h-full w-full m-0 absolute overflow-y-auto inset-0 p-4 transition-all duration-500', {
                "visible": settingSelected === "change photo",
                "hidden": settingSelected === ""
            })}>

                <div className="flex items-center ">
                    <div className='flex items-end gap-4 py-2 flex-grow '>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className=" w-6 h-6 text-black cursor-pointer hover:opacity-60"
                            onClick={() => setSettingSelected("")}

                        >
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                        </svg>

                        <h3 className=' text-lg text-black'>Change photo</h3>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500 cursor-pointer"

                        onClick={updateProfilePicture}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>


                </div>


                <div className="flex flex-col gap-3 text-center items-center">
                    {!image && <div className={`w-28 h-28 text-center rounded-full ${color} flex align-middle justify-center items-center relative`}
                    >
                        <span className="text-center opacity-70 text-6xl">{currentUsername[0]}</span>
                    </div>}

                    {image &&

                        <div className={` mx-10 text-center rounded-full flex align-middle justify-center items-center relative`}
                        >
                            <img src={`${image}`} alt="" className='w-full h-full' />
                        </div>
                    }



                    <div className="flex gap-3 items-center justify-center ">
                        <label className="bg-blue-500 p-2 text-white cursor-pointer rounded-sm w-28"
                            onClick={() => { setCamVisible(false) }}

                        >
                            import photo
                            <input type="file" hidden onChange={(e) => {
                                // setImage(e.target.files[0]);
                                // console.log(image);
                                handleFile(e);
                            }} />
                        </label>

                        <button className="bg-blue-500 p-2 text-white rounded-sm w-28"
                            onClick={() => { setCamVisible(true) }}
                        >take photo</button>

                    </div>


                    <div className="relative">
                        {camVisible && (

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-6 h-6 absolute top-0 right-0 text-blue-500 cursor-pointer"
                                onClick={() => setCamVisible(false)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>)}
                        {camVisible && <WebCam className=" block rounded-md mx-auto" style={{ width: "90%", height: "300px" }}
                            audio={false}
                            height={720}
                            screenshotFormat="image/jpeg"
                            width={1280}
                            videoConstraints={videoConstraints}
                        >

                            {({ getScreenshot }) => (
                                <button className=" bg-blue-500 p-2 text-white rounded-sm w-32 "
                                    onClick={() => {
                                        setImage(getScreenshot()),
                                        setCamVisible(false);

                                        console.log(image);
                                    }}
                                >
                                    capture photo
                                </button>
                            )}


                        </WebCam>}



                    </div>



                </div>





                {/* <div>
                    <Camera ref={camera} />
                    <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
                    <img src={image} alt='Taken photo' />
                </div> */}

            </div>
        </>
    )
}

export default ChangePhoto