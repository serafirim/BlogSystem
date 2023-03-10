import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {truncateString} from '../middleware/utils'

import { useNavigate } from 'react-router-dom';



export default function StoryCard(props) {
    const navigate = useNavigate();
    return (
        <Card variant='shaded'>
            <CardContent>
                <Typography variant='h6'>
                    {truncateString(props.story.title, 40)}
                </Typography>


                <Typography color='text.secondary'>
                    {truncateString(props.story.content, 100)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" 
                    onClick={() => navigate(`/stories/${props.story._id}`)}
                >
                    Read More
                </Button>
            </CardActions>
        </Card>
    );
}
