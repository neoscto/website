
"use client";
import { useState } from "react";

const VideoPlayer = () => {
    const [isCentered, setIsCentered] = useState(false);

    const handleVideoClick = () => {
        alert("hy")
        setIsCentered(!isCentered);
    };

    return (
        <button  onClick={handleVideoClick} className={`${isCentered ? 'absolute max-w-full w-full bg-black bg-opacity-40 h-screen flex justify-center  items-center' : 'fixed bottom-[1rem] right-0 w-36'}`}>
            <video controls className={`${isCentered ? 'md:max-w-[350px] w-6/12' : ''}`}>
                <source src="https://videos.gotolstoy.com/public/f00d787b-4ba2-43d0-a780-24ad46b005ca/98d32db0-b1fe-4938-ba9d-a36346605775/98d32db0-b1fe-4938-ba9d-a36346605775.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </button>
    );
};

export default VideoPlayer;