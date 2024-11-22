import React, { useState } from 'react';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { Home, User, Settings } from 'lucide-react';

// Import your components
import { GameSection } from './GameSection/GameSection';
import FrensSection from './FrensSection/FrensSection';
import TasksSection from './TasksSection';
import LearnSection from './LearnSection';

// Another example component


// Define your tabs with their respective icons, text, and components
const tabs = [
  { id: 'tab1', text: 'Home', Icon: Home, Component: GameSection },
  { id: 'tab2', text: 'Learn', Icon: User, Component: LearnSection },
  { id: 'tab3', text: 'Frens', Icon: Settings, Component: FrensSection},
  { id: 'tab4', text: 'Tasks', Icon: Settings, Component: TasksSection}];

export const MyTabbar = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  // Find the current component based on selected tab
  const CurrentComponent = tabs.find(tab => tab.id === currentTab).Component;

  return (

    <div>
      <Tabbar style={{ height: 100,       flexShrink: 0,   position: 'fixed',
      bottom: 0,
      width: '100%',
      backgroundColor: 'var(--tgui--secondary_bg_color)',
      zIndex: 1000 , padding:0}}>
          {tabs.map(({ id, text, Icon }) => (
            <Tabbar.Item 
            
              key={id} 
              text={text} 
              selected={id === currentTab} 
              onClick={() => setCurrentTab(id)}
            
            >
              <Icon />
            </Tabbar.Item>
          ))}
        </Tabbar>
      
      {/* Render the current component */}
      <CurrentComponent />
    </div>
  );
};

export default MyTabbar;