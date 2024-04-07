import { forwardRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import Icon from "common/components/icons";
import useScrollToBottom from "./hooks/useScrollToBottom";
import { Message } from "./data/get-messages";
import {
  ChatMessage,
  ChatMessageFiller,
  ChatMessageFooter,
  Container,
  Date,
  DateWrapper,
  EncryptionMessage,
  MessageGroup,
} from "./styles";
import { IconBase } from "react-icons";
import { getMessageHistory } from "../../../data/inbox";
import { useChatContext } from "../../../context/chat";

type MessagesListProps = {
  onShowBottomIcon: Function;
  shouldScrollToBottom?: boolean;
};

export default function MessagesList(props: MessagesListProps) {
  const [messages, setMessages] = useState<any>([]);
  const chatCtx = useChatContext();
  const wa_id = chatCtx.activeChat?.wa_id;
  const { onShowBottomIcon, shouldScrollToBottom } = props;

  const params = useParams();
  useEffect(()=>{
    if(wa_id){
      getMessageHistory(wa_id || '').then((res)=>{
        setMessages(res);
      });
    }
  },[params.id])

  const { containerRef, lastMessageRef } = useScrollToBottom(
    onShowBottomIcon,
    shouldScrollToBottom,
    params.id
  );

  return (
    <Container ref={containerRef}>
      <EncryptionMessage>
        <IconBase id="lock" className="icon" />
        Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read
        or listen to them. Click to learn more.
      </EncryptionMessage>
      <DateWrapper>
        <Date> TODAY </Date>
      </DateWrapper>
      <MessageGroup>
        {messages?.map((message:Message, i:any) => {
          if (i === messages.length - 1) {
            return <SingleMessage key={message.id} message={message} ref={lastMessageRef} />;
          } else {
            return <SingleMessage key={message.id} message={message} />;
          }
        })}
      </MessageGroup>
    </Container>
  );
}

const SingleMessage = forwardRef((props: { message: Message }, ref: any) => {
  const { message } = props;

  return (
    <ChatMessage
      key={message.id}
      className={message.isOpponent ? "chat__msg--received" : "chat__msg--sent"}
      ref={ref}
    >
      <span>{message.message}</span>
      <ChatMessageFiller />
      <ChatMessageFooter>
        <span>{message.timestamp}</span>
        {!message.isOpponent && (
          <IconBase
            id={`${message.messageStatus === "SENT" ? "singleTick" : "doubleTick"}`}
            className={`chat__msg-status-icon ${
              message.messageStatus === "READ" ? "chat__msg-status-icon--blue" : ""
            }`}
          />
        )}
      </ChatMessageFooter>
    </ChatMessage>
  );
});
