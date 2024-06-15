import React, { useState, useEffect, useCallback } from "react";
import { IconButton, Grid, Box, Typography, Stack, Tooltip } from "@mui/material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DoneAllIcon from '@mui/icons-material/DoneAll'; 
import { grey } from "@mui/material/colors";
import api from "../api";

function VerseIcons({ isCompleted, isBookmarked, surahId, id }) {
    const [status, setStatus] = useState({ bookmarked: false, completed: false });

    useEffect(() => {
        setStatus({
            bookmarked: isBookmarked,
            completed: isCompleted,
        });
    }, [isBookmarked, isCompleted]);

    const handleToggle = useCallback(async (option) => {
        try {
            const currentStatus = status[option];
            const endpoint = currentStatus 
                ? `/api/verse/${option}/remove/` 
                : `/api/verse/${option}/`;

            await api.post(endpoint, {
                surah_id: surahId,
                verse_id: id,
                option: option,
            });

            setStatus((prevStatus) => ({
                ...prevStatus,
                [option]: !currentStatus,
            }));
        } catch (error) {
            console.error(error);
        }
    }, [status, surahId, id]);

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
                    <Tooltip title="Bookmark this verse">
                        <IconButton
                            aria-label="toggle-bookmark"
                            size="large"
                            onClick={() => handleToggle('bookmarked')}
                        >
                            {status.bookmarked ? (
                                <BookmarkAddedIcon fontSize="inherit" color="primary" />
                            ) : (
                                <BookmarkAddIcon fontSize="inherit" />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark completed">
                        <IconButton
                            aria-label="toggle-completed"
                            size="large"
                            onClick={() => handleToggle('completed')}
                        >
                            {status.completed ? (
                                <DoneAllIcon fontSize="inherit" color="primary" />
                            ) : (
                                <DoneAllIcon fontSize="inherit" />
                            )}
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default VerseIcons;
