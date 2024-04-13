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
  Date as DateElem,
  DateWrapper,
  EncryptionMessage,
  MessageGroup,
} from "./styles";
import { IconBase } from "react-icons";

type MessagesListProps = {
  onShowBottomIcon: Function;
  shouldScrollToBottom?: boolean;
  messages: Message[]
};

export default function MessagesList(props: MessagesListProps) {
  
  const params = useParams();
  const { onShowBottomIcon, shouldScrollToBottom, messages } = props;
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
        <DateElem> TODAY </DateElem>
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
  const messageDate = new Date(`${message.date}T${message.timestamp}`);
  const hours = messageDate.getHours();
  const minutes = messageDate.getMinutes();
  // Format the hours and minutes to HH:MM format
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return (
    <ChatMessage
      key={message.id}
      className={message.isOpponent ? "chat__msg--received" : "chat__msg--sent"}
      ref={ref}
    >
      <span>{message.message}</span>
      <ChatMessageFiller />
      <ChatMessageFooter>
        <span>{formattedTime}</span>
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
