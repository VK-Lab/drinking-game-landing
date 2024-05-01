import { Tooltip } from 'antd';

type Props = {
  text: string;
  startLength?: number;
  endLength?: number;
  className?: string;
  isShowTooltip?: boolean;
};

export const MiddleTruncatedText = ({
  text,
  startLength = 8,
  endLength = 4,
  className,
}: Props) => {
  const truncatedText =
    text.length > startLength + endLength
      ? `${text.slice(0, startLength)}...${text.slice(-endLength)}`
      : text;

  return (
    <Tooltip title={text} overlay={text} trigger="hover">
      <div className={className}>{truncatedText}</div>
    </Tooltip>
  );
};
