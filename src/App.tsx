import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; 
import RoutesHelper from './routes/routesHelper';

function App() {
  return (
    <div className="App">
      <Router> 
        <RoutesHelper />
      </Router>
    </div>
  );
}

export default App;
