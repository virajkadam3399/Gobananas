import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography, CircularProgress, Box, Button, Dialog, DialogContent } from '@mui/material';

export default function GetData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(true);

    const { id } = useParams();

    // Fetch data
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const navigate = useNavigate()
    const handleDialogClose = () => {
        setDialogOpen(false);
        navigate('/')
    };

    //display a spinner
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    //display an error message
    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" color="error">Error: Unable to fetch data</Typography>
            </Container>
        );
    }

    //display the data in a dialog
    return (
        <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Card sx={{ boxShadow: 0, borderRadius: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            <strong>Title:</strong> <em>{data.title}</em>
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Body:</strong> <em>{data.body}</em>
                        </Typography>
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                                <Button variant='contained' color='primary' onClick={handleDialogClose}>
                                    Back to Home
                                </Button>
                            </Link>
                        </Box>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}