import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { Actors, MovieInfo, Movies, NavBar, Profile } from '.';
import { DivRoot, DivToolbar, MainContent } from './styles';

const App = () => (
  <DivRoot>
    <CssBaseline />
    <NavBar />
    <MainContent>
      <DivToolbar />
      <Routes>
        <Route exact path="/" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
        <Route path="/actors/:id" element={<Actors />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </MainContent>
  </DivRoot>
);

export default App;
