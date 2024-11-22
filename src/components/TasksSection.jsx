import React from 'react'
import {List, Cell, Section,Badge,Avatar} from '@telegram-apps/telegram-ui'

function TasksSection() {
  return (
    <List 
            style={{
              background: 'var(--tgui--secondary_bg_color)',
              width: '100%',
            }}
          >
            <Section
              header="Active Games"
              footer="The official Telegram app is available for Android, iPhone, iPad, Windows, macOS and Linux."
            >
              <Cell
                after={<Badge type="number">99</Badge>}
                before={<Avatar size={48} />}
                description="Description"
                subhead="Subhead"
                subtitle="Subtitle"
                titleBadge={<Badge type="dot" />}
              >
                Unique Peak
              </Cell>
              <Cell
                after={<Badge type="number">99</Badge>}
                before={<Avatar size={48} />}
                description="Description"
                subhead="Subhead"
                subtitle="Subtitle"
                titleBadge={<Badge type="dot" />}
              >
                Unique Peak
              </Cell>
            
            </Section>
          </List>  )
    };

export default TasksSection