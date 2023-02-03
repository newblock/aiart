import React from "react";
import {
    Typography,
    Divider,
    Row,
    Col
} from 'antd';

const {
    Title,
    Paragraph,
    Text
} = Typography;

const promptEmun = {
    public: 1,
    private: 2,
    sale: 3
}

class ArtDetail extends React.Component {

    constructor(props){
        super(props);
        this.state ={

            promptType: promptEmun.private,
            username: '无名',
            artname: '太空歌剧院',
            artintro: '我的第一个作品',
            imageUrl: '',
            artPrompt: 'We supply a series of design principles, practical patterns and high quality design resources to help people create their product prototypes beautifully and efficiently.',
        }
    }

    handleLagout = e => {
        if (!window.localStorage) {
            alert("浏览器不支持localstorage");
            return false;
        } else {
            //主逻辑业务
            window.localStorage.hasLogin = 1;
            this.props.goto('/home');
        }
    }
    // componentWillUpdate(){

    // }

    componentDidMount(){
        this.props.gActBindMe(this);
    }
    // UNSAFE_componentWillMount() {
    //     console.log('111')
    //     if (this.state.promptType === 2) {
    //         this.setState({
    //             artPrompt: '已设置为私有权限.'
    //         })
    //     }
    // }

    render() {
        return (
            <div className="content">
            <Row>
            <Col span={4}></Col>
            <Col span={16}>
            <Typography>
                <Title level={4}>{this.state.artname}</Title>

                <img src={this.state.imageUrl} alt='preview' style={{ height:'800px', width: '800px' }} />
                {/* <img src={this.state.imageUrl} alt='preview' style={{ width: '100%'}} /> */}
                <Divider />
                <h5 style={{textAlign:'left'}}>  描述词 : </h5>
                <Paragraph style={{textAlign:'left'}}>
                    <Text strong>
                    {this.state.artPrompt}
                    </Text>
                </Paragraph>
                <Divider />
                <h5 style={{textAlign:'right'}}>平台: Midjourney </h5>
                <h5 style={{textAlign:'left'}}>作者: {this.state.username} </h5>

                {/* <Divider />
                <h5 style={{textAlign:'left'}}>作品介绍:</h5>
                <Paragraph>
                {this.state.artintro}
                </Paragraph> */}
            </Typography>
            </Col>
            </Row>
            </div>
        )
    }
}

// 使用高阶组件包裹当前类组件
//const ArtDetail = WidthUseNavigate(ArtDetail_n);
// 导出包裹后的类组件
export default ArtDetail;