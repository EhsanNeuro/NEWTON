import React, { useState } from 'react';
import {List, Cell, TabsList, Image, Button, Placeholder,Badge } from '@telegram-apps/telegram-ui';
import { MyInvite } from './MyInvite';
import frensImage from './Frens.png';

const FrensSection = () => {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <div style={{ margin: '0% 2% '}}>
      {/* Add margin directly to the TabsList */}
      <TabsList> 
        <TabsList.Item 
          selected={selectedTab === 'tab1'}
          onClick={() => setSelectedTab('tab1')}
        >
          My Invite Link
        </TabsList.Item>
        <TabsList.Item
          selected={selectedTab === 'tab2'}
          onClick={() => setSelectedTab('tab2')}
        >
          My Frens
        </TabsList.Item>
      </TabsList>

      <div 
        style={{
          height: 'calc(100vh - 50px)', 
          overflowY: 'auto', 
          overflowX: 'hidden', 
        }}
      >
        {selectedTab === 'tab1' && (
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
                action={            <MyInvite/>
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
        )}

        {selectedTab === 'tab2' && (
          <div style={{ padding: '0 20px' }}>
            <List 
        style={{
          background: 'var(--tgui--secondary_bg_color)',
          width: '100%',
        }}
      >
    {[...Array(3)].map((_, index) => (
            <Cell after={<Badge type="number">+1199</Badge>}
             key={index}>
              Friend Name {index}
            </Cell>
          ))}

      </List>
         
          </div>
        )}
      </div>
    </div>
  );
};

export default FrensSection;