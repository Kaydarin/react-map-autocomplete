import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Tooltip
} from '@mui/material'

function App() {

    const navigate = useNavigate();

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'column',
            marginY: '30px',
            gap: 2,
        }}
        >
            <Typography variant="h5" gutterBottom>
                Select Methods
            </Typography>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginY: '30px',
                gap: 2,
            }}
            >

                <Button variant="outlined" onClick={() => navigate("/via-instance")}>Via Google Map AutoComplete Instance</Button>
                <Tooltip title="Calling autocomplete REST API was meant for server-side. Client side will surely wont work for local environment due to CORS issue. But codebase will work if deployed with proper DNS. I hope you understand the constrain.">
                    <Button variant="outlined" onClick={() => navigate("/via-rest")}>Via Google Map REST API</Button>
                </Tooltip>

            </Box>
        </Box>
    );
}

export default App;
