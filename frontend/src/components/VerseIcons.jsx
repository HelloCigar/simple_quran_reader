import React, { useState, useEffect } from "react";
import { IconButton, Grid, Box, Typography } from "@mui/material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import api from "../api";

function VerseIcons({ surahId, id }) {
    const [bookmarked, setBookmark] = useState(false);

    useEffect(() => {
        // Check if the verse is already bookmarked
        const checkBookmark = async () => {
            try {
                const response = await api.get(`/api/progress/get/`, {
                    params: {
                        surah_id: surahId,
                        verse_id: id,
                    },
                });

                if (response.status === 200 && response.data.bookmarked) {
                    setBookmark(true);
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkBookmark();
    }, [surahId, id]);

    
    const handleToggleBookmark = async () => {
        try {
            let response;
            if (bookmarked) {
                // Remove bookmark
                response = await api.delete("/api/progress/delete/", {
                    data: {
                        surah_id: surahId,
                        verse_id: id,
                    },
                });
                console.log(response.data);
                setBookmark(false);
            } else {
                // Add bookmark
                response = await api.post("/api/progress/", {
                    surah_id: surahId,
                    verse_id: id,
                });
                setBookmark(true);
                console.log(response.data);
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
                    <IconButton aria-label="toggle-bookmark" size="large" onClick={handleToggleBookmark}>
                        {bookmarked ? <BookmarkAddedIcon fontSize="inherit" color="primary"/> : <BookmarkAddIcon fontSize="inherit" color="primary"/>}
                    </IconButton>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default VerseIcons;
