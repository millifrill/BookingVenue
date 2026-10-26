import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {
   return (
      <div className='app'>
         <Header />
         <main className='app__main'>
            <Routes>
               <Route path='/' element={<Home />} />
            </Routes>
         </main>
         <Footer />
      </div>
   );
}

export default App;
