import {SportsEvent, SportsMatch} from "@/types/SportsData";

export const sportsEventsData: SportsEvent[] = [
  {
    "category": "Football",
    "categoryID": "FOOTBALL",
    "eventGroup": "EURO 2024",
    "eventGroupID": "EURO_2024",
    "isPopular": true
  },
  {
    "category": "Football",
    "categoryID": "FOOTBALL",
    "eventGroup": "Copa America",
    "eventGroupID": "Copa_America",
    "isPopular": false
  },
  {
    "category": "Basketball",
    "categoryID": "BASKETBALL",
    "eventGroup": "Olympic Basketball",
    "eventGroupID": "Olympic_Basketball",
    "isPopular": false
  },
  {
    "category": "Tennis",
    "categoryID": "TENNIS",
    "eventGroup": "Wimbledon Men Singles",
    "eventGroupID": "Wimbledon_Men_Singles",
    "isPopular": true
  },
  {
    "category": "Tennis",
    "categoryID": "TENNIS",
    "eventGroup": "Wimbledon Women Singles",
    "eventGroupID": "Wimbledon_Women_Singles",
    "isPopular": false
  },

]

export const sportsMatches: SportsMatch = {
  "FOOTBALL": {
    "EURO_2024": [{
      "categoryID": "FOOTBALL",
      "estimatedEnd": 1720288800,
      "matchID": "34LzMgdpWRJ1tFcKpnk4zdgQXAwdxdTQwzmhF3oAQ8ZJ",
      "eventGroupID": "EURO_2024",
      "eventStart": 1720281600,
      "odds": {
        "homeWin": "2.1",
        "draw": "1.9",
        "awayWin": "3.1"
      },
      "participants": [
        {
          "id": "FOOTBALL-EURO-ENG",
          "name": "England",
          "typeName": "EventParticipants"
        },
        {
          "id": "FOOTBALL-EURO-SWI",
          "name": "Switzerland",
          "typeName": "EventParticipants"
        }
      ]
    }, {
      "categoryID":
          "FOOTBALL",
      "estimatedEnd":
          1720202400,
      "matchID":
          "87y1hYLW7YyPPs2mBUmex6BBTDwTQ77H5CTajt22M21x",
      "eventGroupID":
          "EURO_2024",
      "eventStart":
          1720195200,
      "odds":
          {
            "homeWin":
                "2.3",
            "draw":
                "1.7",
            "awayWin":
                "3.2"
          }
      ,
      "participants":
          [
            {
              "id": "FOOTBALL-EURO-ESP",
              "name": "Spain",
              "typeName": "EventParticipants"
            },
            {
              "id": "FOOTBALL-EURO-DEU",
              "name": "Germany",
              "typeName": "EventParticipants"
            }
          ]
    }]
  },
  "TENNIS": {
    "Wimbledon_Men_Singles": [{
      "categoryID": "TENNIS",
      "estimatedEnd": 1720300000,
      "matchID": "1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p",
      "eventGroupID": "Wimbledon_Men_Singles",
      "eventStart": 1720293600,
      "odds": {
        "homeWin": "1.8",
        "awayWin": "2.2"
      },
      "participants": [
        {
          "id": "TENNIS-WIMBLEDON-MEN-NAD",
          "name": "Rafael Nadal",
          "typeName": "EventParticipants"
        },
        {
          "id": "TENNIS-WIMBLEDON-MEN-FED",
          "name": "Roger Federer",
          "typeName": "EventParticipants"
        }
      ]
    },
      {
      "categoryID": "TENNIS",
      "estimatedEnd": 1720314400,
      "matchID": "2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p1x",
      "eventGroupID": "Wimbledon_Men_Singles",
      "eventStart": 1720308000,
      "odds": {
        "homeWin": "2.0",
        "awayWin": "1.9"
      },
      "participants": [
        {
          "id": "TENNIS-WIMBLEDON-MEN-DJO",
          "name": "Novak Djokovic",
          "typeName": "EventParticipants"
        },
        {
          "id": "TENNIS-WIMBLEDON-MEN-MUR",
          "name": "Andy Murray",
          "typeName": "EventParticipants"
        }
      ]
    }],
  "Wimbledon_Women_Singles": [{
    "categoryID": "TENNIS",
    "estimatedEnd": 1720328800,
    "matchID": "3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p1x2y",
    "eventGroupID": "Wimbledon_Women_Singles",
    "eventStart": 1720322400,
    "odds": {
      "homeWin": "1.7",
      "awayWin": "2.3"
    },
    "participants": [
      {
        "id": "TENNIS-WIMBLEDON-WOMEN-SER",
        "name": "Serena Williams",
        "typeName": "EventParticipants"
      },
      {
        "id": "TENNIS-WIMBLEDON-WOMEN-OSK",
        "name": "Naomi Osaka",
        "typeName": "EventParticipants"
      }
    ]
  }, {
    "categoryID": "TENNIS",
    "estimatedEnd": 1720343200,
    "matchID": "4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p1x2y3z",
    "eventGroupID": "Wimbledon_Women_Singles",
    "eventStart": 1720336800,
    "odds": {
      "homeWin": "1.9",
      "awayWin": "2.1"
    },
    "participants": [
      {
        "id": "TENNIS-WIMBLEDON-WOMEN-HAL",
        "name": "Simona Halep",
        "typeName": "EventParticipants"
      },
      {
        "id": "TENNIS-WIMBLEDON-WOMEN-KER",
        "name": "Angelique Kerber",
        "typeName": "EventParticipants"
      }
    ]
  }]
}}