import { useGetAssets } from '@/modules/hooks/useGetAssets';
import { Card, Skeleton, Typography } from 'antd';

interface UserAssetsProps {
  userId: string;
}

export const UserAssets = ({ userId }: UserAssetsProps) => {
  const { data: assets, isLoading } = useGetAssets(userId);
  return (
    <Skeleton loading={isLoading} active>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {assets?.map((asset) => {
          return (
            <Card key={asset.tokenId} className="drop-shadow-lg">
              <Typography.Text className="font-semibold">
                {asset.unitMetadata.unitId} (#{asset.tokenId})
              </Typography.Text>
              <img src={asset.unitMetadata.image} />
              <div>
                <span className="font-semibold text-gray-500">Level: </span>
                <span>{asset.unitMetadata.level}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Xp: </span>
                <span>{asset.unitMetadata.xp}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-500">
                  Damage Boots:{' '}
                </span>
                <span>{asset.unitMetadata.damageBoots.toFixed(2)}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </Skeleton>
  );
};

export default UserAssets;
