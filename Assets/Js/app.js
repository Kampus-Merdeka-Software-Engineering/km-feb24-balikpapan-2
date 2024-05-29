import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const App = () => (
  <Layout>
    <Header style={headerStyle}>Header</Header>
    <Layout>
      <Sider width="25%" style={siderStyle}>
        Sider
      </Sider>
      <Content style={contentStyle}>
        <section id="dashboard-chart">
          <div className="dashboard-container">
            <div className="dashboard-column">
              <p>Chart 1 Title</p>
              <canvas id="lineChart"></canvas>
            </div>
            <div className="dashboard-column">
              <p>Chart 2 Title</p>
              <canvas id="chart2"></canvas>
            </div>
          </div>
          <div className="dashboard-container">
            <div className="dashboard-column">
              <p>Chart 3 Title</p>
              <canvas id="myChart" style={{ width: '40%' }}></canvas>
            </div>
          </div>
        </section>
      </Content>
    </Layout>
  </Layout>
);

export default App;
