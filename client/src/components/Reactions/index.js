import React from 'react';
import { Space } from 'antd';

const Reactions = ({ icon, text }) => (
  <Space>
    { React.cloneElement(icon) }
    { text }
  </Space>
);

export default Reactions;
