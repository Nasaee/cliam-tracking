import { HashLoader } from 'react-spinners';

type Props = {
  color?: string;
  size?: number;
};
const Loading = ({ color, size }: Props) => {
  return (
    <div className='grid place-items-center w-full h-full'>
      <HashLoader
        color={color ? `${color}` : '#36d7b7'}
        size={size ? size : 50}
      />
    </div>
  );
};
export default Loading;
