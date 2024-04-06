import { useState } from "react";
// import Icon from "common/components/icons";
import {
  AttachButton,
  Button,
  ButtonsContainer,
  IconsWrapper,
  Input,
  SendMessageButton,
  Wrapper,
} from "./styles";
import Icon from "./../../components/icons";
import useSocket from "../../hooks/useSocket";

const attachButtons = [
  { icon: "attachRooms", label: "Choose room" },
  { icon: "attachContacts", label: "Choose contact" },
  { icon: "attachDocument", label: "Choose document" },
  { icon: "attachCamera", label: "Use camera" },
  { icon: "attachImage", label: "Choose image" },
];
interface IFOOTER {
  wa_id:string
}
export default function Footer(props: IFOOTER) {
  const [showIcons, setShowIcons] = useState(false);
  const { chatLog, isConnected, sendMessage } = useSocket({roomId:props.wa_id});
  const [message, setMessage] = useState<string>('');
  return (
    <Wrapper>
      <IconsWrapper>
        <AttachButton onClick={() => setShowIcons(!showIcons)}>
          <Icon id="attach" className="icon" />
        </AttachButton>
        <ButtonsContainer>
          {attachButtons.map((btn) => (
            <Button showIcon={showIcons} key={btn.label}>
              <Icon id={btn.icon} />
            </Button>
          ))}
        </ButtonsContainer>
      </IconsWrapper>
      <Input placeholder="Type a message here .." onChange={(e)=>setMessage(e.target.value)}/>
      <SendMessageButton onClick={()=>{
        sendMessage(message)
        setMessage('')
      }}>
      <Icon id="send" className="icon" />
      </SendMessageButton>
    </Wrapper>
  );
}
