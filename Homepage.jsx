import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Carousel,
  CarouselControl,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles'; // Import makeStyles
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import logo from './logo.png'; // Replace with your logo path

const Homepage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
    fetchEvents();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/announcements');
      const data = await response.json();
      setAnnouncements(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setLoading(false); // Ensure loading is set to false even on error
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('/events');
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };


  const useStyles = makeStyles(() => ({
    root: {
      padding: '24px',
      minHeight: '100vh',
    },
    carousel: {
      margin: '0px auto',
    },
    carouselItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '50%',
    },
    carouselTitle: {
      fontSize: 18,
      marginBottom: 8,
    },
    carouselDate: {
      fontSize: 14,
      color: 'gray',
      marginBottom: 8,
    },
    carouselSummary: {
      fontSize: 16,
      marginBottom: 8,
    },
    carouselIcon: {
      fontSize: 32,
      marginBottom: 8,
    },
  }));

  const classes = useStyles;

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h3" component="h1" align="center" style={{marginBottom: 24}}>
        SNS College of Technology
      </Typography>

      <Carousel
        className={classes.carousel}
        indicatorCount={announcements.length}
        slideCount={announcements.length}
        component={CircularProgress}
        loading={loading}
        variableHeight={true}
      >
        {announcements.map((announcement) => (
          <Card key={announcement.id} className={classes.carouselItem}>
            <CardContent>
              <Typography variant="h6" className={classes.carouselTitle} >
                {announcement.title}
              </Typography>
              <Typography className={classes.carouselDate} >
                {announcement.date}
              </Typography>
              <Typography className={classes.carouselSummary} >
                {announcement.summary}
              </Typography>
              <img src={announcement.icon} alt={announcement.title} className={classes.carouselIcon} />
            </CardContent>
          </Card>
        ))}
      </Carousel>

      <Typography variant="h6" component="h2" style={{marginBottom: 24, textAlign: 'center'}} >
        Featured Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item key={event.id} xs={6} sm={4} md={3}>
            <Card className={classes.carouselItem}>
                <CardContent>
                    <Typography variant="h6" className={classes.carouselTitle}>{event.name}</Typography>
                    <Typography className={classes.carouselDate}>{event.date}</Typography>
                    <Typography className={classes.carouselSummary}>{event.description}</Typography>
                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Homepage;
