import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Actors, MovieInfo, Movies, NavBar, Profile } from '.';
import { DivRoot, DivToolbar, MainContent } from './styles';

const App = () => (
  <DivRoot>
    <CssBaseline />
    <NavBar />
    <MainContent>
      <DivToolbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieInfo />} />
        <Route path="/actors/:id" element={<Actors />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </MainContent>
  </DivRoot>
);

export default App;
