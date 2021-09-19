import React, {useEffect, useState} from 'react';
import {
    StatusBar,
    Text,
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import Api from "../api/Api";
import {setStr} from "../actions/Stories";
import {connect} from "react-redux";

type StoryItemType = {
    title: string;
    url: string;
    timestamp: string;
    score: number;
    author: string;
    authorScore: number;
    id: string;
}

const ApplicationRoot = (props: any) => {
    const [storyItems, setStoryItems] = useState<StoryItemType[]>([]);

    useEffect(() => {
        loadStories();
    },[]);

    useEffect(() => {
        props.handleStoryItems(storyItems);
    },[storyItems])

    const loadStories = async () => {
        const storyIds = await Api.fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const selectedStoryIds = storyIds.sort(() => 0.5 - Math.random()).slice(0, 10);

        let promises: Promise<StoryItemType>[] = [];
        selectedStoryIds.forEach((storyId: string) => {
            let promise = fetchStoryItem(storyId)
            promises.push(promise)
        })

        Promise.all(promises).then((storyItems) => {
            setStoryItems(storyItems)
        })
    }

    const fetchStoryItem = async (id: string) => {
        let urlStoryDetail = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const storyDetail = await Api.fetch(urlStoryDetail);
        let urlAuthorDetail = `https://hacker-news.firebaseio.com/v0/user/${storyDetail.by}.json`;
        const authorDetail = await Api.fetch(urlAuthorDetail);
        return {
            id: id,
            title: storyDetail.title,
            url: storyDetail.url,
            timestamp: storyDetail.time,
            score: storyDetail.score,
            author: authorDetail.id,
            authorScore: authorDetail.karma
        }
    }

    const renderStories = () => {
        let randomStories: JSX.Element[] = [];
        if (props.randomStories) {
            props.randomStories.map((story:StoryItemType) => {
                randomStories.push(
                    <View style={styles.item} key={story.id}>
                        <Text style={styles.title}>{story.title}</Text>
                        <Text style={styles.title}>{story.url}</Text>
                        <Text style={styles.title}>{story.author}</Text>
                        <Text style={styles.title}>{story.authorScore}</Text>
                        <Text style={styles.title}>{story.score}</Text>
                        <Text style={styles.title}>{story.timestamp}</Text>
                    </View>
                )
            })
            return randomStories;
        }
    }

    console.log("ITEMS", storyItems.length);

    return (
        <View style={styles.view}>
            <StatusBar barStyle={"dark-content"}/>
            {!storyItems.length ? <ActivityIndicator color={"#eeeee"} size={"large"}/> : <ScrollView contentInsetAdjustmentBehavior={"always"}>
                {renderStories()}
            </ScrollView>}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        height: 150,
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        fontSize: 12,
    },
    container: {
        flex: 1
    },
    text: {
        fontSize: 22,
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state: { randomStories: any }) => {
    const randomStories = state.randomStories.stories;
    return { randomStories };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleStoryItems: (stories: any) => dispatch(setStr(stories)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationRoot);
