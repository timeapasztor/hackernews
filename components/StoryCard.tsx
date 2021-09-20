import React from 'react';
import {StoryItem} from "../types/Story";
import {StyleSheet, Text, View} from "react-native";

type StoryItemProps = {
    story: StoryItem;
}

const StoryCard: React.FC<StoryItemProps> = (props) => {
    return (
        <View style={styles.item} key={props.story.id}>
            <Text style={styles.title}>{props.story.title}</Text>
            <Text style={styles.inline}>
                <Text style={styles.author}>Created by: {props.story.author}</Text>
                <Text style={styles.author}> | </Text>
                <Text style={styles.author}>Author score: {props.story.authorScore}</Text>
            </Text>
            <Text style={styles.inline}>
                <Text style={styles.detail}>Story score: {props.story.score}</Text>
                <Text style={styles.detail}> | </Text>
                <Text style={styles.detail}>Updated {props.story.timestamp}</Text>
            </Text>
            <Text style={styles.url}>Read more: {props.story.url}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#ffe4e1',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 12,
        paddingBottom: 10,
        fontWeight: "bold"
    },
    url: {
        fontSize: 10
    },
    author: {
        fontSize: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        color: '#484848',
    },
    detail: {
        fontSize: 8,
        paddingBottom: 10,
        fontWeight: "bold",
        color: '#989898',
    },
    inline: {
        display: "flex",
        fontSize: 10,
        flexDirection: "row",
        flex: 1
    }
});

export default StoryCard;