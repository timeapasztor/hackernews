import { configureStore } from '@reduxjs/toolkit'
import { storyReducer } from './reducers/Stories'

export default configureStore({
    reducer: {
        randomStories: storyReducer
    },
})
