import React from 'react';
import styled from 'styled-components';
import logo from '../images/samriddhi.png';

const Dashboard = () => {
  return (
    <>
        <DashboardContainer className="flex columns-2">
            <LeftSidebar className="w-full w-96 bg-purple">
                <Branding>
                    <img src={logo} />
                </Branding>
                <SideNavBar>
                    
                </SideNavBar>
                
            </LeftSidebar>
            <RightSidebar className="w-full w-max bg-orange">
            <h2> Right Sidebar</h2>
            </RightSidebar>
        </DashboardContainer>

    </>
  )
}

const DashboardContainer =  styled.div`
    height:100vh;


`
const LeftSidebar =  styled.div`
    overflow:scrollable;
`
const RightSidebar =  styled.div`

width:100%;
`
const Branding =  styled.div`
    background-color:#fff;
    margin:0;padding:0;

    img{

        color:#fff;
    }
    `


    const SideNavBar =  styled.div``
export default Dashboard
