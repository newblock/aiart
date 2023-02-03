import React from 'react';
import './gallery.scss'
import WidthUseNavigate from '../withusenavigate'
import {withRouter} from 'react-router-dom'
import { net_getImageList } from '../../net/net';
import { Button,Alert } from 'antd';
import DEBUG_ from '../debugcof';
// Create new array with URLs for images

//let imgUrls = [];

// Component for gallery image
class GalleryImage extends React.Component {
  render() {
    return (
      <img className={this.props.className} src={this.props.src} alt={this.props.alt} />
    )
  }
}

var gImgList = [];

// Component for gallery
class Gallery extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        curPage:1,
        curPageNum:3,
        imgUrlList:gImgList
      }

    }

    componentWillUnmount = e =>{
      console.log('wiil Unmout');
      //gImgList = this.state.imgUrlList;
    }

    handleImage = e => {
      //测试数字+10
      this.props.appChangeCurImgID(parseInt(e.target.alt));
      this.props.history.push('/detail')
    }

    testBtn = e =>{
      this.props.gActUpdateImageList();
    }

    render() {
      
      const imgList = this.props.appImgInfoList;
      let imgUrlList = [];
      for(let i = 0 ;i < imgList.length ;i++)
      {
        const imgItem = {
          url:imgList[i].imageurl,
          id:imgList[i].id
        }
        imgUrlList.push(imgItem);
      }
      console.log(imgUrlList.length)

      const showTestBtn = (DEBUG_ ?
        <Button type='primary' onClick={this.testBtn}>test</Button> : <div></div>)

      return (
        <div refs='gallery-container' className='container-fluid gallery-container'>
        {showTestBtn}
        
        <div className='row'>
          {
            imgUrlList.map((item, index) => {
               
               return <div className='col-sm-6 col-md-4 col-lg-4' key={index}>
                  {/* <div className='gallery-card' value={url} onClick={(e) => this.openModal(url, e)}> */}
                  <div className='gallery-card' value={item.url} onClick={this.handleImage}>
                    <GalleryImage className='gallery-thumbnail' src={item.url} alt={(item.id)} />
                    
                    <span className='card-icon-open' ></span>
                    {/* <span className='card-icon-open fa fa-expand' ></span> */}
                    {/* <Button type='primary' onClick={this.handleImage} className='testH2'>test </Button>
                    <h2 className='testH2'>testH2</h2> */}
                  </div>
                </div>
             })
           }
        </div>
        
      </div>
    )
  }
  
}

// static test img url
// let imgUrls = [
//   'https://source.unsplash.com/4rDCa5hBlCs/1280x1024',
//   'https://source.unsplash.com/01vFmYAOqQ0/1280x1024',
//   'https://source.unsplash.com/2Bjq3A7rGn4/1280x1024',
//   'https://source.unsplash.com/cFplR9ZGnAk/1280x1024',
//   'https://source.unsplash.com/pHANr-CpbYM/1280x1024',
//   'https://source.unsplash.com/RkmyeYA6xuE/1280x1024',
//   'https://source.unsplash.com/E4944K_4SvI/1280x1024',
//   'https://source.unsplash.com/-hI5dX2ObAs/1280x1024',
//   'https://source.unsplash.com/vZlTg_McCDo/1280x1024',
//   'https://source.unsplash.com/4rDCa5hBlCs/1280x1024',
//   'https://source.unsplash.com/01vFmYAOqQ0/1280x1024',
//   'https://source.unsplash.com/2Bjq3A7rGn4/1280x1024',
//   'https://source.unsplash.com/cFplR9ZGnAk/1280x1024',
//   'https://source.unsplash.com/pHANr-CpbYM/800x600',
//   'https://source.unsplash.com/RkmyeYA6xuE/800x600',
//   'https://source.unsplash.com/E4944K_4SvI/800x600',
//   'https://source.unsplash.com/-hI5dX2ObAs/800x600',
//   'https://source.unsplash.com/vZlTg_McCDo/800x600',
//   'https://source.unsplash.com/4rDCa5hBlCs/800x600',
//   'https://source.unsplash.com/01vFmYAOqQ0/800x600',
//   'https://source.unsplash.com/2Bjq3A7rGn4/800x600',
//   'https://source.unsplash.com/cFplR9ZGnAk/800x600',
//   'https://source.unsplash.com/pHANr-CpbYM/800x600',
//   'https://source.unsplash.com/RkmyeYA6xuE/800x600',
//   'https://source.unsplash.com/E4944K_4SvI/800x600',
//   'https://source.unsplash.com/-hI5dX2ObAs/800x600',
//   'https://source.unsplash.com/vZlTg_McCDo/800x600',
// ];


// 使用高阶组件包裹当前类组件
//const Gallery = WidthUseNavigate(Gallery_n);
// 导出包裹后的类组件
export default withRouter(Gallery);