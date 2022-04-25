import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import './App.css';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/search/:keyword' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} exact />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
