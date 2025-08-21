
import Header from './components/Header';
import MediaCardList from './components/MediaCardList';
import { useState, useEffect } from 'react';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <Header onMediaAdded={triggerRefresh} />
      <div className="pt-56 bg-gray-100 min-h-screen">
        <main className="px-6 max-w-7xl mx-auto">
          <MediaCardList key={refreshTrigger} />
        </main>
      </div>
    </>
  );
}

export default App;
