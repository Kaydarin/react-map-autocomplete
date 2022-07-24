import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {
    Divider,
    Container,
} from '@mui/material'
import MenuHeader from './components/menu-header';
import Home from './pages/home';
import { Wrapper } from "@googlemaps/react-wrapper";
import ViaInstance from './pages/via-instance';
import ViaRest from './pages/via-rest';

function App() {

    const render = (status) => {
        console.log('status: ', status)
    };

    return (
        <>
            <BrowserRouter>
                <MenuHeader />
                <Divider sx={{ marginY: '20px' }} />
                <Container maxWidth="xl">
                    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY} render={render} libraries={['places']}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/via-instance" element={<ViaInstance />} />
                            <Route path="/via-rest" element={<ViaRest />} />
                        </Routes>
                    </Wrapper>
                </Container>
            </BrowserRouter>
        </>
    );
}

export default App;
