import React from 'react';
import {getMatchesByCategoryAndGroup, formatDateTime, formatDate} from "@/utils/util";
import {OddType, MatchInfo} from "@/types/SportsData";

type CustomButtonProps = {
    onClick: (match: MatchInfo, oddType: OddType) => void;
    sportsMatches: MatchInfo[];
};


const SportsMatchItem: React.FC<CustomButtonProps> = ({onClick, sportsMatches}) => {
    const date = sportsMatches.length > 0? formatDate(sportsMatches[0].eventStart.toString()): ""
    return (
        <div className="mt-4 w-full">
            <div
                className="mb-4 text-xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight">
                {date}
            </div>
            {sportsMatches.map((match) => (
                <div
                    className="bg-primary bg-opacity-5 dark:bg-opacity-10 text-white p-4 rounded-lg w-full flex flex-row mt-4 justify-between">
                    <div className="w-1/3 flex-col m-2">
                        <div className="w-full text-body-color">{formatDateTime(match.eventStart)}</div>
                        <div className="mt-2">{match.participants[0].name}</div>
                        <div className="mt-2">{match.participants[1].name}</div>
                        <div className="mt-2 text-body-color">Liquidity: $ 12,312</div>
                    </div>
                    <div className="w-1/6 flex-col m-2">
                        <div className="text-center whitespace-nowrap overflow-hidden overflow-ellipsis">{match.participants[0].name}</div>
                        <button
                            className="mt-4  rounded-lg p-2 bg-primary w-full" onClick={() => onClick(match, OddType.homeWin)}>{match.odds.homeWin}
                        </button>
                    </div>
                    {match.odds.draw && <div className="basis-1/6 flex-col justify-center m-2 ">
                        <div  className="text-center whitespace-nowrap overflow-hidden overflow-ellipsis">Draw</div>
                        <button
                            className="mt-4  rounded-lg p-2  bg-primary w-full" onClick={() => onClick(match, OddType.draw)}>{match.odds.draw}
                        </button>
                    </div>}
                    <div className="w-1/6 flex-col justify-center m-2">
                        <div  className="text-center whitespace-nowrap overflow-hidden overflow-ellipsis">{match.participants[1].name}</div>
                        <button
                            className="mt-4 rounded-lg p-2 bg-primary w-full" onClick={() => onClick(match, OddType.awayWin)}>{match.odds.awayWin}
                        </button>
                    </div>
                </div>
            ))}

        </div>
    )
}


export default SportsMatchItem;