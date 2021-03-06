import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Button, Layout, PageHeader, Carousel, Row, Col } from 'antd';
import { Form, Input, Select, Modal } from 'antd';
import { WhatsAppOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import '../landingpage/landingpage.css'
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import image4 from './images/image4.jpg'

const { Header, Content, Footer } = Layout;

const LandingPage = () => {
  const contactus = {
    boxShadow: '10px 3px 32px -8px rgba(0,0,0,0.75)',
    borderRadius: 50,
    padding: '20px 0px',
  }
  return (
    <>
      <Layout>
        <Header className='layout-header'>
          <PageHeader
            extra={
              <>
                <Link to="/signup">
                  <Button type='primary'>Registrarse</Button>
                </Link>
                <Link to="/signin">
                  <Button type="primary">Iniciar Sesión</Button>
                </Link>

                {/*<Switch>*/}
                {/*  <Route path="/signup">*/}
                {/*    <Signup/>*/}
                {/*  </Route>*/}
                {/*  <Route path="/login">*/}
                {/*    <Login/>*/}
                {/*  </Route>*/}
                {/*</Switch>*/}
              </>
            }
          ></PageHeader>

        </Header>

        <Content className='section-carousel'>
          <Row>
            <Col xs={2} sm={4} md={6}></Col>
            <Col xs={20} sm={16} md={12}>
              <div className='quienes-somos'>
                <h3>¿Te dedicas al negocio de bienes raíces?</h3>
                <p >
                  Tenemos oportunidades para tí<br />
                </p>
              </div>
            </Col>
            <Col xs={2} sm={4} md={6}></Col>
          </Row>
          <Row className='carousel'>
            <Col xs={0} sm={2} md={4} lg={5}></Col>
            <Col xs={24} sm={20} md={16} lg={14} className='content-centered--md'>
              <Carousel autoplay effect='fade'>
                <img src={image1}></img>
                <img src={image2}></img>
                <img src={image3}></img>
                <img src={image4}></img>
              </Carousel>
            </Col>
            <Col xs={0} sm={2} md={4} lg={5}></Col>
          </Row>
        </Content>

        <Content  className='section-contact'>
          <Row >
            <Col span={6}></Col>
            <Col style={contactus} span={12} className='content-centered--md'>
              {/* <div className='layout-contact'> */}
              <h2 className='contact-us-title'>CONTACT US</h2>
              <section>
                <div className='form-wrapper'>
                  <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                  >
                    <Form.Item label="Name" required='true' className='info-item'>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Lats Name" required='true'>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Email" required='true'>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Country" required='true'>
                      <Select>
                        <Select.Option value="quito">Quito</Select.Option>
                        <Select.Option value="guayaquil">Guayaquil</Select.Option>
                        <Select.Option value="cuenca">Cuenca</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Message">
                      <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                      <Button className='send-quest'>Send</Button>
                    </Form.Item>
                  </Form>
                </div>
              </section>
              {/* </div> */}
            </Col>
            <Col span={6}></Col>
          </Row>
        </Content>
        
        <Footer className='icon-list'>
          <Row>
            <Col flex={2}></Col>
            <Col flex={4} style={{ textAlign: 'center' }}>
              <Button type='secondary'>Conocenos</Button>
            </Col>
            <Col flex={1}>
              <Row justify='space-around'>
                <FacebookOutlined style={{ fontSize: '32px' }} />
                <TwitterOutlined style={{ fontSize: '32px' }} />
                <WhatsAppOutlined style={{ fontSize: '32px' }} />
              </Row>
            </Col>
          </Row>
        </Footer>
      </Layout>

    </>
  );
}
export default LandingPage;