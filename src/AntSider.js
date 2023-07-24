import {
  UserOutlined,
  TeamOutlined,
  FundOutlined,
  UserSwitchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LineChartOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme,Divider } from 'antd';
import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import LiveTvIcon from '@mui/icons-material/LiveTv';



const { Header, Sider, Content } = Layout;

const SideBar = ({ pagedata }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  const timestamp = new Date();
  let diff ;
  const navigate = useNavigate()
  
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;

  const [ipAddress, setIpAddress] = useState('');
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // Check if the user's IP address matches the allowed address
    console.log(ipAddress);
    if (ipAddress === '50.47.215.77' || ipAddress === '76.144.211.140') {

      setShowButtons(true);
    }else{
      setShowButtons(false);
    }
  }, [ipAddress]);


  const navigateToHome =() => {
      navigate('/')
    }
  
  const navigateToOwners = () => {
      navigate('/owners')
  };

  const navigateToplayers = () => {
      navigate('/players')
    };

  const navigateTocharts = () => {
      navigate('/charts')
    };

  const navigateToLiveStats = () => {
      navigate('/livestats')
    };

    

  const navigateToAuction = () => {
  const stored = localStorage.getItem('timestamp');

  if (stored) {
      const storedTime = new Date(stored);
      if (isNaN(storedTime)) {
          navigate('/login',{state:{previousurl:'/auction'}})
          return;
      }
      diff = (timestamp.getTime() - storedTime.getTime()) / 3600000;
      if (diff >= 24) {
          navigate('/login',{state:{previousurl:'/auction'}})
          return;
      }
  } else {
      navigate('/login',{state:{previousurl:'/auction'}})
      return;
  }

  navigate('/auction')
  };


  const navigateToDailyScore = () => {
      //if(isMobile){
          navigate('/daily')
          //window.location.href = `${process.env.PUBLIC_URL}/#/daily`;
      //}
      //else{
      //    navigate('/dailydashboard')
          //window.location.href = `${process.env.PUBLIC_URL}/#/dailydashboard`;
      //}
      };
      /*
  const navigateToSetupTeams = () => {
      //window.location.href = `${process.env.PUBLIC_URL}/#/login`;
      navigate('/login',{state:{previousurl:'/SetupTeams'}})

      }*/

  const navigateSubstitutePlayer = () => {
      //window.location.href = `${process.env.PUBLIC_URL}/#/login`;
      navigate('/login',{state:{previousurl:'/SubstitutePlayers'}})

      }

  const navigateToManageTeams =() =>{
      navigate('/login',{state:{previousurl:'/ManageTeams'}})
      }


  return (
    <Layout>
        <Sider 
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
           
            items={[
              {
                key: '/',
                icon: <HomeOutlined />,
                label: 'Home',
                onClick: navigateToHome,
              },
              {
                key: '/players',
                icon: <UserOutlined />,
                label: 'Players',
                onClick: navigateToplayers,
              },
              {
                key: '/owners',
                icon: <TeamOutlined />,
                label: 'Owner Teams',
                onClick: navigateToOwners,
              },
              {
                key: '/daily',
                icon: <ScoreboardIcon />,
                label: 'Daily Score',
                onClick: navigateToDailyScore,
              },
              {
                key: '/charts',
                icon: <LineChartOutlined />,
                label: 'Standing Charts',
                onClick: navigateTocharts,
              },
              {
                key: '/livestats',
                icon: <LiveTvIcon />,
                label: 'Live Stats',
                onClick: navigateToLiveStats,
              },
              showButtons && {
                key: '/SubstitutePlayers',
                icon: <UserSwitchOutlined />,
                label: 'Substitute',
                onClick: navigateSubstitutePlayer,
              },
            ]}
          />
        </Sider>
        <Layout >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            backgroundColor:"#001529",
            textAlign:"center",
            color:"white",
          }}
        >
          {'EFL 2023'}
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflowX: 'auto',
          }}
        >
          {isPortrait ? (<div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              backgroundColor:"#001529",
              width: 'fit-content',
            }}>
            { pagedata }
          </div>):
          (<div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              backgroundColor:"#001529",
              width: '100%',
            }}
          >
          { pagedata }
          </div>)}
            </Content>
         
        </Layout>
      </Layout>
  );
};
export default SideBar;