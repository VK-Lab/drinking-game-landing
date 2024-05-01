import { Button, Card, Typography, notification } from 'antd';
import { signMessage } from '@casperdash/usewallet-core';
import { useGetLinkedAccount } from '@/modules/hooks/useGetLinkedAccount';
import { MiddleTruncatedText } from '@/modules/components/middle-truncated-text';
import { UserAssets } from './user-assets';
import { useLinkAccount } from '@/modules/hooks/useLinkAccount';
import { useGetCDToken } from '@/modules/hooks/useGetAssets';
import {
  useAccount,
  useDisconnect,
  CasperDashConnector,
  useConnect,
} from '@casperdash/usewallet';

interface MainCardProps {
  userData: any;
  publicKey?: string | null;
}

export const MainCard = ({ userData = {} }: MainCardProps) => {
  const { data, refetch } = useGetLinkedAccount(userData.sub);
  const { data: CDToken } = useGetCDToken(userData.sub);
  const { publicKey } = useAccount();
  const { disconnect } = useDisconnect();

  const { connect: connectWithCasperDash } = useConnect({
    connector: new CasperDashConnector(),
  });

  const { mutate: link } = useLinkAccount();
  const onLink = async () => {
    const singedMessage = await signMessage({
      message: `Linking ${userData.sub} with ${publicKey}`,
      signingPublicKeyHex: publicKey!,
    });
    if (singedMessage) {
      link(
        {
          userId: userData.sub,
          publicKey: publicKey!,
          signedMessage: singedMessage,
        },
        {
          onSuccess: () => refetch(),
          onError: (error) => {
            notification.error({
              message: 'Your wallet is already linked to another account!',
            });
          },
        },
      );
    }
  };
  const onPlay = () => {
    window.open('https://www.roblox.com/games/15699428870/BETA');
  };

  return (
    <Card className="w-3/4 opacity-90 ">
      <div className="flex gap-4">
        <Typography.Title level={3}>Account Info</Typography.Title>
        {data?.publicKey && (
          <Button type="primary" onClick={onPlay}>
            Play Now !
          </Button>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <Typography.Text className="font-semibold !text-gray-500">
          Linked Wallet:
        </Typography.Text>
        {data?.publicKey ? (
          <div className="flex items-center gap-2">
            <MiddleTruncatedText text={data.publicKey} />
          </div>
        ) : (
          <>
            {!publicKey ? (
              <Button type="primary" onClick={() => connectWithCasperDash()}>
                Connect Wallet
              </Button>
            ) : (
              <Button type="primary" onClick={() => onLink()}>
                Link Wallet
              </Button>
            )}
          </>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <Typography.Text className="font-semibold">
          <span className="text-gray-500">CD Token:</span> {CDToken?.total}
        </Typography.Text>
      </div>
      <Typography.Title level={4} className="mt-4">
        Assets
      </Typography.Title>
      <UserAssets userId={userData.sub} />
    </Card>
  );
};

export default MainCard;
