import React, { useState, useEffect } from "react";
import { IconButton, Grid, Box, Typography, Tooltip, Chip } from "@mui/material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DoneAllIcon from '@mui/icons-material/DoneAll'; 
import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import api from "../api";
import FormDialog from "./VerseNote";

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

            if(option === "bookmarked"){
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
                if(option === "bookmarked"){
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
                if(option === "bookmarked"){
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
            <Grid item xs={2}>
                <Tooltip title="(Chapter) : (Verse)">
                    <Chip label={`Surah ${surahId} : Aya ${id}`} href={`/home#${id}`} color="secondary" clickable component='a' />
                </Tooltip>
            </Grid>
            <Grid item xs={8} md={8}></Grid>
            <Grid item xs={2}>
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Bookmark this verse">
                        <IconButton aria-label="toggle-bookmark" size="large" onClick={()=>handleToggle('bookmarked')}>
                            {bookmarked ? <BookmarkAddedIcon fontSize="inherit" color="primary"/> : <BookmarkAddIcon fontSize="inherit" disabled/>}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark as Completed">
                        <IconButton aria-label="toggle-bookmark" size="large" onClick={()=>handleToggle('completed')}>
                            {completed ? <DoneAllIcon fontSize="inherit" color="primary"/> : <DoneAllIcon disabled fontSize="inherit"/>}
                        </IconButton>
                    </Tooltip>
                        <FormDialog surah_id={surahId} verse_id={id}>
                        </FormDialog>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default VerseIcons;
