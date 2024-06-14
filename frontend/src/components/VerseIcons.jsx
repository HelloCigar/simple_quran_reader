import React from "react";
import { IconButton, Grid, Box, Typography } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { grey } from "@mui/material/colors";

function VerseIcons({surahId, id}) {

    return (
        <Grid container>
            <Grid item xs={1}>
                <Grid container border={1} borderColor="grey.400" p={1} borderRadius={2} width={"50%"}>
                    <Grid item xs={4}>
                        <Typography align="center" color={grey[400]}>
                        {surahId}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align="center" color={grey[400]}>
                        :
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align="center" color={grey[400]}>
                        {id}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={11}>
                
            </Grid>
        </Grid>
    )
}

export default VerseIcons