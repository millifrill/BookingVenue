import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import VenueDetailPage from './pages/VenueDetailPage';

function App() {
   return (
      <div className="app">
         <Header />
         <main className="app__main">
            <Routes>
               <Route path="/" element={<div>TODO: Startsidan</div>} />
               <Route path="/venue" element={<div>TODO: Lokaler</div>} />
               <Route path="/venue/:id" element={<VenueDetailPage />} />
            </Routes>
         </main>
         <Footer />
      </div>
   );
}

export default App;
