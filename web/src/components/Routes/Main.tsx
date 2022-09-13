import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../Pages/Landing/Landing';
import NotFound from '../Pages/NotFound/NotFound';
import Dashboard from '../Pages/Landing/Dashboard';

const Main = () => {
  return (
    <Routes>
      <Route element={<Landing />} path="/" />
      <Route element={<Dashboard />} path="/me" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};
export default Main;
