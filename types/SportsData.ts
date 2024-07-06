type EventParticipant = {
    id: string;
    name: string;
    typeName: string;
}

type Odds = {
    homeWin: string;
    draw?: string;
    awayWin: string
}

export type MatchInfo = {
    categoryID: string;
    eventGroupID:string;
    estimatedEnd: number;
    matchID:string
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

