import {StoryItem} from "../types/Story";

export const SET_STORIES = "SET_STORIES";

export function setStories(stories: StoryItem[]) {
    return {
        type: SET_STORIES,
        payload: {
            stories
        }
    };
}
