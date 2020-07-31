import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
// Reações, comentários, conteudo, usuario(nome, foto), titulo, horario, 
// localização, labels(Iluminação, furto...)

const FeedCard = ({ postData }) => {
    const { Reactions, comments, content, user, title, date, location, labels, id } = postData;
    const emptyClass = ["o-", '']
    const [isEmpty, setIsEmpty] = React.useState(emptyClass[0])
    const [upvotes, setUpvotes] = React.useState(postData.upvotes)

    const handleLike = _ => {
        if (isEmpty == emptyClass[0]) {
            setIsEmpty(emptyClass[1])
            setUpvotes(upvotes + 1)            
        }
        else {
            setIsEmpty(emptyClass[0])
            setUpvotes(upvotes - 1)
        }
    }
    return (
        <View style={styles.card}>
            <View>
                <View style={styles.header}>{/* header */}
                    <Image style={styles.userImg} source={user.img} />
                    <View style={styles.postInfo}>
                        <View>
                            <Text style={styles.postUser}>{user.name}</Text>
                            <Text style={styles.postTitle}>{title}</Text>
                        </View>
                        <Text>{date}</Text>
                    </View>

                </View>
                <View style={styles.content}>{/* Content */}
                    <Text>{content}</Text>
                </View>
            </View>

            <View style={styles.reactions}>{/* Curtidas */}

                <View style={styles.reactionItem}>
                    <TouchableOpacity onPress={handleLike}>
                        <FontAwesome name={`arrow-circle-${isEmpty}up`} size={22} color="black" />
                        {/* <Ionicons style={styles.postIcon} name={`md-heart${isEmpty}`} size={20} color="#791DD1" /> */}
                    </TouchableOpacity>
                    <Text>{upvotes}</Text>
                </View>
                <View style={styles.reactionItem}>
                    <EvilIcons style={{ ...styles.postIcon, paddingHorizontal: 4 }} name="comment" size={24} color="black" />
                    <Text>0</Text>
                </View>

            </View>
        </View>
    )
}

export default FeedCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        margin: 5,
        // borderWidth: 1,
        elevation: 2,
        overflow: 'hidden',
    },
    postInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userImg: {
        borderRadius: 100,
        width: 60,
        height: 60,
        marginRight: 5
    },
    postUser: {
        fontSize: 15,
        fontWeight: "700"
    },
    postTitle: {
        color: '#791DD1',
        fontWeight: "700",
        fontSize: 13,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        padding: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
    },
    content: {
        paddingBottom: 10,
    },
    reactions: {
        width: '60%',
        flex: 1,
        flexDirection: 'row',
        paddingTop: 7,
        borderTopWidth: .2,
        borderColor: '#dbdbddf1',
        alignItems: 'center'
    },
    reactionItem: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.2,
        marginHorizontal:5,
    },
    postIcon: {
        borderRadius: 100,
        backgroundColor: '#f1f1f3b2',
        padding: 5,
        paddingHorizontal: 8,
        marginRight: 4
    },
    title: {
        width: '100%',
        fontSize: 32,
        marginTop: 15
    },
    subtitle: {
        marginVertical: 15,
        fontSize: 11,
        color: 'grey'
    },
    input: {
        padding: 13,
        paddingLeft: 25,
        marginBottom: 5,
        alignSelf: 'center',
        marginTop: 15,
    },
})