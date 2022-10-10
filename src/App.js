import Footer from './components/Footer';
import Header from './components/Header';
import Main from './pages/Main';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App;
