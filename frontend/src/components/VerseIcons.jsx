import React, { useState, useEffect } from "react";
import { IconButton, Grid, Box, Typography } from "@mui/material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DoneAllIcon from '@mui/icons-material/DoneAll'; 
import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import api from "../api";

function VerseIcons({ isCompleted , isBookmarked, surahId, id }) {
    const [bookmarked, setBookmark] = useState(false);
    const [completed, setCompleted] = useState(false);


    useEffect(() => {
        if (isBookmarked === true) {
            setBookmark(true)
        }
        if (isCompleted === true) {
            setCompleted(true)
        }
    }, [])
    
    const handleToggle = async (option) => {
        try {
            let response;
            let action;

            if(option === "bookmark"){
                action = bookmarked
            } else {
                action = completed
            }

            if (action) {
                response = await api.post(`/api/verse/${option}/remove/`, {
                    surah_id: surahId,
                    verse_id: id,
                    option: option,
                });
                if(option === "bookmark"){
                    setBookmark(false)
                } else {
                    setCompleted(false)
                }
            } else {
                // Add bookmark
                response = await api.post(`/api/verse/${option}/`, {
                    surah_id: surahId,
                    verse_id: id,
                    option: option,
                });
                if(option === "bookmark"){
                    setBookmark(true)
                } else {
                    setCompleted(true)
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={1}>
                <Box border={1} borderColor="grey.400" p={1} borderRadius={2}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography align="center" color={grey[500]}>
                                {surahId}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="center" color={grey[500]}>
                                :
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography align="center" color={grey[500]}>
                                {id}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={3}>
                <Stack direction="row" spacing={1}>
                    <IconButton aria-label="toggle-bookmark" size="large" onClick={()=>handleToggle('bookmark')}>
                        {bookmarked ? <BookmarkAddedIcon fontSize="inherit" color="primary"/> : <BookmarkAddIcon fontSize="inherit" disabled/>}
                    </IconButton>
                    <IconButton aria-label="toggle-bookmark" size="large" onClick={()=>handleToggle('completed')}>
                        {completed ? <DoneAllIcon fontSize="inherit" color="primary"/> : <DoneAllIcon disabled fontSize="inherit"/>}
                    </IconButton>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default VerseIcons;
