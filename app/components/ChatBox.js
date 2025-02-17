import {
    MinChatUiProvider,
    MainContainer,
    MessageInput,
    MessageContainer,
    MessageList,
    MessageHeader
  } from "@minchat/react-chat-ui";
  function App() {
    return (
      <MinChatUiProvider theme="#6ea9d7">
        <MainContainer style={{ height: '100vh' }}>
          <MessageContainer>
            <MessageHeader />
            <MessageList
              currentUserId='dan'
              messages={[{
                text: 'Hello',
                user: {
                  id: 'mark',
                  name: 'Markus',
                },
              }]}
            />
            <MessageInput placeholder="Type message here" />
          </MessageContainer>
        </MainContainer>
      </MinChatUiProvider>
    )
  }
  
  export default App
  
  