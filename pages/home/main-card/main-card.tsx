import { Button, Card, Typography, notification } from "antd";
import { useAccount } from "wagmi";

interface MainCardProps {
  userData: any;
  publicKey?: string | null;
}

export const MainCard = ({ userData = {} }: MainCardProps) => {
  const { isConnected } = useAccount();
  const onPlay = () => {
    window.open("https://www.roblox.com/games/15699428870/BETA");
  };

  return (
    <Card className="w-3/4 opacity-90 ">
      <div className="flex gap-4">
        <Typography.Title level={3}>Account Info</Typography.Title>
        {isConnected && (
          <Button type="primary" onClick={onPlay}>
            Play Now !
          </Button>
        )}
      </div>
    </Card>
  );
};

export default MainCard;
