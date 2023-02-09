import {createContext, useReducer} from 'react';
import axios from 'axios';
import storyReducer from './storyReducer';
import * as ActionTypes from '../ContextActions';

export const StoryContext = createContext();

export default function StoryState(props){
    const initialstate = {
        stories: null,
        currentStory: null,
        toasts: null,
        storyCreated: false
    }

    const [state, dispatch] = useReducer(storyReducer, initialstate);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
        }
    }

    // #region --------------[ Actions ]--------------

    const getStories = async () => {
        try {
            const res = await axios.get('/api/v1/stories', config);
            dispatch({
                type: ActionTypes.GET_STORIES_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.STORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getStoryById = async (storyId) => {
        try {
            dispatch({
                type: ActionTypes.GET_STORY_BY_ID,
                payload: storyId
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.STORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createStory = async (storyData) => {
        try {
            const res = await axios.post('/api/v1/story/create', storyData, config);
            dispatch({
                type: ActionTypes.NEW_STORY_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.STORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updateStory = async (storyData) => {
        try {
            const res = await axios.put(`/api/v1/story/${storyData._id}`, storyData, config);
            dispatch({
                type: ActionTypes.UPDATE_STORY,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.STORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteStory = async (storyId) => {
        try {
            const res = await axios.delete(`/api/v1/story/${storyId}`, config);
            dispatch({
                type: ActionTypes.STORY_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.STORY_FAIL,
                payload: err.response.data,
            })
        }
    }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const clearStories = async () => {
        dispatch({
            type: ActionTypes.CLEAR_STORIES
        })
    }

    const clearCurrentStory = () =>{
        dispatch({type: ActionTypes.CLEAR_CURRENT_STORY})
    }

    // #endregion

    return (
        <StoryContext.Provider value={{
            stories: state.stories,
            currentStory: state.currentStory,
            toasts: state.toasts,
            storyCreated: state.storyCreated,
            
            clearCurrentStory,
            getStories,
            getStoryById,
            createStory,
            updateStory,
            deleteStory,
            clearErrors,
            clearStories

        }}>
            {props.children}
        </StoryContext.Provider>
    )
}