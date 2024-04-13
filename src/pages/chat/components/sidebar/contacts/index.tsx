// import Icon from "common/components/icons";
// import { Inbox } from "common/types/common.type";
import { Inbox } from "../../../../../common/types/common.type";
import {
  Avatar,
  AvatarWrapper,
  BottomContent,
  Contact,
  Content,
  MessageStatusIcon,
  MessageWrapper,
  Name,
  Subtitle,
  Time,
  TopContent,
  UnreadContact,
} from "./styles";
import { IconBase } from "react-icons";

type InboxContactProps = {
  inbox: Inbox;
  onChangeChat?: Function;
  isActive?: boolean;
};

export default function InboxContact(props: InboxContactProps) {
  const { onChangeChat, isActive } = props;
  const { name, last_message, profile_image, timestamp } = props.inbox;

  const handleChangeChat = () => {
    if (onChangeChat) {
      onChangeChat(props.inbox);
    }
  };

  return (
    <Contact isActive={isActive} onClick={handleChangeChat}>
      <AvatarWrapper>
        <Avatar src={profile_image} />
      </AvatarWrapper>
      <Content>
        <TopContent>
          <Name>{name}</Name>
          {timestamp && last_message ? <Time>{timestamp}</Time> : <Trailing {...props.inbox} />}
        </TopContent>

        <BottomContent>
          <MessageWrapper>
            <Message {...props.inbox} />
          </MessageWrapper>

          {timestamp && last_message && <Trailing {...props.inbox} />}
        </BottomContent>
      </Content>
    </Contact>
  );
}

function Message(props: Pick<Inbox, "messageStatus" | "last_message">) {
  const { last_message, messageStatus } = props;

  if (!last_message) return <></>;

  return (
    <>
      <MessageStatusIcon
        isRead={messageStatus === "READ"}
        id={messageStatus === "SENT" ? "singleTick" : "doubleTick"}
      />
      <Subtitle>{last_message}</Subtitle>
    </>
  );
}

function Trailing(props: Pick<Inbox, "isPinned" | "notificationsCount">) {
  const { isPinned, notificationsCount } = props;

  return (
    <div className="sidebar-contact__icons">
      {isPinned && <IconBase id="pinned" className="sidebar-contact__icon" />}

      {notificationsCount !== undefined && notificationsCount > 0 && (
        <UnreadContact>{notificationsCount}</UnreadContact>
      )}

      <button aria-label="sidebar-contact__btn">
        <IconBase id="downArrow" className="sidebar-contact__icon sidebar-contact__icon--dropdown" />
      </button>
    </div>
  );
}
