import React from 'react';
import { useTranslation } from 'react-i18next';
import { BubbleChat } from 'flowise-embed-react';

const ChatWidget: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <BubbleChat
      chatflowid="3d1671f4-51fb-4c2b-8392-b24dc6563178"
      apiHost="https://proyecto-flowise.latiyp.easypanel.host"
      theme={{    
        button: {
          backgroundColor: '#2563eb',
          right: 20,
          bottom: 20,
          size: 48,
          dragAndDrop: true,
          iconColor: 'white',
          customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
          autoWindowOpen: {
            autoOpen: false,
            openDelay: 2,
            autoOpenOnMobile: false
          }
        },
        tooltip: {
          showTooltip: true,
          tooltipMessage: t('chat.welcome'),
          tooltipBackgroundColor: 'black',
          tooltipTextColor: 'white',
          tooltipFontSize: 16
        },
        disclaimer: {
          title: t('chat.disclaimer'),
          message: t('chat.disclaimer'),
          textColor: 'black',
          buttonColor: '#2563eb',
          buttonText: t('chat.startChat'),
          buttonTextColor: 'white',
          blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          backgroundColor: 'white'
        },
        customCSS: ``,
        chatWindow: {
          showTitle: true,
          showAgentMessages: true,
          title: t('chat.title'),
          titleAvatarSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
          welcomeMessage: t('chat.welcome'),
          errorMessage: 'An error occurred. Please try again.',
          backgroundColor: '#ffffff',
          height: 700,
          width: 400,
          fontSize: 16,
          starterPrompts: [
            "What services do you offer?",
            "How can you help my business?"
          ],
          starterPromptFontSize: 15,
          clearChatOnReload: false,
          sourceDocsTitle: 'Sources:',
          renderHTML: true,
          botMessage: {
            backgroundColor: '#f7f8ff',
            textColor: '#303235',
            showAvatar: true,
            avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png'
          },
          userMessage: {
            backgroundColor: '#2563eb',
            textColor: '#ffffff',
            showAvatar: true,
            avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
          },
          textInput: {
            placeholder: t('chat.placeholder'),
            backgroundColor: '#ffffff',
            textColor: '#303235',
            sendButtonColor: '#2563eb',
            maxChars: 500,
            maxCharsWarningMessage: 'Message is too long. Please keep it under 500 characters.',
            autoFocus: true,
            sendMessageSound: true,
            sendSoundLocation: 'send_message.mp3',
            receiveMessageSound: true,
            receiveSoundLocation: 'receive_message.mp3'
          },
          feedback: {
            color: '#303235'
          },
          dateTimeToggle: {
            date: true,
            time: true
          },
          footer: {
            textColor: '#303235',
            text: t('chat.poweredBy'),
            company: 'Alliasoft',
            companyLink: 'https://alliasoft.com'
          }
        }
      }}
    />
  );
};

export default ChatWidget;