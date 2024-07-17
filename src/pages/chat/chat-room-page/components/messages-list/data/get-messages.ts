// import { MessageStatus } from "common/types/common.type";

import { MessageStatus } from "../../../../../../common/types/common.type";

export type Message = {
  id: string;
  message: string;
  date: string;
  timestamp: string;
  messageStatus: MessageStatus;
  isOpponent: boolean;
};

const messages: Message[] = [
  {
    id: "1",
    message: "Can you send me that file?",
    date: "19/02/2023",
    timestamp: "08:58",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "2",
    message: "sure.",
    date: "20/02/2023",
    timestamp: "09:01",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "3",
    message: "Yet another message here..",
    date: "20/02/2023",
    timestamp: "09:05",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "4",
    message: "What time should we meet?",
    date: "20/02/2023",
    timestamp: "12:30",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "5",
    message: "Can you send me that file?",
    date: "21/02/2023",
    timestamp: "15:42",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "6",
    message: "I'll be there in 10 minutes.",
    date: "22/02/2023",
    timestamp: "10:12",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "7",
    message: "Let's meet at the coffee shop.",
    date: "23/02/2023",
    timestamp: "18:03",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "8",
    message: "Sorry, I can't make it today.",
    date: "24/02/2023",
    timestamp: "13:25",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "9",
    message: "No problem, we can reschedule.",
    date: "25/02/2023",
    timestamp: "16:08",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "10",
    message: "Do you have any suggestions for dinner?",
    date: "26/02/2023",
    timestamp: "20:12",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "11",
    message: "How about that new Italian place?",
    date: "27/02/2023",
    timestamp: "09:52",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "12",
    message: "Sounds good to me.",
    date: "28/02/2023",
    timestamp: "14:27",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "13",
    message: "Glad to hear that!",
    date: "28/02/2023",
    timestamp: "14:30",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "14",
    message: "What time works for you?",
    date: "01/03/2023",
    timestamp: "11:45",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "15",
    message: "How about 2pm?",
    date: "01/03/2023",
    timestamp: "11:47",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "16",
    message: "2pm works great for me!",
    date: "01/03/2023",
    timestamp: "11:50",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "17",
    message: "See you then!",
    date: "01/03/2023",
    timestamp: "11:55",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "18",
    message: "Hey, what's up?",
    date: "02/03/2023",
    timestamp: "16:35",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "19",
    message: "Not much, how about you?",
    date: "02/03/2023",
    timestamp: "16:40",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "20",
    message: "Just hanging out at home.",
    date: "02/03/2023",
    timestamp: "16:42",
    messageStatus: "READ",
    isOpponent: false,
  },
  {
    id: "21",
    message: "Sounds nice. Any plans for the weekend?",
    date: "03/03/2023",
    timestamp: "09:20",
    messageStatus: "READ",
    isOpponent: true,
  },
  {
    id: "22",
    message: "Not yet, do you have any suggestions?",
    date: "03/03/2023",
    timestamp: "09:23",
    messageStatus: "DELIVERED",
    isOpponent: false,
  },
];

export function getMessages(): Message[] {
  const totalMessagesLength = messages.length;
  let randomNumber = Math.floor(Math.random() * totalMessagesLength);

  if (randomNumber > totalMessagesLength) randomNumber = totalMessagesLength;
  if (randomNumber === 1) randomNumber = 2; // so we always have atleast 1-2 messages.

  return messages.slice(0, randomNumber);
}
