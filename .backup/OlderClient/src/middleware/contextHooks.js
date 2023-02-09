import {useContext} from 'react';
import { AuthContext } from '../context/auth_context/AuthState';
import { StoryContext } from '../context/story_context/StoryState';
import { PageContext } from '../context/page_context/PageState';

export function useAuth() {
    return useContext(AuthContext);
}

export function useStory(){
    return useContext(StoryContext);
}

export function usePage(){
    return useContext(PageContext);
}