import React from 'react';

//antd assets/components
import { Layout } from 'antd';

// components
import Navbar from '../components/Navbar';

const { Footer, Content } = Layout;

const AppLayout = ({ children, ...otherProps }) => (
  <Layout className="layout">
    <Navbar/>
    <Content>
      { React.cloneElement(children, otherProps) }
    </Content>
    <Footer style={{ textAlign: 'center' }}>Demo BlogQL @Mobylogix</Footer>
  </Layout>
);

export default AppLayout;
