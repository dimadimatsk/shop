import Footer from './components/Footer';
import Header from './components/Header';
import Main from './pages/Main';
import Cart from './pages/Cart';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import FullItem from './pages/FullItem';
import NotFoundBlock from './components/NotFoundBlock';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/item/:id" element={<FullItem />} />
          <Route path="*" element={<NotFoundBlock />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
