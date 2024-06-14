import React, { useState, useEffect } from 'react';
import { Box, List, ListItemButton, ListItemText, Grid, Typography  } from '@mui/material';
import api from '../api';


function SurahsList({ toggleDrawer, surahList, handleClick }) {

    return (
      <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >  
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={100}
        > 
            <Typography variant='h4'>
                Surahs
            </Typography>
        </Box>
        <List>
        {surahList.map((surah) => (
          <ListItemButton key={surah.id} onClick={handleClick(Number(surah.id))}>
            <Grid container spacing={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              >
              <Grid item xs={2}>
                <Typography variant='h6'>
                  {surah.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <ListItemText primary={surah.transliteration} secondary={surah.translation} />
              </Grid>
              <Grid item xs={3}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>
                      {surah.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body2'>
                      {surah.total_verses + " Verses"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemButton>
        ))}
      </List>
    </Box>
    )
}

export default SurahsList
