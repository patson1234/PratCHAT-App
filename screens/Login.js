import React, { useState,useContext } from "react";
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Linking } from "react-native";
import { AuthenticatedUserContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
const backImage = require("../assets/backImage.png");
const Login = () => {
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const {user,setUser} = useContext(AuthenticatedUserContext)
  
  function onHandleLogin(){
    setUser({
      username:username,
      url:url
    })
    AsyncStorage.setItem('authKey',JSON.stringify({
      username,
      url
    }))
  }
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <View>
        <Text style={styles.title}>Register</Text>
         <TextInput
        style={styles.input}
        placeholder="Enter username"
        autoCapitalize="none"
        keyboardType='default'
        textContentType="nickname"
        autoFocus={true}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter profile pic URL"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="URL"
        keyboardType="url"
        value={url}
        onChangeText={(text) => setUrl(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Register</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Contact developer? </Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://patson1234.github.io/webies')}>
          <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}>Here</Text>
        </TouchableOpacity>
      </View>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
})
export default Login