import { useEffect, useState } from 'react';
import { useChatContext } from '../../context/chat';
import { getLeadDetails, getMessageHistory } from '../../data/inbox';
import { Message } from '../components/messages-list/data/get-messages';
import useSocket from './useSocket';
// import { useChatContext } from "pages/chat/context/chat";

export default function useChatRoom() {
  const chatCtx = useChatContext();
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [showLeadDetails, setShowLeadDetails] = useState(true);
  const [leadDetails, setLeadDetails] = useState();
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const wa_id = chatCtx.activeChat?.wa_id;
  const lead_id = chatCtx.activeChat?.lead;
  const userActiveChatName = chatCtx.activeChat?.name;
  const { isConnected, sendMessage, recvMessages } = useSocket({
    roomId: wa_id || '',
  });

  useEffect(() => {
    if (wa_id) {
      getMessageHistory(wa_id || '').then((res) => {
        const sortedMessages = res.sort((a: Message, b: Message) => {
          const dateA = new Date(`${a.date}T${a.timestamp}`).getTime();
          const dateB = new Date(`${b.date}T${b.timestamp}`).getTime();
          return dateA - dateB;
        });
        setMessages(sortedMessages);
      });
    }
    if(lead_id){
      getLeadDetails(lead_id).then((res) => {
        setLeadDetails(res.lead_obj)
      });
    }
  }, [chatCtx.activeChat?.id]);

  const handleMenuOpen = (menu: 'search' | 'profile') => {
    setIsSearchOpen(menu === 'search' ? true : false);
    setIsProfileOpen(menu === 'profile' ? true : false);
  };

  useEffect(() => {
    if (recvMessages.length > 0) {
      console.log('new message recvd--->'[recvMessages.length - 1]);
      updateMessageList(recvMessages[recvMessages.length - 1], true);
    }
  }, [recvMessages]);

  const updateMessageList = (message: string, isReceived: boolean) => {
    const latestMessageObj: Message = messages[messages.length - 1];
    const latestId: number = parseInt(latestMessageObj.id);
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
    }); // HH:MM:SS format

    const newMessage: Message = {
      id: (latestId + 1).toString(),
      message: message,
      date: currentDate,
      timestamp: currentTime,
      messageStatus: 'SENT',
      isOpponent: isReceived,
    };
    setMessages([...messages, newMessage]);
  };

  const handleShowIcon = (state: boolean) => {
    setIsShowIcon(state);

    if (state === false) setShouldScrollToBottom(false);
  };

  const initiateConversation = () => {
    const defaultMessage = 'Hello '+userActiveChatName+', I am here to assist you. How can I help you today?';
    sendMessage(defaultMessage)
  }

  return {
    activeInbox: chatCtx.activeChat,
    handleMenuOpen,
    handleShowIcon,
    isProfileOpen,
    isSearchOpen,
    isShowIcon,
    setIsProfileOpen,
    setIsSearchOpen,
    setShouldScrollToBottom,
    shouldScrollToBottom,
    messages,
    updateMessageList,
    isConnected,
    sendMessage,
    showLeadDetails,
    setShowLeadDetails,
    leadDetails,
    initiateConversation,
    isTemplateOpen,
    setIsTemplateOpen
  };
}
