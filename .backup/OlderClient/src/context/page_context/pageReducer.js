import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_PAGE_SUCCESS:
            let pages = state.pages ? state.pages : [];

            return{
                ...state,
                pageCreated: true,
                currentPage: action.payload,
                pages: [...pages, action.payload]
            }
        case ActionTypes.GET_PAGES_SUCCESS:
            return{
                ...state,
                pages: action.payload
            }
        case ActionTypes.PAGE_FAIL:
            return{
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_PAGE:
            return {
                ...state,
                currentPage: action.payload,
                pages: state.pages.map(page => page._id === action.payload._id ? action.payload : page)
            }
        case ActionTypes.PAGE_DELETE:
            return {
                ...state,
                pages: state.pages.filter(page => page._id !== action.payload.pageId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_PAGE_BY_ID:
            return {
                ...state,
                currentPage: state.pages ? state.pages.find(page => page._id === action.payload) : null
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_PAGE:
            return {
                ...state,
                currentPage: null,
                pageCreated: false
            }
        case ActionTypes.CLEAR_PAGES:
            return {
                ...state,
                pages: null,
                currentPage: null,
                pageCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}