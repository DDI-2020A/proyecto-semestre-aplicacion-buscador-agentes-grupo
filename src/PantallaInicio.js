import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Button, Layout, PageHeader, Carousel, Row, Col } from 'antd';
import { Form, Input, Select, Modal } from 'antd';
import { WhatsAppOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import image1 from '../public/image1.jpg'
import image2 from '../public/image2.jpg'
import image3 from '../public/image3.jpg'
import image4 from '../public/image4.jpg'
import './PantallaInicio.css'

const { Header, Content, Footer } = Layout;

const PantallaInicio = () => {
  const imagesPlace = [
    image1,
    image2,
    image3,
    image4
  ]

  const [ image, setImages ] = useState( imagesPlace.image1 )
  return (
    <>
      <Layout>
        <Header className='layout-header'>
          <Router>
            <PageHeader
              title='BuscAgente'
              extra={
                <>
                  <Link to="/signup">
                    <Button type='primary'>Registrarse</Button>
                  </Link>
                  <Link to="/login">
                    <Button type="primary">Iniciar Sesión</Button>
                  </Link>

                  <Switch>
                    <Route path="/signup">
                      <Signup/>
                    </Route>
                    <Route path="/login">
                      <Login/>
                    </Route>
                  </Switch>
                </>
              }
            ></PageHeader>
          </Router>
        </Header>

        <Content className='section-carousel'>
          <Row>
            <Col xs={ 2 } sm={ 4 } md={ 6 }></Col>
            <Col xs={ 20 } sm={ 16 } md={ 12 }>
              <p className='quienes-somos'>
                <h3>¿Quienes somos?<br/></h3>
                Somos una empresa dedicada a la busqueda de bienes raices, y tenemos los mejores agentes
                inmobiliarios, que te ahorraran largas y tendiosas horas en la busqueda de tu hogar ideal.<br/>
              </p>
            </Col>
            <Col xs={ 2 } sm={ 4 } md={ 6 }></Col>
          </Row>
          <Row className='carousel'>
            <Col xs={ 0 } sm={ 2 } md={ 4 } lg={ 5 }></Col>
            <Col xs={ 24 } sm={ 20 } md={ 16 } lg={ 14 } className='content-centered--md'>
              <Carousel autoplay effect='fade'>
                <div><img src={ image1 }></img></div>
                <div><img src={ image2 }></img></div>
                <div><img src={ image3 }></img></div>
                <div><img src={ image4 }></img></div>
              </Carousel>
            </Col>
            <Col xs={ 0 } sm={ 2 } md={ 4 } lg={ 5 }></Col>
          </Row>
        </Content>
        <Content className='section-contact'>
          <Row>
            <Col span={ 6 }></Col>
            <Col span={ 12 } className='content-centered--md'>
              {/* <div className='layout-contact'> */ }
              <h2 className='contact-us-title'>CONTACT US</h2>
              <section>
                <div className='form-wrapper'>
                  <Form
                    labelCol={ { span: 6 } }
                    wrapperCol={ { span: 14 } }
                    layout="horizontal"
                  >
                    <Form.Item label="Name" required='true' className='info-item'>
                      <Input/>
                    </Form.Item>
                    <Form.Item label="Lats Name" required='true'>
                      <Input/>
                    </Form.Item>
                    <Form.Item label="Email" required='true'>
                      <Input/>
                    </Form.Item>
                    <Form.Item label="Country" required='true'>
                      <Select>
                        <Select.Option value="quito">Quito</Select.Option>
                        <Select.Option value="guayaquil">Guayaquil</Select.Option>
                        <Select.Option value="cuenca">Cuenca</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Message">
                      <Input.TextArea/>
                    </Form.Item>
                    <Form.Item>
                      <Button className='send-quest'>Send</Button>
                    </Form.Item>
                  </Form>
                </div>
              </section>
              {/* </div> */ }
            </Col>
            <Col span={ 6 }></Col>
          </Row>
        </Content>
        <Footer className='icon-list'>
          <Row>
            <Col flex={ 2 }></Col>
            <Col flex={ 4 } style={ { textAlign: 'center' } }>
              <Button type='secondary'>Conocenos</Button>
            </Col>
            <Col flex={ 1 }>
              <Row justify='space-around'>
                <FacebookOutlined style={ { fontSize: '32px' } }/>
                <TwitterOutlined style={ { fontSize: '32px' } }/>
                <WhatsAppOutlined style={ { fontSize: '32px' } }/>
              </Row>
            </Col>
          </Row>
        </Footer>
      </Layout>

    </>
  );
}
export default PantallaInicio;