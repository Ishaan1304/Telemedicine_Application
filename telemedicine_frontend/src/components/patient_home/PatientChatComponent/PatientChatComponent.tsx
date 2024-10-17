import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { getListOfPatients, getListOfProviders, getMessagePatientInitial, getMessageProviderInitial, sendMessage } from '@/redux/slice/messageSlice';
import { getProviderProfile } from '@/redux/slice/providerProfileSlice';
import { getPatientProfile } from '@/redux/slice/patientProfileSlice';

interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  phone: string;
  countryName: string;
  stateName: string;
  cityName: string;
  address: string;
}

interface Message {
  messageContent: string;
  messageId: number;
  sender: User;
  recipient: User;
  sentAt: string;
}

const PatientChatComponent: React.FC = () => {

  

  const dispatch=useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [myId, setMyId] = useState<number>(0);


  const messagesEndRef = useRef<HTMLDivElement>(null); 

  const usersData :User[]=useAppSelector((state)=>state.message.listOfProviders);
  const admin={
    userID: 252,
    firstName: "Ishaan",
    lastName: "Gangrade",
    email: "",
    username: "",
    password: "",
    role: "",
    phone: "",
    countryName: "",
    stateName: "",
    cityName: "",
    address: "",
  }
  const updatedUsersData = [...usersData, admin];


  const initialMessages:Message[]=useAppSelector((state)=>state.message.initialMessagesPatient)

  const user : User=useAppSelector((state)=>state.patientProfile.user);
  
  useEffect(()=>{
    const id=localStorage.getItem('id') 
    if(id){
      dispatch(getListOfProviders({id:+id}))
      setMyId(+id);
      dispatch(getMessagePatientInitial({id:+id}));
      dispatch(getPatientProfile({id:+id}));
    }
  },[newMessage]);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const filteredUsers = updatedUsersData.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    const userMessages = initialMessages.filter(msg => 
      (msg.sender.userID === user.userID || msg.recipient.userID === user.userID)
    );

    const sortedMessages = userMessages.sort((a, b) => {
      return new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime();
    });

    setMessages(sortedMessages);
  };

  const handleSendMessage = () => {
     if (newMessage && selectedUser) {
      const messageToSend: Message = {
        messageContent: newMessage,
        messageId: Date.now(), 
        sender: {
          userID: myId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: '',
          username: '',
          password: '',
          role: '',
          phone: '',
          countryName: '',
          stateName: '',
          cityName: '',
          address: ''
        }, 
        recipient: selectedUser,
        sentAt: new Date().toISOString(),
      };
       dispatch(sendMessage({id:selectedUser.userID,message:newMessage}))
       setMessages(prevMessages => [...prevMessages, messageToSend]);
       setNewMessage('');
     }
  };

  return (
    <Box 
      display="flex" 
      height="88vh" 
    >
      <Box flex={1} borderRight={1} borderColor="divider" padding={2} sx={{width:"200px", border:"1px solid black",backgroundImage: 'url(/assets/side-chat-bg.jfif)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center'}}
      >
        <Typography variant="h6" sx={{color:"white"}}>Users</Typography>
        <TextField
          fullWidth
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          margin="normal"

          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', 
              },
              '&:hover fieldset': {
                borderColor: 'white', 
              },
              '&.Mui-focused fieldset': {
                borderColor: 'blue', 
              },
              '& input::placeholder': {
                color: 'white', 
                opacity: 1, 
              },
              color:"white"
            },
          }}
        />
        <Box>
          {filteredUsers.map(user => (
            <Box
              key={user.userID}
              padding={1}
              onClick={() => handleUserClick(user)}
              sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'skyblue' } }}
            >
              <Typography variant="body1" sx={{color:"white",textAlign:"left",fontSize:"22px"}}>{user.firstName + " " + user.lastName}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box flex={2} display="flex" flexDirection="column" sx={{ width: "920px", border: "1px solid black", backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Box flex={1} overflow="auto" paddingBottom={0} display="flex" flexDirection="column" sx={{ height: "50px" }}>
          <Box flex={1} overflow="auto"
          sx={{
            flexGrow: 1,
            backgroundImage: 'url(/assets/chat-bg.jpg)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',}}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={msg.sender.userID === myId ? 'flex-end' : 'flex-start'}
                marginY={1}
              >
                <Box
                  maxWidth="70%"
                  padding={2}
                  borderRadius={2}
                  border={1}
                  borderColor="divider"
                  bgcolor={msg.sender.userID === myId ? '#e0f7fa' : '#ffe0b2'}
                >
                  <Typography variant="body2">
                    <strong>{msg.sender.firstName+" "+msg.sender.lastName}:</strong> {msg.messageContent} <small>{new Date(msg.sentAt).toLocaleString()}</small>
                  </Typography>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
        </Box>

        {selectedUser && (
          <Box display="flex" marginTop={0} paddingTop={1} sx={{ borderTop: '1px solid #ccc', position: 'sticky', bottom: 0, backgroundColor: 'white' }}>
            <TextField
              fullWidth
              placeholder="Type your message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              margin="normal"
              variant="outlined"
              sx={{ marginRight: 1, marginTop: "0px" }}
              size='small'
            />
            <Button variant="contained" onClick={handleSendMessage} size='small' sx={{ marginRight: "10px", height: "45px" }}>Send</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PatientChatComponent;
