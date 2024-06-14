import React from "react";
import { Typography, Divider } from "@mui/material";


function VerseText({ text, translation}) {

    return (
        <>
            <Typography paragraph>
                {text}
            </Typography>
            <Typography paragraph>
                {translation}
            </Typography>
            <Divider variant="fullWidth" />
        </>
    )
    
}

export default VerseText