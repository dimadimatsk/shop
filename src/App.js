import Footer from './components/Footer';
import Header from './components/Header';
import Main from './pages/Main';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import { lazy, Suspense } from 'react';

const Cart = lazy(() => import('./pages/Cart'));
const FullItem = lazy(() => import('./pages/FullItem'));
const NotFoundBlock = lazy(() => import('./components/NotFoundBlock'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div className="load"></div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/item/:id"
            element={
              <Suspense fallback={<div className="load"></div>}>
                <FullItem />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div className="load"></div>}>
                <NotFoundBlock />
              </Suspense>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
