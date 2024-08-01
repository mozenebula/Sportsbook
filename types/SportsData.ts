type EventParticipant = {
    id: string;
    name: string;
    typeName: string;
}

export enum OddType {
    homeWin = "homeWin",
    draw = "draw",
    awayWin = "awayWin"
}

type Odds = {
    homeWin: string;
    draw?: string;
    awayWin: string
}

export type BetInfo = {
    matchInfo: MatchInfo
    oddType: OddType
}

export type MatchInfo = {
    category: string;
    categoryID: string;
    eventGroup: string;
    eventGroupID:string;
    estimatedEnd: number;
    matchID:string;
    name:string;
    eventStart: number;
    odds:Odds;
    participants: EventParticipant[];
}

export type SportsMatch =  {
    [categoryID: string]: {
        [eventGroupID: string]: MatchInfo[];
    };
};

export type SportsEvent = {
    category: string;
    categoryID:string;
    eventGroup: string;
    eventGroupID: string;
    isPopular: boolean;
}

export type SportsData = {
    football: SportsEvent[];
    basketball: SportsEvent[];
    tennis: SportsEvent[];
}

export type BetOrder = {
    matchId: string,
    betId: string,
    uid: string,
    option: string,
    amount: string
}

export  type BetHistoryInfo = {
    matchInfo: MatchInfo,
    betOrder: BetOrder,
}

