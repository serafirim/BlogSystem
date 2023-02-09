import {useState, useEffect} from 'react'

import { MainContainer } from '../components/MainContainer';

import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Button, TextField,
  Stack, IconButton, Typography
} from '@mui/material';
import {toast} from 'react-toastify';


// #region -----------( ICONS )-------------
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit'
// #endregion -----------( ICONS )-------------


import { useStory } from '../middleware/contextHooks';

export default function StoryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
      stories, currentStory, getStoryById, toasts, 
      clearToasts, deleteStory, updateStory, getStories
    } = useStory();
    const [edit, setEdit] = useState(false);
    const [story, setStory] = useState(null);
    const [temp, setTemp] = useState(null);

    useEffect(() => {
        if(!stories) {
            getStories();
        } else if(!currentStory || currentStory?._id !== id) {
            getStoryById(id);
        }

        if(currentStory?._id === id) {
            setStory(currentStory);
        }
        
        if(toasts){
            Array.from(toasts).forEach(ele => {
                toast(ele.message, {type: ele.type})
            });
        }
    } , [currentStory, id, toasts, clearToasts, getStoryById, stories, getStories]);

    

    const handleEdit = () => {
        setEdit(true);
        setTemp(story);
    }

    const handleCancel = () => {
        setEdit(false);
        setStory(temp);
    }

    const handleUpdate = () => {
        updateStory(story);
        setEdit(false);
        //setTemp(null)
    }

    const handleDelete = () => {
        deleteStory(story._id);
        navigate('/stories');
        
    }


    const displayDisabled = () => {
        return (
            <Stack spacing={2}>
                <Stack spacing={2} direction='row'>
                    <TextField label='Title' value={story?.content} disabled sx={{flexGrow: 1}}/>
                    <IconButton onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Stack>
                <TextField label='Content' value={story?.content} disabled multiline/>
            </Stack>
        )
    }
    
    return (
        <MainContainer>
            <Container maxWidth='md' sx={{mt: 3, mb: 5}}>
                <Paper >
                    {!edit 
                        ?   displayDisabled()
                        :   <Stack spacing={2}>
                                <TextField
                                    label='Title' name='title' value={story?.title} 
                                    onChange={(e) => setStory({...story, title: e.target.value})}
                                />
                                <TextField
                                    label='Content' name='content' value={story?.content} 
                                    onChange={(e) => setStory({...story, content: e.target.value})}
                                    multiline minRows={5} maxRows={20}
                                />

                                <Stack spacing={2} direction='row'>
                                    <Button variant='contained' onClick={handleUpdate}>Update</Button>
                                    <Button variant='outlined' sx={{color: 'primary.main'}} onClick={handleCancel}>Cancel</Button>
                                </Stack>
                            </Stack>
                    }
                </Paper>
            </Container>
        </MainContainer>
    )
}

