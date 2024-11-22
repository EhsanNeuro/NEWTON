import newtonwapple from './newtonwithapple.png'
import { useRef, useState } from 'react';
//import styles from './TooltipSection.module.css';

import { Banner, Button, Section, Tooltip } from '@telegram-apps/telegram-ui';
export default function HowToPlay() {

  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  return (
    <div 
    style={{
      display: "flex",
      alignItems: "center",
      backgroundColor: 'grey',
      height: "auto", 
      width: "auto", // Changed from 100vw
      gap: 10,
    }}
  >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          width: "90%",
        }}
      >
    
        <Button
          ref={ref}
          size="l"
          style={{width:'75%'}}
          onClick={() => setShown(!shown)}
        >
          {shown ? 'Okay!' : 'How to Play?'}
        </Button>
     
      {shown && (
        <Tooltip
          mode="dark"
          targetRef={ref}
        >
         1- Select a Game from below and join
<br/>
2- Read the NEWTON laws and submit your answer
<br/>
3- Come back later to check your rewards!
<br/>
4- Repeat!
        </Tooltip>
      )}


      </div>
      
      <img
        src={newtonwapple}
        style={{
          objectFit: "contain",
          width: '160px',
        }}
      />
    </div>
  )
}