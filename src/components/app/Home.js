import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import PropertyForm from '../properties/PropertyForm';

/*ENRUTAMIENTO*/
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


const { Header, Content, Footer } = Layout;

function Home({match}) {
    return (
        <Layout>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <Switch>
                        <Route path={`${match.path}/properties`} component={<PropertyForm mode="create" />} />
                        <Route path={`${match.path}/search`} component={<PropertyForm mode="create" />} />
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default Home;
