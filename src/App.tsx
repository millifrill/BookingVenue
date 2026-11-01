import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Route, Routes, Navigate } from 'react-router-dom';
import VenueDetailPage from './pages/VenuePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className='app'>
      <Header />
      <main className='app__main'>
        <Routes>
          <Route path='/venue' element={<div> TODO: Venuepage </div>} />
          <Route path='/venue/:id' element={<VenueDetailPage />} />
          <Route path='/404' element={<NotFoundPage />} />
          <Route path='*' element={<Navigate to='/404' replace /> } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
