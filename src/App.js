import { useRef, useEffect, useState, useMemo } from 'react';
import './App.css';
import { Divider, Container, Box, TextField } from '@mui/material'
import { Wrapper } from "@googlemaps/react-wrapper";


function MyMapComponent(props) {
    const mapRef = useRef();
    const autoCompleteRef = useRef();

    const initPosition = useMemo(() => ({ lat: 3.1193573, lng: 101.6694215 }), []);

    const [position, setPosition] = useState(initPosition);

    useEffect(() => {
        new window.google.maps.Map(mapRef.current, {
            center: position,
            zoom: 15,
        });
    }, [position]);

    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
            center: initPosition,
            zoom: 15,
        });

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            const placeId = place.place_id;
            const name = place.name;

            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            setPosition({
                lat: lat,
                lng: lng
            });

            props.startedRef.current = true;

            props.setPlace({
                placeId,
                name
            })
        });

    }, [initPosition, props]);

    return (
        <>
            <TextField
                inputRef={autoCompleteRef}
                id="standard-basic"
                label="Standard"
                variant="standard"
            />
            <div ref={mapRef} id="map" style={{
                width: '100%',
                height: '100%'
            }} />
        </>
    )
}


function App() {

    const render = (status) => {
        console.log('status: ', status)
    };

    const startedRef = useRef(false);
    const [history, setHistory] = useState([]);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        startedRef.current = false
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
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginY: '30px'
                }}>
                    <Box>
                        Place AutoComplete
                    </Box>
                    <Box>
                        Hello John Doe!
                    </Box>
                </Box>
            </Container>
            <Divider sx={{ marginY: '20px' }} />
            <Container maxWidth="xl">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                    <Wrapper apiKey={""} render={render} libraries={['places']}>
                        <MyMapComponent
                            startedRef={startedRef}
                            setPlace={(val) => setPlace(val)}
                        />
                    </Wrapper>
                </Box>
            </Container>
        </>
    );
}

export default App;
