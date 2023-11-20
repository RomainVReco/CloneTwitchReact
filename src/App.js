import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Live from './components/Live/Live'
import GameStreams from './components/GameStreams/GameStreams';

function App() {
  return (

    <Router>
      <div className="App">
        <Header />
        <Sidebar />

        <Routes>
          <Route path ="/" element={<Games/>}/>
          <Route path = "/top-streams" element={<TopStreams/>}/>
          <Route path ="/live/:slug" element={<Live/>}/>
          <Route path ="/game/:slug" element={<GameStreams/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
