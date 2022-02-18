import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

// src/components/Home.tsx
const Home = () => {
  return <p>Home</p>;
}
// src/components/Settings.tsx
const Settings = () => {
  return <p>Settings</p>;
}

// src/components/Topics.tsx
const Topics = () => {
  return <p>Topics</p>;
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Counter />
        <div>
          <Link to='/'>Welcome</Link> <Link to='/start'>Start Test</Link> <Link to='/results'>Results</Link>
        </div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/start' element={<Topics/>} />
          <Route path='/results' element={<Settings/>} />
        </Routes>


        <span>
          <span>Teamway test task. Tests are (c) https://www.psychologies.co.uk/</span>
        </span>
      </header>
    </div>
  );
}

export default App;
