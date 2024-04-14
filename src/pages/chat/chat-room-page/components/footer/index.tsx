import { useState, useRef, useEffect } from 'react';
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
  const { isConnected, sendMessage } = useSocket({ roomId: wa_id });
  const [message, setMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if(message){
      const success: boolean = sendMessage(message);
      if (success) {
        updateMessageList(message, false);
        setMessage('');
      }  
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents the default Enter key behavior (new line)
      handleSend();
    }
  };

  useEffect(() => {
    const handleKeyDownWithFocus = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey && inputRef.current === document.activeElement) {
        e.preventDefault(); // Prevents the default Enter key behavior (new line)
        handleSend();
      }
    };

    document.addEventListener('keydown', handleKeyDownWithFocus);
    return () => {
      document.removeEventListener('keydown', handleKeyDownWithFocus);
    };
  }, [handleSend]);

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
        onKeyDown={handleKeyDown} // Handle Enter key press
        ref={inputRef} // Ref for the input field
      />
      <SendMessageButton
        onClick={handleSend}
        disabled={!isConnected || message.length === 0}
      >
        <Icon id="send" className="icon" />
      </SendMessageButton>
    </Wrapper>
  );
}
