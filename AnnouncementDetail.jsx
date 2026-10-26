import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    IconButton,
    Button,
    Box,
    CircularProgress,
} from '@mui/material';
import { MarkReadAll } from '@mui/icons-material';
import { Share } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link for routing
import logo from './logo.png'; // Replace with your logo path

const AnnouncementDetail = (props) => {
    const { id } = props;
    const [announcement, setAnnouncement] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncement(id);
    }, [id]);

    const fetchAnnouncement = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`/announcements/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setAnnouncement(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching announcement:', error);
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" >
            {loading ? (
                <CircularProgress />
            ) : (
                <Card sx={{ height: '100%', marginTop: '24px' }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" align="center">
                            {announcement.title}
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            Date: {announcement.date}
                        </Typography>
                        <Typography variant="body1" align="left">
                            {announcement.content}
                        </Typography>
                        {announcement.icon && (
                            <img
                                src={announcement.icon}
                                alt={announcement.title}
                                style={{ marginBottom: '16px' }}
                            />
                        )}
                        <Box sx={{ marginTop: '16px' }}>
                            <Button variant="outlined" startIcon={<MarkReadAll />} onClick={() => console.log('Mark as Read')}>
                                Mark as Read
                            </Button>
                            <Button variant="outlined" startIcon={<Share />} >
                                Share
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default AnnouncementDetail;
