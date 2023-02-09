import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useStory } from '../middleware/contextHooks'
import { toast } from 'react-toastify';
import { truncateString } from '../middleware/utils';
import {
    Grid,
    Button, Container, Tooltip,
    Box, List, ListItem, ListItemText,
} from '@mui/material'

import Masonry from '@mui/lab/Masonry'
import { MainContainer } from '../components/MainContainer';
import StoryCard from '../components/StoryCard'


export default function StoryList() {
    const {getStories, toasts, clearErrors, stories, clearCurrentStory} = useStory();
    const navigate = useNavigate();
    const [myStories, setMyStories] = useState([]);

    useEffect(() => {
        if(!stories){
            getStories()
        }

        if(stories){
            setMyStories(stories)
        }

        if(toasts){
            Array.from(toasts).forEach(ele => {
                toast(ele.message, {type: ele.type})
            });
            clearErrors()
        }

    },[toasts, clearErrors, stories, getStories])

    const onCreateNewStory = () => {
        clearCurrentStory();
        navigate('/newstory')
    }
    return (
        <MainContainer>
            <Container maxWidth="lg" sx={{py: 1, my: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={false} md={3}>
                        <List sx={{borderRadius: 5, mt: 3}}>
                            {myStories?.map(story => (
                                <Link
                                    style={{textDecoration: 'none'}}
                                    to={`/story/${story._id}`} key={story._id}>
                                    <ListItem>
                                        <Tooltip title={story.title} placement='right'>
                                            <ListItemText 
                                                primary={truncateString(story.body, 30)} 
                                            />
                                        </Tooltip>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Grid>

                    {/* <Grid item xs={12} md={9}>
                        
                    </Grid> */}

                    <Grid item xs={12} md={9}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 2}}>
                            <Button onClick={onCreateNewStory}>Create Story</Button>
                        </Box>
                        <Masonry columns={2}>
                            {myStories?.map(story => (
                                <StoryCard story={story} key={story._id} />
                            ))}
                        </Masonry>
                    </Grid>
                </Grid>
            </Container>
        </MainContainer>
    )
}
