/* @jsxImportSource @emotion/react */
// import useCurrentPath from '@/hooks/useCurrentPath';
import { Fragment, type FC, type ReactElement } from 'react';
import Staff from './staff';
import Wealth from './wealth';
import Convey from './convey';
import Production from './production';
import Sale from './sale';
import { useLocation } from 'react-router-dom';

const Prediction: FC = (): ReactElement => {

  const location = useLocation();
  
  console.log(location);
  const str = location.pathname;
  const parts = str.split("/");
  // console.log(parts);
  const firstLevelPathKey = parts[3];
  // console.log(firstLevelPathKey);

  return (


    <Fragment>
      {
        firstLevelPathKey === "staff" ?
          <Staff /> : firstLevelPathKey === "wealth" ?
            <Wealth /> : firstLevelPathKey === "convey" ?
              <Convey /> : firstLevelPathKey === "production" ?
                <Production /> : firstLevelPathKey === "sale" ?
                  <Sale /> : <></>
      }
    </Fragment>
  )
}

export default Prediction;