import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useContext,
  useEffect
} from 'react';
import { TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticatedUserContext } from "../App";
import { socket } from './Home';
const Chat = ({}) => {
  const navigation = useNavigation()
  const [messages, setMessages] = useState([])
  const {user,setUser} = useContext(AuthenticatedUserContext)

  function onSignOut(){
    setUser(null)
    AsyncStorage.removeItem('authKey')
 }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    socket.on('chatMsgFromServer',(value)=>{
      incoming(value)
    })
  }, [])
  
  const incoming = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))  
  }, [])
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    socket.emit('chatMsgFromClient',messages[0])
  }, [])

  return (
    <GiftedChat
    messages={messages}
    showAvatarForEveryMessage={false}
    renderUsernameOnMessage={true}
    showUserAvatar={true}
    onSend={messages => onSend(messages)}
    messagesContainerStyle={{
      backgroundColor: '#fff'
    }}
    textInputStyle={{
      backgroundColor: '#fff',
      borderRadius: 20,
    }}
    user={{
      _id: user.username,
      avatar: user.url,
      name:user.username
    }}
  />
  )
}

export default Chat