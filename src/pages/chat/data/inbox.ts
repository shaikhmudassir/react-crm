// import { Inbox } from "common/types/common.type";

import { Inbox } from "../../../common/types/common.type";
import { fetchData } from "../../../components/FetchData";
import { ChatContacts } from "../../../services/ApiUrls";

export const getChatContacts = async () => {
  const Header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
    org: localStorage.getItem('org')
  }
  return await fetchData(`${ChatContacts}/`, 'GET', null as any, Header);
}
export const inbox: Inbox[] = [
  // {
  //   id: "38v8ury2e7eleynh2h3",
  //   name: "John Smith",
  //   image: "/assets/images/boy1.webp",
  //   lastMessage: "Testing",
  //   notificationsCount: 5,
  //   messageStatus: "SENT",
  //   timestamp: "08:21",
  //   isPinned: true,
  // },
  // {
  //   id: "38v8ury2e80leynh9lp",
  //   name: "Jane Doe",
  //   image: "/assets/images/boy2.jpeg",
  //   lastMessage: "Hello there!",
  //   notificationsCount: 2,
  //   messageStatus: "SENT",
  //   timestamp: "12:15",
  //   isPinned: true,
  //   isOnline: true,
  // },
  // {
  //   id: "38v8ury2e8hleynhflu",
  //   name: "Bob Johnson",
  //   image: "/assets/images/boy3.jpeg",
  //   lastMessage: "How are you?",
  //   notificationsCount: 0,
  //   messageStatus: "READ",
  //   timestamp: "6:47",
  // },
  // {
  //   id: "38v8ury2e8yleynhli9",
  //   name: "Samantha Lee",
  //   image: "/assets/images/girl1.jpeg",
  //   lastMessage: "See you tomorrow!",
  //   messageStatus: "SENT",
  //   timestamp: "09:35",
  // },
  // {
  //   id: "38v8ury2e9cleynhqgh",
  //   name: "William Chen",
  //   image: "/assets/images/boy4.jpeg",
  //   lastMessage: "Thanks for your help!",
  //   messageStatus: "DELIVERED",
  //   timestamp: "5:22",
  // },
  // {
  //   id: "38v8ury2ectleyniehz",
  //   name: "Emily Kim",
  //   image: "/assets/images/girl2.jpeg",
  //   lastMessage: "Are you free tonight?",
  //   messageStatus: "READ",
  //   timestamp: "4:10",
  //   isOnline: true,
  // },
  // {
  //   id: "38v8ury2edbleynin0d",
  //   name: "David Wong",
  //   image: "/assets/images/boy5.webp",
  //   lastMessage: "Let's meet at the park!",
  //   messageStatus: "SENT",
  //   timestamp: "13:48",
  // },
  // {
  //   id: "38v8ury2edsleynisii",
  //   name: "Karen Lee",
  //   image: "/assets/images/girl.jpeg",
  //   lastMessage: "I'll be there in 10 minutes.",
  //   messageStatus: "DELIVERED",
  //   timestamp: "08:56",
  //   isOnline: true,
  // },
  // {
  //   id: "38v8ury2ee6leynix43",
  //   name: "Daniel Lee",
  //   image: "/assets/images/boy6.webp",
  //   lastMessage: "Can you send me the file?",
  //   messageStatus: "READ",
  //   timestamp: "19:03",
  // },
];
