import React from 'react';
import { HomePage } from './pages/HomePage';
import Toast from './components/Toast';
import Loading from './components/Loading';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <>
      <Loading />
      <Toast />
      <HomePage />
    </>
  );
};

export default App;