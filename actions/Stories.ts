import {StoryItem} from "../types/Story";

export const SET_STR = "SET_STORIES";

export function setStr(stories: StoryItem[]) {
    return {
        type: SET_STR,
        payload: {
            stories
        }
    };
}
