import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Importe BrowserRouter
import RoutesHelper from './routes/routesHelper';

function App() {
  return (
    <div className="App">
      <Router> {/* Use BrowserRouter em vez de Router */}
        <RoutesHelper />
      </Router>
    </div>
  );
}

export default App;
