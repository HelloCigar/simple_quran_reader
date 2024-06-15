import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Container, Divider, Grid, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import api from '../api';
import VerseText from './VerseText';

const ITEMS_PER_LOAD = 10;

function Verses({ surahId }) {
  const [surahDetail, setSurahDetail] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [hasMoreTop, setHasMoreTop] = useState(false);
  const [hasMoreBottom, setHasMoreBottom] = useState(true);

  const { ref: topRef, inView: topInView } = useInView({
    threshold: 0,
  });

  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 0,
  });

  const getVerses = useCallback(async (isMounted) => {
    try {
      const response = await api.get(`/api/surahs/${surahId}/`);
      if (isMounted) {
        setSurahDetail(response.data);
        setLoading(false);
        setHasMoreTop(false);
        setHasMoreBottom(true);
        setStartIndex(0);
        setVerses(response.data.verses.slice(0, ITEMS_PER_LOAD));
      }
    } catch (error) {
      if (isMounted) {
        console.error('There was an error getting the verses: ', error);
        setLoading(false);
      }
    }
  }, [surahId]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getVerses(isMounted);
    return () => {
      isMounted = false;
    };
  }, [getVerses]);

  useEffect(() => {
    if (topInView && hasMoreTop) {
      loadMoreTop();
    }
  }, [topInView, hasMoreTop]);

  useEffect(() => {
    if (bottomInView && hasMoreBottom) {
      loadMoreBottom();
    }
  }, [bottomInView, hasMoreBottom]);

  const loadMoreTop = useCallback(() => {
    if (surahDetail && startIndex > 0) {
      const newStartIndex = Math.max(startIndex - ITEMS_PER_LOAD, 0);
      const newVerses = surahDetail.verses.slice(newStartIndex, startIndex);
      setVerses(prev => [...newVerses, ...prev]);
      setStartIndex(newStartIndex);
      setHasMoreTop(newStartIndex > 0);
    }
  }, [surahDetail, startIndex]);

  const loadMoreBottom = useCallback(() => {
    if (surahDetail) {
      const newStartIndex = startIndex + verses.length;
      const newVerses = surahDetail.verses.slice(newStartIndex, newStartIndex + ITEMS_PER_LOAD);
      setVerses(prev => [...prev, ...newVerses]);
      setHasMoreBottom(newStartIndex + ITEMS_PER_LOAD < surahDetail.verses.length);
    }
  }, [surahDetail, startIndex, verses.length]);

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {surahDetail && (
            <>
              <Typography variant="h4" paragraph>
                {surahDetail.name}
              </Typography>
              <Typography variant="h4" paragraph>
                {surahDetail.transliteration}
              </Typography>
              <Typography variant="h4" paragraph>
                {"(" + surahDetail.translation + ")"}
              </Typography>
              <Grid item xs={12} marginBottom={3}>
                <Divider variant="fullWidth" />
              </Grid>
            </>
          )}
          {hasMoreTop && (
            <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: 24 }} ref={topRef}>
              <CircularProgress />
            </Grid>
          )}
          {verses.map((verse) => (
            <React.Fragment key={verse.id}>
              <VerseText
                isCompleted={verse.completed}
                isBookmarked={verse.bookmarked}
                surahId={surahId}
                id={verse.verse_id}
                text={verse.text}
                translation={verse.translation}
                href={`#${verse.verse_id}`}
              />
            </React.Fragment>
          ))}
          {hasMoreBottom && (
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 24 }} ref={bottomRef}>
              <CircularProgress />
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}

export default Verses;
