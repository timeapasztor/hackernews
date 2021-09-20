import { SET_STR } from "../actions/Stories";
import {StoryItem} from "../types/Story";

export interface IStoriesState {
    stories: StoryItem[];
}

export const storyReducer = (state: IStoriesState = {} as IStoriesState, action: any) => {
    switch (action.type) {
        case SET_STR:
            return {
                ...state,
                stories: action.payload.stories
            };
        default:
            return state;
    }
};
