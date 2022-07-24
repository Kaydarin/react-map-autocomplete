import { useRef, useEffect, useState } from 'react';
import './App.css';
import { Divider, Container, Box } from '@mui/material'
import { Wrapper } from "@googlemaps/react-wrapper";
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
                        <GMap
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
