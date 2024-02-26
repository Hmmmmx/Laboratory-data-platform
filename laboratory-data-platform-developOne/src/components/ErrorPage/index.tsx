import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Result, Typography } from 'antd';
import { useRouteError } from 'react-router-dom';

const { Paragraph, Text } = Typography;

const ErrorBoundary: React.FC = () => {
  const err = useRouteError() as any;
  return (
    <Card bordered={false}>
      <Result
        status="error"
        title="Page Error"
        subTitle="Please check and modify the following information."
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The Page has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> {err.message}
          </Paragraph>
        </div>
      </Result>
    </Card>
  );

}

export default ErrorBoundary;