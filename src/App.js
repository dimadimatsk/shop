import Footer from './components/Footer';
import Header from './components/Header';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content"></div>
      <Footer />
    </div>
  );
}

export default App;
