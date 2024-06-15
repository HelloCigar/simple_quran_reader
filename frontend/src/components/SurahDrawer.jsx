import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, List, ListItemButton, ListItemText, Grid, Typography, Drawer } from '@mui/material';
import SurahsList from './SurahsList';
import api from '../api';

function SurahDrawer({ drawerOpen, toggleDrawer, handleClick }) {
    const [surahList, setSurahList] = useState([]);
    const renderAfterCalled = useRef(false);

    const getSurahs = useCallback(async () => {
      try {
          const response = await api.get("/api/surahs/");
          setSurahList(response.data);
        } catch (error) {
          console.error('There was an error getting the surahs: ', error);
          setSurahList([]);
        }
    }, []);

    useEffect(() => {
      if (!renderAfterCalled.current) {
        getSurahs();
      }
      renderAfterCalled.current = true;
    }, [getSurahs]);

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            elevation={16}
        > 
            <SurahsList surahList={surahList} toggleDrawer={toggleDrawer} handleClick={handleClick}></SurahsList>
        </Drawer>
    )
}

export default SurahDrawer;