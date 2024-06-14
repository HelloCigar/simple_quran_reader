import React, { useState, useEffect } from 'react';
import { Typography, Container, Divider, Grid } from '@mui/material';

import api from '../api';
import VerseText from './VerseText';

function Verses({surahId}){
    const [surahDetail, setSurahDetail] = useState(null);
    
    const getVerses = async () => {
        try {
            const response = await api.get(`/api/surahs/${surahId}/`,);
            setSurahDetail(response.data);
            console.log(response.data);
        } catch (error) {
        console.error('There was an error getting the verses: ', error);
        }
    }

    useEffect(() => {
        getVerses();
    }, [surahId])

    return(
        <Container>
            {surahDetail ? (
                <><Typography variant="h4" paragraph>
                    {surahDetail.name}
                </Typography>
                <Typography variant="h4" paragraph>
                    {surahDetail.transliteration}
                </Typography>
                <Typography variant="h4" paragraph>
                    {"("+ surahDetail.translation + ")"}
                </Typography>
                <Grid item xs={12} marginBottom={3}>
                    <Divider variant="fullWidth" />
                </Grid></>
            ) : (
                <p>Loading...</p>
            )}

            {surahDetail ? (
                surahDetail.verses.map((verse) => (
                <React.Fragment key={verse.id}>
                    <VerseText surahId={surahId} id={verse.verse_id} text={verse.text} translation={verse.translation}/>
                </React.Fragment>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    )
}


export default Verses;