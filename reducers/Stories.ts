import { SET_STORIES } from "../actions/Stories";
import { StoryItem } from "../types/Story";

export interface IStoriesState {
    stories: StoryItem[];
}

export const storyReducer = (state: IStoriesState = {} as IStoriesState, action: any) => {
    switch (action.type) {
        case SET_STORIES:
            return {
                ...state,
                stories: action.payload.stories
            };
        default:
            return state;
    }
};
