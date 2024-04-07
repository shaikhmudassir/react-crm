// import { Inbox } from "common/types/common.type";

import { Inbox } from "../../../common/types/common.type";
import { fetchData } from "../../../components/FetchData";
import { ChatContacts, ChatMessageHistory } from "../../../services/ApiUrls";

export const getChatContacts = async () => {
  const Header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
    org: localStorage.getItem('org')
  }
  return await fetchData(`${ChatContacts}/`, 'GET', null as any, Header);
  // return inbox;
}

export const getMessageHistory = async (wa_id:string) => {
  const Header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Token'),
    org: localStorage.getItem('org')
  }
  return await fetchData(`${ChatMessageHistory}/${wa_id}/`, 'GET', null as any, Header);
}
export const inbox: Inbox[] = [
  {
    id: "38v8ury2e7eleynh2h3",
    name: "John Smith",
    profile_image: "/assets/profile_images/boy1.webp",
    last_message: "Testing",
    notificationsCount: 5,
    messageStatus: "SENT",
    timestamp: "08:21",
    isPinned: false,
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334455",
    lead: "lead John Smith",
    contact: "1111111111"
  },
  {
    id: "38v8ury2e80leynh9lp",
    name: "Jane Doe",
    profile_image: "/assets/profile_images/boy2.jpeg",
    last_message: "Hello there!",
    notificationsCount: 2,
    messageStatus: "SENT",
    timestamp: "12:15",
    isPinned: false,
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334400",
    lead: "lead Jane Doe",
    contact: "222222222",
    isOnline: true,
  },
  {
    id: "38v8ury2e8hleynhflu",
    name: "Bob Johnson",
    profile_image: "/assets/profile_images/boy3.jpeg",
    last_message: "How are you?",
    notificationsCount: 0,
    messageStatus: "READ",
    timestamp: "6:47",
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334411",
    lead: "lead bob",
    contact: "3333333333",
    isPinned:true
  },
  {
    id: "38v8ury2e8yleynhli9",
    name: "Samantha Lee",
    profile_image: "/assets/profile_images/girl1.jpeg",
    last_message: "See you tomorrow!",
    messageStatus: "SENT",
    timestamp: "09:35",
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334422",
    lead: "lead sam",
    contact: "44444444444",
    isOnline: true,
    isPinned: true
  },
  {
    id: "38v8ury2e9cleynhqgh",
    name: "William Chen",
    profile_image: "/assets/profile_images/boy4.jpeg",
    last_message: "Thanks for your help!",
    messageStatus: "DELIVERED",
    timestamp: "5:22",
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334433",
    lead: "lead will",
    contact: "4444444444"
  },
  {
    id: "38v8ury2ectleyniehz",
    name: "Emily Kim",
    profile_image: "/assets/profile_images/girl2.jpeg",
    last_message: "Are you free tonight?",
    messageStatus: "READ",
    timestamp: "4:10",
    isOnline: true,
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334444",
    lead: "lead em",
    contact: "555555555555"
  },
  {
    id: "38v8ury2edbleynin0d",
    name: "David Wong",
    profile_image: "/assets/profile_images/boy5.webp",
    last_message: "Let's meet at the park!",
    messageStatus: "SENT",
    timestamp: "13:48",
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334455",
    lead: "lead dave",
    contact: "66666666666"
  },
  {
    id: "38v8ury2edsleynisii",
    name: "Karen Lee",
    profile_image: "/assets/profile_images/girl.jpeg",
    last_message: "I'll be there in 10 minutes.",
    messageStatus: "DELIVERED",
    timestamp: "08:56",
    isOnline: true,
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334466",
    lead: "lead karen",
    contact: "77777777777"
  },
  {
    id: "38v8ury2ee6leynix43",
    name: "Daniel Lee",
    profile_image: "/assets/profile_images/boy6.webp",
    last_message: "Can you send me the file?",
    messageStatus: "READ",
    timestamp: "19:03",
    wa_id: "alsdhkjsdhkjsdfkjsdh",
    number: "1122334477",
    lead: "lead danie",
    contact: "8888888888"
  },
];
