import React from 'react';
import { Button, Result } from 'antd';

const NoAuthPage: React.FC = () => (
  <Result
    status="error"
    title="403"
    subTitle="十分抱歉, 你没有访问该页面的权限"
    extra={<Button type="primary">返回首页</Button>}
  />
);

export default NoAuthPage;