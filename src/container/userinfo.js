import React from "react";
import {
    Empty,
    Button
} from 'antd'
//import WidthUseNavigate from '../com/withusenavigate'

class UserInfo extends React.Component {

    constructor(props){
        super(props)
    }

    handleLagout = e => {
        // if (!window.localStorage) {
        //     alert("浏览器不支持localstorage");
        //     return false;
        // } else {
        //     //主逻辑业务
        //     window.localStorage.hasLogin = 1;
        //     this.props.goto('/home');
        // }
        console.log(this.props);
        this.props.appLogout();
    }

    render() {
        return (
            <div className="content">
                <Empty>
                <Button onClick={this.handleLagout}>退出</Button>
                </Empty>
            </div>
        )
    }
}

// 使用高阶组件包裹当前类组件
//const UserInfo = WidthUseNavigate(UserInfo_n);
// 导出包裹后的类组件
export default UserInfo;