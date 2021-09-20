import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import Api from "../api/Api";
import {setStr} from "../actions/Stories";
import {connect} from "react-redux";
import {StoryItem} from "../types/Story";
import StoryCard from "./StoryCard";
import {getStoryTime} from "../utils/fnDate";

const HackerStories: React.FC = (props: any) => {
    const [storyItems, setStoryItems] = useState<StoryItem[]>([]);

    useEffect(() => {
        loadStories();
    },[]);

    useEffect(() => {
        props.handleStoryItems(storyItems);
    },[storyItems])

    const loadStories = async () => {
        const storyIds = await Api.fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const selectedStoryIds = storyIds.sort(() => 0.5 - Math.random()).slice(0, 10);

        let promises: Promise<StoryItem>[] = [];
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
        const time = getStoryTime(storyDetail.time);
        return {
            id: id,
            title: storyDetail.title,
            url: storyDetail.url,
            timestamp: time,
            score: storyDetail.score,
            author: authorDetail.id,
            authorScore: authorDetail.karma
        }
    }

    const renderStories = () => {
        let randomStories: JSX.Element[] = [];
        if (props.randomStories) {
            props.randomStories.map((story:StoryItem, index: number) => {
                randomStories.push(
                    <StoryCard key={index} story={story}/>
                )
            })
            return randomStories;
        }
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(HackerStories);
