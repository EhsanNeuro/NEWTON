import React from 'react';
import { Button, Avatar, Badge, List, Cell, Section } from '@telegram-apps/telegram-ui';
import HowToPlay from './HowToPlay';
import Games from './Games';

export const GameSection = () => (
  <div style={{
    position: 'relative', // Ensure relative layout for proper stacking
    display: 'flex',
    flexDirection: 'column',
    
    height: 'calc(100vh)', // Subtract the tab bar height from the viewport height
    overflow: 'hidden', // Prevent content overflow

   }}>
    {/* Scrollable Area */}
    <div style={{
      paddingBottom: '165px' ,
      flex: 1, // Take up all available vertical space
      overflowY: 'auto', // Enable vertical scrolling
      overflowX: 'hidden', // Prevent horizontal scrolling 
      }}>

        <HowToPlay/>
      <Games/>
    
    </div>
  </div>
);

export default GameSection;
