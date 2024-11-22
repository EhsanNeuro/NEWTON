import styles from './FormSection.module.css';

import { Button, ColorInput, IconContainer, Input, Section, Slider, Image } from '@telegram-apps/telegram-ui';
import {Copy} from 'lucide-react'
export const MyInvite= () => (
  <Section header="Form section"
  footer="Share the link with your Frens!"
>
    <Input value="http://t.me/NEWTON_DeSci_Bot?start=ABC123"
         after={(<Button  before={<Copy/>} size="m" > Copy</Button>
         )}
        readOnly 
    header="Your invite link"  />
    <Input value="ABC123"
        readOnly 
    header="Your invite Code" 
    after={(<Button  before={<Copy />} size="m" > Copy</Button>
        
        )}

    
    
    />
  </Section>
);