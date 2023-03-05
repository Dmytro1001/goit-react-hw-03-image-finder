import { ThreeDots } from 'react-loader-spinner';
import { WrapperLoader } from './Loader.styles';

export const Loader = () => {
  return (
    <WrapperLoader>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#000080"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </WrapperLoader>
  );
};
