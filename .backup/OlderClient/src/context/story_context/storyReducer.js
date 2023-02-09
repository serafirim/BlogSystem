import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_STORY_SUCCESS:
            let stories = state.stories ? state.stories : [];

            return{
                ...state,
                storyCreated: true,
                currentStory: action.payload,
                stories: [...stories, action.payload]
            }
        case ActionTypes.GET_STORIES_SUCCESS:
            return{
                ...state,
                stories: action.payload
            }
        case ActionTypes.STORY_FAIL:
            return{
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_STORY:
            return {
                ...state,
                currentStory: action.payload,
                stories: state.stories.map(story => story._id === action.payload._id ? action.payload : story)
            }
        case ActionTypes.STORY_DELETE:
            return {
                ...state,
                stories: state.stories.filter(story => story._id !== action.payload.storyId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_STORY_BY_ID:
            return {
                ...state,
                currentStory: state.stories ? state.stories.find(story => story._id === action.payload) : null
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_STORY:
            return {
                ...state,
                currentStory: null,
                storyCreated: false
            }
        case ActionTypes.CLEAR_STORIES:
            return {
                ...state,
                stories: null,
                currentStory: null,
                storyCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}