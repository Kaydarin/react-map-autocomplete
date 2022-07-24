import { useRef, useEffect, useState } from 'react';
import {
    Divider,
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    TextField
} from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place';
import GMap from '../../components/g-map';

function ViaInstance() {

    const autoCompleteRef = useRef();
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
            const latitude = place.lat
            const longitude = place.lng

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
                    latitude,
                    longitude
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
                    <TextField
                        inputRef={autoCompleteRef}
                        label="Enter Keyword Here"
                        variant="standard"
                        sx={{
                            width: '100%',
                            marginBottom: '40px'
                        }}
                    />
                    <GMap
                        startedRef={startedRef}
                        autoCompleteRef={autoCompleteRef}
                        setPlace={(val) => setPlace(val)}
                    />
                </Box>
                <Box sx={{
                    width: '30%',
                }}>
                    <Typography variant="h5" gutterBottom>
                        History
                    </Typography>
                    <Divider />
                    <List sx={{ width: '100%' }}>
                        {
                            history && history.map((val, index) => (
                                <div key={index}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PlaceIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={val.name} secondary={`Latitude: ${val.latitude} | Longitude: ${val.longitude}`} />
                                    </ListItem>
                                    {index + 1 === history.length ? <></> : <Divider variant="inset" component="li" />}
                                </div>
                            ))
                        }
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default ViaInstance;