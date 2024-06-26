import React, { useState } from "react";
import { Typography, Divider, Grid } from "@mui/material";
import VerseIcons from "./VerseIcons";


function VerseText({isBookmarked, isCompleted, surahId, id ,text, translation}) {

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h3" textAlign={"right"}>
                        {text}
                    </Typography>
                    </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {translation}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <VerseIcons isBookmarked={isBookmarked} isCompleted={isCompleted} surahId={surahId} id={id} />
                </Grid>
                <Grid item xs={12} marginBottom={3}>
                    <Divider variant="fullWidth" />
                </Grid>
            </Grid>
        </>
    )
    
}

export default VerseText