import {
    Container,
    Box,
} from '@mui/material'

function MenuHeader() {

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
                    Hello John Doe!
                </Box>
            </Box>
        </Container>
    );
}

export default MenuHeader;
