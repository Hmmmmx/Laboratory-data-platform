/* @jsxImportSource @emotion/react */
import { Empty } from 'antd';
import type { FC, ReactElement } from 'react';

const NoData: FC = (): ReactElement => (
    <Empty
        css={{
        position: 'relative',
        top: '30%',
        // left: '50%',
        }}
        description='暂无数据！'
    />
)

export default NoData;