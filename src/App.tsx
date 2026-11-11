import { Route, Routes, Navigate } from 'react-router-dom';
import VenueDetailPage from './pages/VenuePage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import FindBookingPage from './pages/FindBookingPage';

function App() {
  return (
    <div className='app'>
      <Header />
      <main className='app-main'>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/venue/:id'
            element={<VenueDetailPage />}
          />
          <Route
            path='/hitta-bokning'
            element={<FindBookingPage />}
          />
          <Route
            path='/404'
            element={<NotFoundPage />}
          />
          <Route
            path='*'
            element={
              <Navigate
                to='/404'
                replace
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
