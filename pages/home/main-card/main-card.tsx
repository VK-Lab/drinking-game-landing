import { MiddleTruncatedText } from "@/modules/components/middle-truncated-text";
import { useGetLinkedAccount } from "@/modules/hooks/useGetLinkedAccount";
import { useLinkAccount } from "@/modules/hooks/useLinkAccount";
import { Button, Card, Typography, notification } from "antd";
import { useAccount, useSignMessage } from "wagmi";
import { useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";

interface MainCardProps {
  userData: any;
  evmWallet?: string | null;
}

export const MainCard = ({ userData = {} }: MainCardProps) => {
  const { data, refetch } = useGetLinkedAccount(userData.sub);
  const { isConnecting, address, isConnected, chain } = useAccount();
  const {
    data: signMessageData,
    error,
    signMessageAsync,
    variables,
  } = useSignMessage();
  const { mutate: link } = useLinkAccount();
  const { connect } = useConnect();

  const onLink = async () => {
    const singedMessage = await signMessageAsync({
      message: `Linking ${userData.sub} with ${address}`,
    });

    if (singedMessage) {
      link(
        {
          userId: userData.sub,
          evmWallet: address!,
          signedMessage: singedMessage,
        },
        {
          onSuccess: () => refetch(),
          onError: (error) => {
            console.error("Error when sign message", error);
            notification.error({
              message: "Your wallet is already linked to another account!",
            });
          },
        }
      );
    }
  };
  const onPlay = () => {
    window.open("https://www.roblox.com/games/17086622220/Drinking-Simulator");
  };

  return (
    <Card className="w-3/4 opacity-90 ">
      <div className="flex gap-4">
        <Typography.Title level={3}>Account Info</Typography.Title>
        {data?.evmWallet && <Button onClick={onPlay}>Play Now !</Button>}
      </div>
      <div className="flex gap-4 items-center">
        <Typography.Text className="font-semibold !text-gray-500">
          Linked Wallet:
        </Typography.Text>
        {data?.evmWallet ? (
          <div className="flex items-center gap-2">
            <MiddleTruncatedText text={`${data?.evmWallet}`} />
          </div>
        ) : (
          <>
            {isConnected ? (
              <Button onClick={() => onLink()}>
                Link Wallet for {address}
              </Button>
            ) : (
              <Button
                onClick={() =>
                  connect({
                    connector: metaMask({
                      extensionOnly: true,
                    }),
                  })
                }
              >
                Connect Metamask
              </Button>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default MainCard;
