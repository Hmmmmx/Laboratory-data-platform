import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="error"
      title="404"
      subTitle="没找到你访问的页面, 你可以点击下方按钮回到首页"
      extra={<Button type="primary" onClick={()=>{navigate('/')}}>返回首页</Button>}
    />
  )
};

export default NotFound;