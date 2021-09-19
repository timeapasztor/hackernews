export const SET_STR = "SET_STORIES";

export function setStr(stories: any) {
    return {
        type: SET_STR,
        payload: {
            stories
        }
    };
}
