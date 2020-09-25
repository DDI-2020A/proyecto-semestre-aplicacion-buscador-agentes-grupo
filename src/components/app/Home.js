import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import PropertyForm from '../properties/PropertyForm';
import Panel from '../panel/Panel';

/*ENRUTAMIENTO*/
import {
    withRouter,
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


const { Header, Content, Footer } = Layout;

const root = {
    minHeight:'100vh'
}
function Home({match}) {
    return (
        <Layout style={root}>
            <Content className="site-layout" style={{paddingTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    <Switch>
                        <Route path={`${match.path}/publish`} component={PropertyForm}  />
                        <Route path={`${match.path}/panel`} component={Panel} />
                        <Route path={`${match.path}/search`} component={UserSearch} />
                        <Route component={Panel} />

                        {/* <Route path={`${match.path}/comments`} component={UserSearch} /> */}
                        {/* <Route path={`${match.path}/properties`} component={UserSearch} /> */}
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default withRouter(Home);
