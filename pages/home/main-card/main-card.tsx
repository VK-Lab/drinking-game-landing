import { useEffect, useRef } from "react";
import { MiddleTruncatedText } from "@/modules/components/middle-truncated-text";
import { useGetLinkedAccount } from "@/modules/hooks/useGetLinkedAccount";
import { Button, Card, Typography, notification } from "antd";
import { useAccount } from "wagmi";
import { WalletOptions } from "./wallet-options";

interface MainCardProps {
  userData: any;
  publicKey?: string | null;
}

export const MainCard = ({ userData = {} }: MainCardProps) => {
  const { data, refetch } = useGetLinkedAccount(userData.sub);
  const { isConnecting, address, isConnected, chain } = useAccount();
  const onPlay = () => {
    window.open("https://www.roblox.com/games/15699428870/BETA");
  };

  return (
    <Card className="w-3/4 opacity-90 ">
      <div className="flex gap-4">
        <Typography.Title level={3}>Account Info</Typography.Title>
        {data?.publicKey && <Button onClick={onPlay}>Play Now !</Button>}
      </div>
      <div className="flex gap-4 items-center">
        <Typography.Text className="font-semibold !text-gray-500">
          Linked Wallet:
        </Typography.Text>
        {data?.publicKey ? (
          <div className="flex items-center gap-2">
            <MiddleTruncatedText text={`${address}`} />
          </div>
        ) : (
          <>
            {address ? (
              <Button>Link Wallet for {address}</Button>
            ) : (
              <WalletOptions />
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default MainCard;
