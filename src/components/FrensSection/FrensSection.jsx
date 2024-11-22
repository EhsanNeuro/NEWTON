import React, { useState } from 'react';
import {List, Cell, TabsList, Image, Button, Placeholder,Badge } from '@telegram-apps/telegram-ui';
import { MyInvite } from './MyInvite';
import frensImage from './Frens.png';
import Tabs from './Tabs';

const FrensSection = () => {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <div style={{ margin: '0% 2% '}}>
      <div 
        style={{
          height: 'calc(100vh - 50px)', 
          overflowY: 'auto', 
          overflowX: 'hidden', 
        }}
      >
        {selectedTab === 'tab1' && (  <></> )}
          <div 
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: '180px'
            }}
          >
            <div>
              <Placeholder
                action={                    <Tabs/>

                }
                description="Invite a fren and you both get a reward of 1000 Eureka!"
                header="You have 3 Frens"
                className="w-full h-auto"
              >
                <img
                  alt="Telegram sticker"
                  src={frensImage}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Placeholder>
            </div>
          </div>
     

      </div>
    </div>
  );
};

export default FrensSection;