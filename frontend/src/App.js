import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/chat" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
