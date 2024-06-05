import { Container, Table, TableBody, TableRow, TableCell, TableHead, TextField, Box, Typography, Link as MuiLink, Paper, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TableData() {
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    // Fetch data 
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
                setLoading(false);
                setError(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);


    // Filter data based on search query
    useEffect(() => {
        const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(searchItem.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchItem, data]);

    const handleSearchChange = (e) => {
        setSearchItem(e.target.value);
    };

    return (
        <Container>
            {/* Search bar  */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 2 }}>
                <TextField
                    sx={{ width: "50%" }}
                    placeholder="Search"
                    size="small"
                    value={searchItem}
                    onChange={handleSearchChange}
                />
            </Box>
            {loading ? (
                // Display loading spinner while fetching data
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                 // Display error message if data fetch fails
                <Typography variant="h5" color="error" align="center">
                    Error: Unable to fetch data
                </Typography>
            ) : (
                 // Display data table if fetch is successful
                <Paper elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} align="left">Posts Not Found</TableCell>
                                </TableRow>
                            ) : (
                                // Map through filtered data and display each item in a table row
                                filteredData.map((item) => (
                                    <TableRow key={item.id} hover>
                                        <TableCell align="left">{item.id}</TableCell>
                                        <TableCell align="left">
                                            <MuiLink component={Link} to={`/posts/${item.id}`} underline="hover" color="inherit">
                                                {item.title}
                                            </MuiLink>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Container>
    );
}