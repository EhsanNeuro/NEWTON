import React, { useState } from 'react';

import { TabsList , List, Cell, Badge} from '@telegram-apps/telegram-ui'
import { MyInvite } from './MyInvite';
function Tabs() {
    const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <div>
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


      {selectedTab === 'tab2' && (
          <div style={{ padding: '0 20px' }}>
            <List 
        style={{
          background: 'var(--tgui--secondary_bg_color)',
          width: '100%',
        }}>
            {[...Array(3)].map((_, index) => (
                    <Cell after={<Badge type="number">+1199</Badge>}
                    key={index}>
                    Friend Name {index}
                    </Cell>
                ))}

            </List>
                
          </div>
        )};
                {selectedTab === 'tab1' && (  <MyInvite/> )};


    </div>
  )
}

export default Tabs