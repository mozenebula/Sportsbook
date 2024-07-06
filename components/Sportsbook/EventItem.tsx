import React from 'react';
import {MatchInfo, SportsEvent} from "@/types/SportsData";

// type CustomButtonProps = {
//     onClick: (event: React.MouseEvent<HTMLDivElement>, eventGroupID: string) => void;
//     eventGroupID: string;
//     icon: string
//     name: string
//     count: string
//     isPopular: string
// };

const EventItem= ({icon, name, count, isPopular }) => {
    var opacity = isPopular? "opacity-100": "opacity-0";
    return (
        <div className="flex items-center justify-between bg-gray-900 p-1 rounded-lg hover:bg-white_10 hover:bg-opacity-50 transition duration-300 ease-in-out group" >
            <div className="flex items-center">
            <img src={icon} alt={`${name} icon`} className={`w-6 h-6 mr-2 ${opacity} transition-opacity duration-300 ease-in-out pointer-events-none group-hover:opacity-100`}/>
            <span className="text-gray-400">{name}</span>
            </div>
            <div className="flex items-center justify-center bg-gray-800 text-gray-400 w-6 h-6 rounded-lg">
            {count}
            </div>
        </div>
);
};

export default EventItem;
