import React, { createContext } from "react";

import {
    Empty,
    Button,
    Form,
    Input,
    Icon
} from 'antd'
//import WidthUseNavigate from '../com/withusenavigate'

 const ComContext = createContext("color"); // 创建 Context 引用 Provider 和 Consumer

 const { Provider, Consumer } = ComContext
 class DeliverComponent extends React.Component {

  constructor(props){
    super(props)
      // 维护一个 state
    this.state = {
      color: 'orange',
      name:'aaa',
      handleClick: this.handleAct,
      handleClick2:this.handleAct2
    }
  }

  handleAct2 = e =>{
    console.log('aa222:')
    console.log({e})
    // e.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //     this.setState({
    //       name:values
    //     })
    //   }
    // });

  }

  handleAct = form =>{

    console.log(form)
    this.setState({
       color: 'red' ,
       name : 'test'});
  
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    return (
      <Provider value={this.state} >
      <MidComWF appAct={this.state.handleClick}/>
      </Provider>
    )
  }
}

class MidComponent extends React.Component{

  handleSubmit = e => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  };

  constructor(props){
    super(props)
  }

  pressBtn = e =>{
    this.props.appAct('abc')
  }

  render(){

    const { getFieldDecorator} = this.props.form;
    const formInfo = this.props.form;

  const name = '456';
    return(
      <Consumer>{
        (cstate)=>(

          <React.Fragment>
          <Button type='primary' onClick={(e)=>cstate.handleClick2(name)}>Testing:{cstate.name}</Button>
          <Button type='primary' onClick={(e)=>cstate.handleClick('666')}>Testing:{cstate.name}</Button>
          <Button type='primary' onClick={this.pressBtn}>Testing:{cstate.color}</Button>

          <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
            
          </React.Fragment>
        )
      }
      </Consumer>
    )
  }
}

class TestCom extends React.Component {

    render() {
        return (
          <React.Fragment>
            <DeliverComponent />
          </React.Fragment>
              )
    }
}

const MidComWF = Form.create({
  name: 'test_form'
})(MidComponent);

// 使用高阶组件包裹当前类组件
//const UserInfo = WidthUseNavigate(UserInfo_n);
// 导出包裹后的类组件
export default TestCom;


