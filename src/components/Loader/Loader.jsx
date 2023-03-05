import { Watch } from 'react-loader-spinner';
import { WrapperLoader } from './Loader.styles';

export const Loader = () => {
  return (
    <WrapperLoader>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#000080"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </WrapperLoader>
  );
};
