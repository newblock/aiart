import React from 'react';
import {
    Router, withRouter,Redirect
} from 'react-router'
import {
    Row,
    Col,
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal,
    Alert
} from 'antd'
import imgLogo from './news_icon.png'
import '../com.css';

import DEBUG_ from '../debugcof';


const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const Link = Router.Link;

const testUser = {
    name: 'a',
    pass: '1'
}


class PCHeader_n extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuKeys: {
                empty: '-1',
                mainPage: '0',
                goodArt: '1',
                creators: '2', //创作者浏览
                about: '3',
                releaseArt: '4',
                register: '5',
                userinfo: '6'
            },
            userBtnText: '登录',
            userBtnType: 'default',
            current: '0',
            modalLoginVisible: false,
            modalRegisterVisible: false,
            action: 'login',
            userNickname: '555',
            userid: 0,
            showErrUserExist: false,
            showOkRegister: false,
            showInfoRegister: false,
            showInfoLogin: false,
            showErrLogin: false,
            showInfoRegisterPass: false,
            loginOKType:false
        }
    }


    componentDidMount(){
        console.log('bindChild')
        this.props.bindChild(this);
    }


    testBtn = e => {
        this.setState({
            modalLoginVisible: true
        })
    }

    handleSubmitLogin = e => {

        e.preventDefault();
        // var formData = this.props.form.getFieldValue();
        // console.log(formData);

        this.props.form.validateFields((err, values) => {

             if (!err) {
                console.log('Received Login of form: ', values);

                const uname = values.l_username;
                const upass = values.l_password;

                if (!uname || !upass) {
                    this.setState({
                        showInfoLogin: true
                    });
                    setTimeout(() => {
                        this.setState({
                        showInfoLogin: false
                        })
                    }, 2500)
                    return;
                    }
                
                const info = {
                    uname:  uname,
                    upass:  upass,
                    ptLast: this
                }

                this.setState({
                    loginOKType: true
                })

                this.props.appLogin(info)

            }
        });
    }

    handleSubmitRegister = e => {

        e.preventDefault();
        // var formData = this.props.form.getFieldValue();
        // console.log(formData);

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received Register of form: ', values);
            }

            const uname = values.r_username;
            const upass = values.r_password;
            const upasscheck = values.r_cpassword;

            if (!uname || !upass || !upasscheck) {

                this.setState({
                    showInfoRegister: true
                });
                setTimeout(() => {
                    this.setState({
                        showInfoRegister: false
                    })
                }, 2500)
                return;
            }

            if (upass != upasscheck) {

                this.setState({
                    showInfoRegisterPass: true
                });
                setTimeout(() => {
                    this.setState({
                        showInfoRegisterPass: false
                    })
                }, 2500)

                return;
            }

            //http://hd215.api.yesapi.cn/?s=App.Table.Create&model_name=userlist&data={'username':'michael','upass':'123'}

            const info = {
                uname:  uname,
                upass:  upass,
                ptLast: this
            }

            this.setState({
                loginOKType: true
            })
            this.props.appRegister(info);
        });
    }

    handleClickMenu = e => {

        this.setState({
            userBtnType: 'default'
        })

        if (e.key == this.state.menuKeys.register) {
            this.setState({
                modalLoginVisible: true
            });
        }
        else if (e.key == this.state.menuKeys.releaseArt) {
            console.log("menu clicked:" + e.key)

            const hasLogined = this.props.appState.gUserLogin;
            if (hasLogined == true) {
                this.props.history.push('/upload');
            } else {
                this.setState({
                    modalLoginVisible: true
                })
            }

        } else if (e.key == this.state.menuKeys.mainPage) {
            console.log("menu clicked:" + e.key)
            this.props.history.push('/home');
        } else if (e.key == this.state.menuKeys.about) {
            console.log("menu clicked:" + e.key)
            this.props.history.push('/about');
        }

        this.setState({
            current: e.key
        })
    }

    handleToRegister = e => {
        this.setState({
            modalLoginVisible: false,
            modalRegisterVisible: true
        });
    }

    handleToLogin = e => {
        this.setState({
            modalLoginVisible: true,
            modalRegisterVisible: false
        });
    }

    handleUserinfo = e => {

        const hasLogined = this.props.appState.gUserLogin;
        //当前已经登录，进入个人页面
        if (hasLogined == true) {
            this.setState({
                current: this.state.menuKeys.empty,
                userBtnType: 'primary'
            })
            this.props.history.push('/userinfo')
        } else {
            //否则，弹出登录对话框
            this.setState({
                modalLoginVisible: true
            })
        }

        // this.setState({
        //     hasLogined: false
        // })
    }

    handleCancel = e => {
        this.setState({
            modalLoginVisible: false,
            modalRegisterVisible: false,
            current: this.state.menuKeys.mainPage
        })
        this.props.history.push('/home')
    }

    testHandle = e =>{
        console.log(this.state)
    }

    render() {
        const {
            getFieldProps
        } = this.props.form;

        const maskStyle = {
            'animation': 'none',
            'background': '#000',
            'opacity': '0.5'
        }

        const errorAlertUserExist = (this.state.showErrUserExist ?
            <Alert
                message = "Error"
                description="用户名重复，请选择新的用户名进行注册."
                type="error"
                showIcon
                 /> : <div></div>)

        const okAlertRegisterUser = (this.state.showOkRegister ?
            <Alert
                message = "注册成功!"
                description="恭喜! 请开启您的AI创作之旅吧~~"
                type="success"
                showIcon
                 /> : <div></div>)

        const okShowWelcomeBack = (this.state.showWelcomeBack ?
            <Alert
                message = "欢迎回到AI艺术俱乐部!"
                description="请继续您的AI之旅吧~~"
                type="success"
                showIcon
                /> : <div></div>)


        const infoShowInfoRegister = (this.state.showInfoRegister ?
            <Alert
                message = "输入有误"
                description="请确认账号密码输入正确！"
                type="info"
                showIcon
                 /> : <div></div>)

        const infoShowInfoLogin = (this.state.showInfoLogin ?
            <Alert
                message = "输入有误"
                description="请确认账号密码输入正确！"
                type="info"
                showIcon
                 /> : <div></div>)

        const showErrLogin = (this.state.showErrLogin ?
            <Alert
                message = "登录失败"
                description="用户名密码不正确，请重新登录！"
                type="info"
                showIcon
                 /> : <div></div>)

        const showInfoRegisterPass = (this.state.showInfoRegisterPass ?
            <Alert
                message = "两次密码输入不一致"
                description="密码输入有误，请重新输入一致密码！"
                type="info"
                showIcon
                 /> : <div></div>)

        const hasLogined = this.props.appState.gUserLogin;


        const showTestBtn = (DEBUG_ ?
              <Button type="danger" onClick={this.testHandle}>测试:{hasLogined?1:0}</Button> : <div></div>)

        return (
            <header className='header'>
                {showTestBtn}
                <Row>
                    <Col span={4}></Col>
                    <Col span={2}>
                         <a href='/home' className='logo'>
                            <img src={imgLogo} alt='logo' />
                        </a>
                    </Col>
                    <Col span={12}>

                        <Menu mode='horizontal' onClick = {this.handleClickMenu} selectedKeys={[this.state.current]}>
                            <Menu.Item key={this.state.menuKeys.mainPage}>
                            <Icon type='appstore'></Icon>
                                首页
                            </Menu.Item>
                            {/* <Menu.Item key={this.state.menuKeys.goodArt}>
                                <Icon type='appstore'></Icon>
                                精选作品
                            </Menu.Item> */}
                            <Menu.Item key={this.state.menuKeys.releaseArt}>
                                <Icon type='appstore'></Icon>
                                发布作品
                            </Menu.Item>
                            <Menu.Item key={this.state.menuKeys.about}>
                                <Icon type='appstore'></Icon>
                                关于我们
                            </Menu.Item>
                            {/* {userShow} */}
                            <Modal maskStyle={maskStyle} title='欢迎登录'  
                            transitionName="" 
                            wrapClassname='vertical-center-modal' 
                            visible = {
                                this.state.modalLoginVisible
                            }
                            onCancel = {this.handleCancel}
                            onOk =     {this.handleSubmitLogin}

                            confirmLoading = {this.state.loginOKType? true: false}
                            okText='确认登录'
                            cancelText='取消'>
                            <Tabs type='card'>
                            <TabPane tab='登录' key='1'>
                                <Form onSubmit={this.handleSubmitLogin} >
                                    <FormItem label='账户'>
                                        <Input placeholder='请输入账号' {...getFieldProps('l_username')}/>
                                    </FormItem>
                                    <FormItem label='密码'>
                                        <Input placeholder='请输入密码' {...getFieldProps('l_password')}/>
                                    </FormItem>
                                    <FormItem>
                                        <Button type='primary' htmlType='submit'  disabled = {this.state.loginOKType ? true: false}>登录</Button>
                                    </FormItem>
                                    <FormItem>
                                        <Button type='default' onClick={this.handleToRegister}>注册</Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            </Tabs>
                            {infoShowInfoLogin}
                            {showErrLogin}
                            </Modal>
                            <Modal maskStyle={maskStyle} title='注册信息'  
                            transitionName=""
                            wrapClassname='vertical-center-modal'
                            visible  = {this.state.modalRegisterVisible}
                            onCancel = {this.handleCancel}
                            onOk     = {this.handleSubmitRegister}
                            cancelText = '取消'
                            okText     = '确认注册'>
                                
                                <Tabs type='card'>
                                <TabPane tab='注册' key='2'>
                                    <Form onSubmit={this.handleSubmitRegister} >
                                        <FormItem label='账户'>
                                            <Input placeholder='请输入账号' {...getFieldProps('r_username')}/>
                                        </FormItem>
                                        <FormItem label='密码'>
                                            <Input placeholder='请输入密码' {...getFieldProps('r_password')}/>
                                        </FormItem>
                                        <FormItem label='确认密码'>
                                            <Input placeholder='请再次确认密码' {...getFieldProps('r_cpassword')}/>
                                        </FormItem>
                                        <FormItem>
                                            <Button type='primary' htmlType='submit'>注册</Button>
                                        </FormItem>
                                        <FormItem>
                                            <Button type='default' onClick={this.handleToLogin}>登录</Button>
                                        </FormItem>
                                    </Form>                                   
                                </TabPane>
                                </Tabs>
                                {errorAlertUserExist}
                                {infoShowInfoRegister}
                                {showInfoRegisterPass}
                            </Modal>

                            {/* <Tabs type='card'>
                                <TabPane tab='注册' key="2"></TabPane>
                                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label='账户'>
                                            <Input placeholder='请输入账号' {...getFieldProps('r_userName')}></Input>
                                        </FormItem> 
                                    </Form>
                            </Tabs> */}
                        </Menu>
                    </Col>
                    <Col span={6}>
                        {<Button type={this.state.userBtnType} style={{marginTop:'10px'}} onClick={this.handleUserinfo}>
                                {this.state.userBtnText}
                        </Button>}
                    </Col>
                </Row>
                <Row>
                    <Col span={6}></Col>
                    <Col span={16}>
                    {okAlertRegisterUser}
                    {okShowWelcomeBack}
                    </Col>
                </Row>
            </header>
        )
    }
}


//export default PCHeader;
// const PCHeader_n_v = Form.create({
//     name: 'normal_login_pcHeader'
// })(PCHeader_n);

// 使用高阶组件包裹当前类组件
//const PCHeader = WidthUseNavigate(PCHeader_n_v);
// 导出包裹后的类组件

const PCHeader = Form.create({
    name: 'normal_login_pcHeader'
})(PCHeader_n);

export default withRouter(PCHeader);;