import { useRef, useEffect, useState } from 'react';
import './App.css';
import {
    Divider,
    Container,
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place';
import { Wrapper } from "@googlemaps/react-wrapper";
import MenuHeader from './components/menu-header';
import GMap from './components/g-map';

function App() {

    const render = (status) => {
        console.log('status: ', status)
    };

    const startedRef = useRef(false);
    const [history, setHistory] = useState([]);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        startedRef.current = false
        console.log(history)
    }, [history])

    useEffect(() => {
        const handleHistory = (place) => {

            const name = place.name
            const placeId = place.placeId

            let historyArr = [...history];

            const found = historyArr.findIndex(val => {
                return val.placeId === placeId
            });


            if (found !== -1) {
                historyArr.push(historyArr.splice(found, 1)[0]);
            } else {
                historyArr.push({
                    placeId,
                    name,
                });
            }

            setHistory(historyArr);
        }

        if (startedRef.current) {
            handleHistory(place)
        }
    }, [place, history])

    return (
        <>
            <MenuHeader />
            <Divider sx={{ marginY: '20px' }} />
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginY: '30px',
                    gap: 2,
                }}
                >
                    <Box sx={{
                        width: '70%',
                        minHeight: 500
                    }}>
                        <Typography variant="h5" gutterBottom>
                            Search Place
                        </Typography>
                        <Divider />
                        <Wrapper apiKey={""} render={render} libraries={['places']}>
                            <GMap
                                startedRef={startedRef}
                                setPlace={(val) => setPlace(val)}
                            />
                        </Wrapper>
                    </Box>
                    <Box sx={{
                        width: '30%',
                    }}>
                        <Typography variant="h5" gutterBottom>
                            History
                        </Typography>
                        <Divider />
                        <List sx={{ width: '100%' }}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PlaceIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Kuala Lumpur" secondary="Latitude: 1.123442 | Longitude: 234.23232442" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PlaceIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Kuala Lumpur" secondary="Latitude: 1.123442 | Longitude: 234.23232442" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PlaceIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Kuala Lumpur" secondary="Latitude: 1.123442 | Longitude: 234.23232442" />
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default App;
