import { useEffect, useContext, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import { io } from "socket.io-client";
import { AuthenticatedUserContext } from "../App";
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
export const socket = io('https://pratchatserver.onrender.com')

const Home = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext)
    const [users, setUsers] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <Image
                    source={{ uri: catImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });
        socket.emit('new-user', user)

        socket.on('userlist', (value) => {
            setUsers(value)
        })
    }, [navigation]);

    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <View>
                <Text style={styles.text} >Online users</Text>
                {users.map((obj) => {
                    return(
                    <View key={obj.username}>
                        <View style={styles.box}>
                            <View>
                                <View style={styles.onlineTag}></View>
                                <Image source={{ uri: obj.url }} style={{ height: 40, width: 40, borderRadius: 90, backgroundColor: '#fff', resizeMode: "center", }} />
                            </View>
                            <Text style={{ marginLeft: 10 }}>{`${obj.username}`}</Text>
                        </View>
                    </View>
                    )
                })}


            </View>

            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Chat")}
                    style={styles.chatButton}
                >
                    <Entypo name="chat" size={24} color={colors.lightGray} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    onlineTag: {
        height: 10,
        width: 10,
        backgroundColor: 'green',
        position: 'absolute',
        borderRadius: 90,
        bottom: 0,
        right: 0,
        zIndex: 100
    },
    text: {
        fontSize: 30,
        fontWeight: 300,
        marginLeft: 20,
        marginBottom: 15,
        marginTop: 15
    },
    box: {
        display: 'flex', flexDirection: "row", alignItems: 'center', backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,

    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    }
});