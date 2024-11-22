import React from 'react';
import { Placeholder, Spinner } from '@telegram-apps/telegram-ui';
import Loadingpic from '../images/apple airdrop.png';
function LoadingPage() {
  return (
    <Placeholder
      action={<Spinner />}
      description="Sometimes an airdrop changes the world! 🍎"
      header="Loading..."
      className="w-full h-auto"
    >
      <img
        alt="Loading Graphic"
        src={Loadingpic} // Using the preloaded image passed as a prop
        style={{
          maxWidth: "100%",
          height: 200, // Ensure the height is correctly set as a number
          objectFit: "contain",
        }}
      />
    </Placeholder>
  );
}

export default LoadingPage;
