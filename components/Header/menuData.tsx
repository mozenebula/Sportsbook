import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Sportsbook",
    path: "/sportsbook",
    newTab: false
  },
  {
    id: 2,
    title: "Transfer",
    path: "/transfer",
    newTab: false,
  },
  {
    id: 3,
    title: "Lend",
    path: "/feature",
    newTab: false,
  },
  {
    id: 4,
    title: "NFT",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Transfer",
        path: "/feature",
        newTab: false,
      },
      {
        id: 42,
        title: "NFTFI",
        path: "/feature",
        newTab: false,
      }
    ],
  },
  {
    id: 5,
    title: "More",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "Swap",
        path: "/feature",
        newTab: false,
      },
      {
        id: 52,
        title: "Liquidity",
        path: "/feature",
        newTab: false,
      }
    ],
  },
];
export default menuData;
