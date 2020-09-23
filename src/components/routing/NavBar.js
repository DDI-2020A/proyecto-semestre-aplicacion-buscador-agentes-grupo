import React, { useEffect } from 'react'
import { Layout, Menu, PageHeader, Button } from 'antd';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom'


const { Header } = Layout;
const header = { position: 'fixed', zIndex: 1, width: '100%', padding: '0 0' }
const logo = { width: 50, maxHeigh: 50 };
const img = { width: '100%', heigh: '100%' };

export default function NavBar() {
    const location = useLocation();
    const isRoot = location.pathname == "/";
    const isHome  = location.pathname.includes("Home");
        
    useEffect(() => {
        console.log("path", location.pathname);
    }, []);

    return (
        <Header style={header}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

                <Menu.Item key="1">
                    <Link to="/">
                        <div style={logo}>
                            <img style={img} src="imagotipo-sin-lineas.png" />
                        </div>
                    </Link>
                </Menu.Item>

                <Menu.Item style={{ display: isRoot? '':'none' }} key="2">
                    <Link to="/signup">
                        Registrarse
                    </Link>
                </Menu.Item>

                <Menu.Item style={{ display: isRoot? '':'none' }} key="3">
                    <Link to="/signin">
                        Iniciar Sesión
                        </Link>
                </Menu.Item>

                <Menu.Item style={{ display: isHome? '':'none' }} key="4">
                    <Link to="Home/properties">
                        Propiedades
                    </Link>
                </Menu.Item>

                <Menu.Item style={{ display: isHome? '':'none' }} key="5">
                    <Link to="Home/search">
                        Buscar agentes
                    </Link>
                </Menu.Item>


            </Menu>
        </Header>
    )
}
