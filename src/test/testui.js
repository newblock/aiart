import React from "react";
import {
	Empty,
	Button,
	Icon,
	Upload,
	Divider
} from 'antd'
import WidthUseNavigate from '../com/withusenavigate'

import axios from 'axios'

class TestUI extends React.Component {

	state = {
		imageUrl: '',
		loading: false,
	};

	handleLagout = e => {
		// if (!window.localStorage) {
		// 	alert("浏览器不支持localstorage");
		// 	return false;
		// } else {
		// 	//主逻辑业务
		// 	window.localStorage.hasLogin = 1;
		// 	this.props.goto('/home');
		// }
	}

	testUpJson = e => {

		const posturl =
			'http://hd215.api.yesapi.cn/?&' +
			's=App.Hello.World&return_data=0&' +
			'app_key=24558AD2D4BE9C83BE1343EC5996EB50&' +
			'sign=8CAC2810F4D6EA278CDE10D9855A7716'

		const data = {
			'name': 'abc'
		};

		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: JSON.stringify(data),
			url: posturl,
		};
		axios(options).then(res => {
			console.log(res.data)
		})
	}

	testImgBase64 = e => {

		if (!/image\/\w+/.test(e.file.type)) {
			alert("请确保文件为图像类型");
			return false;
		}
		var reader = new FileReader();
		reader.readAsDataURL(e.file);

		this.setState({
			loading: true,
		});


		reader.onload = e => {
			//console.log(e.target.result);

			const formData = new FormData();
			// 通过append方法来追加数据
			formData.append('file', e.target.result);

			let posturl =
				"http://hd215.api.yesapi.cn/?" +
				"s=App.CDN.UploadImgByBase64&" + "file_name=MyBig&" +
				"app_key=24558AD2D4BE9C83BE1343EC5996EB50&" +
				"sign=0A0D9545A951A51AD0B3F33D29D833E4";

			const options = {
				method: 'POST',
				data: formData,
				url: posturl,
			};
			axios(options).then(res => {
				console.log(res.data)
				this.setState({
					imageUrl: res.data.data.url,
					loading: false
				});
			})
		}
	}

	render() {

		const uploadButton = (
			<div>
			 	<Icon type={this.state.loading ? 'loading' : 'plus'} />
			   	<div className="ant-upload-text">上传图像</div>
			   	<div className="ant-upload-text">(JPG和PNG格式)</div>
			</div>
		);

		return (
			<div className="content">
                <Empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    imageStyle={{
                    height: 100,
                    }}
                    description={
                    <span>
                        Customize <a href="#API">个人中心页面</a>
                    </span>
                    }
                >
                <Button type="primary" onClick={this.testImgBase64}>测试按钮</Button>
                </Empty>
                <Empty>
                <Button onClick={this.handleLagout}>退出</Button>
                </Empty>
                <img src={this.state.imageUrl} alt='preview' style={{ height:'600px', width: '600px' }} />
                <Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					beforeUpload={this.beforeUpload}
					onChange={this.handleChange}
					customRequest={this.testImgBase64}
				>
				{uploadButton}
	   
			</Upload>

            </div>
		)
	}
}

// 使用高阶组件包裹当前类组件
//const TestUI = WidthUseNavigate(TestUI_n);
// 导出包裹后的类组件
export default TestUI;