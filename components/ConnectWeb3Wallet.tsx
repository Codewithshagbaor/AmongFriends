import { ConnectKitButton } from "connectkit"
import Button from "./button"

import MyCustomAvatar from "./MyCustomAvatar";

const ConnectWalletButton = () => {
  
  return (
    <ConnectKitButton.Custom>
      
      {({ show, isConnected, truncatedAddress }) => (
        
        <Button
          onClick={show}
          variant="primary"
          className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 font-medium"
        >
          {isConnected ? truncatedAddress : "Connect Wallet"}
        </Button>
      )}
    </ConnectKitButton.Custom>
  )
}

export default ConnectWalletButton