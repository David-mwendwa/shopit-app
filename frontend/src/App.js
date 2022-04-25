import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import './App.css';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' exact element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
