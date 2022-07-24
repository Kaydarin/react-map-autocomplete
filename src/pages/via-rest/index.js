import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { map, debounce } from 'lodash';
import { autoComplete, setSelectedPlaceAndName, placeDetail } from '../../store/place';
import {
    Divider,
    Box,
    Typography,
    Autocomplete,
    TextField,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place';
import GMap from '../../components/g-map';

function App() {

    const dispatch = useDispatch();
    const dispatcher = useCallback(cb => dispatch(cb), [dispatch])

    const { mappedHits, selectedPlaceId, latitude, longitude, selectedHistory } = useSelector(state => {

        const hits = state.place.hits

        let mapped = [];

        if (hits.length > 0) {
            mapped = map(hits, (val, index) => {
                return {
                    label: val.description,
                    id: val.place_id
                }
            })
        }


        return {
            mappedHits: mapped,
            selectedPlaceId: state.place.selected.placeId,
            latitude: state.place.selected.latitude,
            longitude: state.place.selected.longitude,
            selectedHistory: state.place.selectedHistory,
        };
    });

    useEffect(() => {
        dispatcher(placeDetail())
    }, [selectedPlaceId, dispatcher]);


    const handleSelect = (val) => {
        dispatcher(setSelectedPlaceAndName({
            placeId: val.id,
            name: val.label
        }))
    }

    const handleInputChange = useCallback(
        debounce((text) => {
            dispatcher(autoComplete(text));
        }, 1000),
        []
    );

    return (
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
                <Autocomplete
                    disablePortal
                    options={mappedHits}
                    sx={{ width: '100%', marginY: '24px' }}
                    renderInput={(params) => <TextField {...params} label="Places" />}
                    onChange={(e, value) => handleSelect(value)}
                    onInputChange={(e) => handleInputChange(e.target.value)}
                />
                <GMap
                    latitude={latitude}
                    longitude={longitude}
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
                        selectedHistory && selectedHistory.map((val, index) => (
                            <div key={index}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PlaceIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={val.name} secondary={`Latitude: ${val.latitude} | Longitude: ${val.longitude}`} />
                                </ListItem>
                                {index + 1 === selectedHistory.length ? <></> : <Divider variant="inset" component="li" />}
                            </div>
                        ))
                    }
                </List>
            </Box>
        </Box>
    );
}

export default App;
