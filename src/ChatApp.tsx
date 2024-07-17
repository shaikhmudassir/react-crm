import React from "react";

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'

import ChatProvider from "./pages/chat/context/chat";
import UnSelectedChatPage from "./pages/chat/unselected-page";
import ChatRoomPage from "./pages/chat/chat-room-page";


export default function ChatApp() {

  return (
    <ChatProvider>
        <Routes>
            <Route path='/:id' element={<ChatRoomPage />} />
            <Route path='/' element={<UnSelectedChatPage />} />
        </Routes>
    </ChatProvider>
  );
}
