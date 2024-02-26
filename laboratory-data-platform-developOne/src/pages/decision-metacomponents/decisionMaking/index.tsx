/* @jsxImportSource @emotion/react */
// import useCurrentPath from '@/hooks/useCurrentPath';
import { Fragment, type FC, type ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import Staff from './staff';
import Wealth from './wealth';
import Convey from './convey';
import Production from './production';
import Sale from './sale';

const DecisionMaking: FC = (): ReactElement => {
  // console.log(121212121);
  const location = useLocation();

  console.log(location);
  const str = location.pathname;
  const parts = str.split('/');
  // console.log(parts);
  const firstLevelPathKey = parts[3];
  // console.log(firstLevelPathKey);

  return (
    <Fragment>
      {firstLevelPathKey === 'staff' ? (
        <Staff />
      ) : firstLevelPathKey === 'wealth' ? (
        <Wealth />
      ) : firstLevelPathKey === 'convey' ? (
        <Convey />
      ) : firstLevelPathKey === 'production' ? (
        <Production />
      ) : firstLevelPathKey === 'sale' ? (
        <Sale />
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default DecisionMaking;
