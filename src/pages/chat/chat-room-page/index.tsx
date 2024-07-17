import ChatLayout from '../layouts';
import Header from './components/header';
import Footer from './components/footer';
import Sidebar from './components/sidebar';
// import Icon from "common/components/icons";
import useChatRoom from './hooks/useChatRoom';
import ProfileSection from './components/profile';
import MessagesList from './components/messages-list';
import SearchSection from './components/search-section';
import useNavigateToChat from './hooks/useNavigateToChat';
import {
  Container,
  Body,
  Background,
  FooterContainer,
  ScrollButton,
} from './styles';
import { IconBase } from 'react-icons';
import useSocket from './hooks/useSocket';
import LeadDetailsSection from './components/lead-details';
import ActionBar from '../chat-action-bar/ActionBar';
import TemplatesSection from './components/templates';

export default function ChatRoomPage() {
  const {
    activeInbox,
    handleMenuOpen,
    handleShowIcon,
    isProfileOpen,
    isTemplateOpen,
    setIsTemplateOpen,
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
    leadDetails,
    showLeadDetails,
    setShowLeadDetails,
    initiateConversation
  } = useChatRoom();
  useNavigateToChat(activeInbox);
  return (
    <>
      <ActionBar />
      <ChatLayout>
        <Container>
          <Body>
            <Background />
            <Header
              title={activeInbox?.name ?? ''}
              image={activeInbox?.profile_image ?? ''}
              subTitle={activeInbox?.isOnline ? 'Online' : ''}
              onSearchClick={() => handleMenuOpen('search')}
              onProfileClick={() => {
                handleMenuOpen('profile')
                setIsProfileOpen(!isProfileOpen);
              }}
            />
            <MessagesList
              onShowBottomIcon={handleShowIcon}
              shouldScrollToBottom={shouldScrollToBottom}
              messages={messages}
              initiateConversation={()=>setIsTemplateOpen(!isTemplateOpen)}
            />
            <FooterContainer>
              {isShowIcon && (
                <ScrollButton onClick={() => setShouldScrollToBottom(true)}>
                  <IconBase id="downArrow" />
                </ScrollButton>
              )}
              <Footer
                wa_id={activeInbox?.wa_id || ''}
                updateMessageList={updateMessageList}
                isConnected={isConnected}
                sendMessage={sendMessage}
              />
            </FooterContainer>
          </Body>
          <Sidebar
            title="Search"
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          >
            <SearchSection />
          </Sidebar>
          {isTemplateOpen && 
            <Sidebar
              title="Templates Section"
              isOpen={isTemplateOpen}
              onClose={() => {
                setIsTemplateOpen(false)
              }}
            >
              <TemplatesSection
                onSend={(template:any)=>initiateConversation(template.messageBody)}
              />
            </Sidebar>}
          <Sidebar
                title="Lead Details"
                isOpen={showLeadDetails}
                onClose={() => {
                  setShowLeadDetails(true);
                }}
              >
                <LeadDetailsSection leadDetails={leadDetails} />
              </Sidebar>
              <Sidebar
                title="Contact Info"
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              >
                <ProfileSection
                  name={activeInbox?.name ?? ''}
                  image={activeInbox?.profile_image ?? ''}
                />
              </Sidebar>
        </Container>
      </ChatLayout>
    </>
  );
}
