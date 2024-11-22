import React, { useState, useEffect } from 'react';
// Import the necessary styles globally
import '@telegram-apps/telegram-ui/dist/styles.css';

// Import components from the library
import { AppRoot, Cell, Button, List, Section, Chip, Avatar, Image, CompactPagination, CompactPaginationItem } from '@telegram-apps/telegram-ui';
import { MyTabbar } from './components/MyTabbar';
import { useThemeParams } from "@telegram-apps/sdk-react";
import NewtonLogo from '../src/images/apologonobg.png'
import LoadingPage from './components/LoadingPage';

// Example data for rendering list cells
const firstName = 'Ehsan';
const numOfTokens = 5000;

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate loading
        await new Promise(resolve => setTimeout(resolve, 2200));
        setIsLoading(false);
      } catch (error) {
        console.error('Loading failed', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (isLoading) {
    return (
      <AppRoot>
        <LoadingPage />
      </AppRoot>
    );
  }

  return (
    <AppRoot>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Full viewport height
        overflow: 'hidden' // Prevent overall scrolling
      }}>
        {/* Fixed Header */}
        <List style={{
          background: 'var(--tgui--secondary_bg_color)',
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0 // Prevent shrinking
        }}>
          <div style={{
            display: 'flex',
            gap: 25,
            alignItems: 'center'
          }}>
            <Chip mode="elevated" before={<Avatar size={20} />}>
              {firstName}
            </Chip>
            <Image
              size={64}
              src={NewtonLogo}
              alt="User avatar"
            />
            <Chip mode="outline" before={<Avatar size={20} />}>
              {numOfTokens}
            </Chip>
          </div>
        </List>
        
        <MyTabbar/>
      </div>
    </AppRoot>
  );
};

export default App;