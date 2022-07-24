import { useSelector } from 'react-redux';
import {
    Container,
    Box,
} from '@mui/material'

function MenuHeader() {

    const { username } = useSelector(state => state.app);

    return (
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
                    Hello {username}!
                </Box>
            </Box>
        </Container>
    );
}

export default MenuHeader;
