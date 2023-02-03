import React from 'react'
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
	Upload,
	Empty,
	Radio,
	Modal
} from 'antd'

import { net_deleteImage, net_createPromptItem } from '../net/net';
import {withRouter} from 'react-router-dom'
import DEBUG_ from '../com/debugcof';

//import './container.css'

const {
	TextArea
} = Input;

const OStateEnum = {
		open:1,
		private:2,
		sale:3
	}

class ReleasePic extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

			imageUrl: '',
			showType: 1,
			curImgID: -1,
			userID:this.props.appUserId,
			openstate:OStateEnum.open
		}
	}

	componentDidMount(){
		console.log(this.props.appUserId);
		this.setState({
			userID:this.props.appUserId
		})
	}


	handleSubmit = e => {
		console.log('handle Press!');

		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);

				const prompt = values.u_prompt;
				const imgurl = this.state.imageUrl;
				const userID = this.state.userID;
				const openstate = this.state.openstate;
				if(imgurl == '')
				{
					Modal.error({
						title: '提示',
						content: `请先上传作品图片`,
					  });
					return ;
				}
				if(!prompt)
				{
					Modal.error({
						title: '提示',
						content: `请先输入描述词`,
					  });
					return ;
				}
				
				const artinfo = {
					prompt,
					imgurl,
					userID,
					openstate
				}
				console.log(artinfo)

				net_createPromptItem(artinfo).then((ret)=>{
					console.log(ret.data.data)
					if(ret.data.data.err_code == 0)
					{
						this.props.history.push('/home')
					}
					else{
						console.log('上传描述词服务器失败!')
					}
				})
			}
		});
	}

	callBackImg = imgData => {
		console.log('callBackImg called');
		const {imgID, imgUrl} = imgData;
		console.log('callback ImgID:',imgID);
		this.setState({
			curImgID: imgID,
			imageUrl: imgUrl
		})
	}

	onChangeRType = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			showType: e.target.value,
		});
	};

	testDeleteImg = e =>
	{
		net_deleteImage(this.state.curImgID)
	}

	render() {
		console.log("RelasePic render");

		const {
			getFieldProps
		} = this.props.form;

		const previewLayer = (!this.state.imageUrl ?
			<Empty  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    imageStyle={{
                    height: 240,
                    }}
                    description={
                    <span >
                    </span>
                    }>
            </Empty> :
			<img src={this.state.imageUrl} alt='preview'style={{ height:'512px', width: '512px' }} />)

		const showTestBtn = (DEBUG_ ?
				<Button type='primary' onClick={this.testBtn}>test</Button> : <div></div>)

		return (
			<div className='upload'>
				<Row>
				<Col span={6}></Col>
					<Col span={8}>
					<h5 style={{textAlign:'left', marginTop:'10px', marginLeft:'10px'}} >作品图片上传</h5>
					{<ImgUploader imgBack = {this.callBackImg}/>}
					</Col>
				</Row>
				<Row>
					<Col span={6}></Col>
					<Col span={8}>
					{previewLayer}
					{showTestBtn}
					</Col>
				</Row>

				<Row>
					<Col span={6}></Col>
					<Col span={12}>
					<Form onSubmit={this.handleSubmit}>
						<Form.Item label = '作品生成描述'>
							<TextArea rows={6} placeholder='请输入prompt描述词' {...getFieldProps('u_prompt')} />
						</Form.Item>
						<h5>描述词权限：</h5>
						<Row>
							<Radio.Group onChange={this.onChangeRType} value={this.state.showType}>
						        <Radio value={1}>公开</Radio>
						        <Radio value={2}>不公开(私有)</Radio>
					        </Radio.Group>
				        </Row>
				        <Row style={{marginTop:'10px'}}>
				        <Col span={16}></Col>
						<Col span={4}>
							<Button type='default'>预览</Button>
						</Col>
						<Col span={4}>
							<Button type='primary' htmlType='submit'>提交发布</Button>
						</Col>
						</Row>
					</Form>
					</Col>
				</Row>
			</div>
		)
	}
}


class ImgUploader extends React.Component {

	state = {
		imageUrl: '',
		loading: false,
		//waitingModelVisible:false
	};

	beforeUpload = file => {
		console.log('beforeUpload');
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	}

	doUpload = e => {
		console.log(e.file)

		if (!/image\/\w+/.test(e.file.type)) {
			alert("请确保文件为图像类型");
			return false;
		}
		var reader = new FileReader();
		reader.readAsDataURL(e.file);

		this.setState({
			loading: true,
		});
		const modal = Modal.success({
			title: '提示',
			content: `图像上传中......`,
		  });

		reader.onload = e => {
			//console.log(e.target.result);

			const formData = new FormData();
			// 通过append方法来追加数据
			formData.append('file', e.target.result);

			let url =
				"http://hd215.api.yesapi.cn/?" +
				"s=App.CDN.UploadImgByBase64&" +
				"file_name=MyBig&" +
				"app_key=24558AD2D4BE9C83BE1343EC5996EB50&" +
				"sign=0A0D9545A951A51AD0B3F33D29D833E4";

			fetch(url, {
				method: 'post',
				body: formData,
				//mode: 'no-cors'
			}).then((res) => {
				// console.log(res.status);
				// console.log(res.json());
				// console.log('fetch res~~');
				return res.json();
			}).then((data) => {
				console.log('fetch data!!!')
				console.log(data);

				const imgData = {
					imgID:data.data.id,
					imgUrl:data.data.url
				}

				this.props.imgBack(imgData)
				this.setState({
					imageUrl: data.data.url,
					loading: false
				});
				modal.destroy();
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

			<Upload
				name="avatar"
				listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
				beforeUpload={this.beforeUpload}
				onChange={this.handleChange}
				customRequest={this.doUpload}
				>
				{uploadButton}
	   
			</Upload>

		);
	}
}

ReleasePic = Form.create({
	name: 'normal_login_pcHeader'
})(ReleasePic);

export default withRouter(ReleasePic) 