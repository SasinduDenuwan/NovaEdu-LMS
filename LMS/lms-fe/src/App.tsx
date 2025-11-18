// App.tsx
import React, { useState, useEffect } from 'react';
import LoadingPage from './components/LoadingPage'; // Assuming the path is correct
// import MainLMSContent from './MainLMSContent'; // Example of your main content component

// The component is defined as a Functional Component (React.FC)
const App: React.FC = () => {
  // We explicitly type the state to be a boolean
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate an async operation (e.g., fetching user data, courses)
    const loadResources = async () => {
      // Pretend this is an API call that takes time
      await new Promise(resolve => setTimeout(resolve, 3000)); 
      
      // Once resources are loaded
      setIsLoading(false);
    };

    loadResources();
  }, []); // Empty dependency array means it runs once on mount

  if (isLoading) {
    return <LoadingPage />; // Show the loading page while true
  }

  return (
    <div className="app-content">
      {/* <MainLMSContent /> */}
      <h2 style={{ padding: '20px' }}>Your Main LMS Dashboard is Ready!</h2>
      <p>The content has finished loading.</p>
    </div>
  );
};

export default App;