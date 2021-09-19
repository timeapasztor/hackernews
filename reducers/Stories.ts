import { SET_STR } from "../actions/Stories";

export interface IStoriesState {
    stories: any;
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
