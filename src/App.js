import React from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageLayout from './layout/PageLayout';
import MusicianHomePage from './pages/MusicianHomePage';
import MusicianMyEventsPage from './pages/MusicianMyEventsPage';
import MusicianProfilePage from './pages/MusicianProfilePage';

import PaginationButtons from './components/pagination/PaginationButtons';

function App() {
  return (
    
      <main className="h-screen">
        <PageLayout>
          {/* <LoginPage /> */}
          {/* <RegisterPage/> */}
          {/* <MusicianHomePage /> */}
          <PaginationButtons/>
          {/* <MusicianMyEventsPage /> */}
          {/* <MusicianProfilePage/> */}
        </PageLayout>
      </main>
    
  );
}

export default App;
