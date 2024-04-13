import { useState } from 'react';
// import Icon from "common/components/icons";
import {
  AttachButton,
  Button,
  ButtonsContainer,
  IconsWrapper,
  Input,
  SendMessageButton,
  Wrapper,
} from './styles';
import Icon from './../../components/icons';
import useSocket from '../../hooks/useSocket';

const attachButtons = [
  { icon: 'attachRooms', label: 'Choose room' },
  { icon: 'attachContacts', label: 'Choose contact' },
  { icon: 'attachDocument', label: 'Choose document' },
  { icon: 'attachCamera', label: 'Use camera' },
  { icon: 'attachImage', label: 'Choose image' },
];
interface IFOOTER {
  wa_id: string;
  updateMessageList: (newMessage: string, isReceived: boolean) => void;
}
export default function Footer(props: IFOOTER) {
  const { wa_id, updateMessageList } = props;
  const [showIcons, setShowIcons] = useState(false);
  const { chatLog, isConnected, sendMessage } = useSocket({ roomId: wa_id });
  const handleSend = () => {
    const success: boolean = sendMessage(message);
    if (success) {
      updateMessageList(message, false);
      setMessage('');
    }
  };
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
      <Input
        placeholder="Type a message here .."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendMessageButton
        onClick={() => {
          handleSend();
        }}
        disabled={!isConnected || message.length == 0}
      >
        <Icon id="send" className="icon" />
      </SendMessageButton>
    </Wrapper>
  );
}
