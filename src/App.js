import {
  Router,
  Route
} from "react-router-dom";
import {
  withRouter
} from 'react-router-dom'

import DEBUG_ from "./com/debugcof";

import { net_getImageDetail } from "./net/net";
//import md5 from "md5";
import PCHeader from './com/nav/navcom'
import PCFooter from './com/footer/footer'
import PCGallery from './com/gallery/gallery'
import ReleasePic from './container/upload'
import TestUI from './test/testui'
import UserInfo from "./container/userinfo";
import ArtDetail from "./container/artdetail";

// Create new array with URLs for images

import './App.css';
import React from "react";
import {
  Button,
  Switch
} from "antd";

import { net_userLogin, net_userRegister, net_getImageList } from "./net/net";

export const AppContext = React.createContext();

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      gUserLogin:false,
      gUserID:-1,
      gUserName:'',
      gUserNickName:'',
      gUserAvatar:'',
      gCurImgDetailID:-1,
      gpNavHeader:null,
      gpImgDetailCom:null,
      gImgList:[],
      gCurPage:1,
      gPageNum:10
    };
  }

  componentDidMount(){
    
    this.initAppData();
    //checkCookie();

    const uname = getCookie('uname');
    const uid = getCookie('uid');

    console.log(uname)
    console.log(uid)
    if(uname && uid)
    {
      this.setState({
        gUserName:uname,
        gUserLogin:true,
        gUserID:uid
      })

      this.childRef.setState({
        //current: this.state.gpNavHeader.state.menuKeys.mainPage,
        userBtnText: '个人中心',
        userBtnType: 'default',
        //showWelcomeBack: true
      });
    }
  }

  initAppData = e => {
    //1: 获取用户缓存数据，
    //获取成功后更新appState中,gUserID,gUserName等用户数据
    //如未登陆或缓存超时，等待登陆结束后注册后重新加载

    //2: 获取imageList第一页，20张图片信息
    //更新到state.gImgList中
    //并且更新Gallery数据，显示界面，通过props传入imgUrls

      //获取第一页,每页2张
      let retData = net_getImageList(
        this.state.gCurPage, 
        this.state.gPageNum);

      //console.log()

      retData.then((ret)=>{
        if(ret.data.data.err_code == 0)
        {
          let imList = ret.data.data.list;
          console.log(imList)
  
          // for(let i = 0 ; i < imList.length ; i++){
          //   gImgList.push(imList[i].imageurl)
          // }
          this.setState({
            gImgList:[...this.state.gImgList, ...imList],
            gCurPage:this.state.gCurPage+1
          })
        }
        else{
          console.log('服务器图片数据加载是吧, Error:',ret.data.data.err_code)
        }
      })
  }

  gActUpdateImageList = () =>{

    let retData = net_getImageList(this.state.gCurPage, this.state.gPageNum);

    retData.then((ret)=>{
      if(ret.data.data.err_code == 0)
      {
        let imList = ret.data.data.list;

        // for(let i = 0 ; i < imList.length ; i++){
        //   gImgList.push(imList[i].imageurl)
        // }
        this.setState({
          gImgList:[...this.state.gImgList, ...imList],
          gCurPage:this.state.gCurPage+1
        })
        console.log(this.state.gImgList)
      }
      else{
        console.log('服务器图片数据加载是吧, Error:',ret.data.data.err_code)
      }

    })
  }



  gActUserRegister = info =>{
    
    const uname = info.uname;
    const upass = info.upass;
    const ptLast = info.ptLast;

    const netinfo = {
      username: uname,
      upass: upass
      //'check_field': 'username'
    };

    const ret = net_userRegister(netinfo);

    ret.then((res)=>{
      console.log(res.data);
      ptLast.setState({
        loginOKType:false
      })

      if (res.data.data.err_code == 0) {
          console.log('注册成功！！！')
          this.setState({
            gUserName:uname,
            gUserLogin:true,
            gUserID:res.data.data.id
          })

          ptLast.setState({
              showOkRegister: true,
              modalRegisterVisible: false,
              //hasLogined: true,
              current: ptLast.state.menuKeys.releaseArt,
              userBtnText: '个人中心',
              //userBtnType:'default'
          })

          setCookie('uname',uname,3);
          setCookie('uid',res.data.data.id,3);

          this.props.history.push('/upload');
          setTimeout(() => {
            ptLast.setState({
                  showOkRegister: false,
              })
          }, 3000)

      } else if (res.data.data.err_code == 3) {
          //console.log('用户名重复，请选择新的用户名')
            ptLast.setState({
              showErrUserExist: true
          })
          setTimeout(() => {
            ptLast.setState({
                  showErrUserExist: false
              })
          }, 3000)
      }
      else{
        console.log('服务器其他错误原因: error_code: '+res.data.err_code)
      }
    })
  }

  getActUserLogin = info =>{

    const ptLast = info.ptLast;

    console.log('login 02')
    const ret = net_userLogin(info);
    ret.then((data)=>{
      console.log(data)

      const uid = data.data.data.id;
      const uname = data.data.data.username;
      const nickname = data.data.data.nickname;
      const err_code = data.data.err_code;

      console.log('err:',err_code)
      console.log('name:',uname)
      
      ptLast.setState({
        loginOKType:false
      })

      if (err_code == 0) {
        console.log('登录成功！！！')
        this.props.history.push('/upload');
        this.setState({
          gUserName:uname,
          gUserLogin:true,
          gUserID:uid,
          gUserNickName:nickname
        })

        ptLast.setState({
          modalLoginVisible: false,
          //hasLogined: true,
          current: ptLast.state.menuKeys.releaseArt,
          userBtnText: '个人中心',
          //userBtnType: 'default',
          showWelcomeBack:true
        })
        //设置cookie缓存，3天时间
        setCookie('uname',uname,3);
        setCookie('uid',uid,3);

        setTimeout(() => {
          this.childRef.setState({
            showWelcomeBack: false,
            })
        }, 3000)

      } else if (err_code == 3) {

        console.log('用户名密码错误，登录失败')
        ptLast.setState({
          showErrLogin: true
        })
        setTimeout(() => {
          ptLast.setState({
            showErrLogin: false
          })
        }, 2000)
      }
      else{
        console.log('服务器其他错误原因: error_code: '+err_code)
      }
    })
  }

  gActLogout = e =>{
    console.log('g logout')

    this.setState({
      gUserLogin: false,
      gUserID:-1
    })

    console.log(this.childRef.state)

    this.childRef.setState({
          //hasLogined: true,
          current: this.childRef.state.menuKeys.mainPage,
          userBtnText: '登录',
          userBtnType: 'default'
    });

    this.props.history.push('/home');
  }

  handleTestBtn = e =>{
    this.setState({
      gUserLogin: !this.state.gUserLogin
    })
    console.log(this.state.gUserLogin)
  }

  handleBindChild = e =>{
    console.log('test Child')
    this.childRef = e;
  }

  gActChangeImgID = (imgID) =>{

      this.setState({
        gCurImgDetailID:imgID
      })

       console.log(imgID);
       const retData = net_getImageDetail(imgID);
       //数据获取成功
       retData.then((ret) => {
            console.log(ret.data.data);

            const imgData = ret.data.data.data;

            if(ret.data.data.err_code == 0){
                this.state.gpImgDetailCom.setState({
                    username:imgData.userid,
                    imageUrl:imgData.imageurl,
                    artPrompt:imgData.prompt
                })
            }
       })
  }

  gActBindImgDetailCom = ( pDetail )=>{
    this.setState({
      gpImgDetailCom : pDetail
    })
  }


  render() {

    const showTestBtn = (DEBUG_ ?
      <div>
      <Button type='primary' onClick={this.handleTestBtn}>测试:{this.state.gUserLogin?1:0}</Button>
      <Button type='default' >UserID:{this.state.gUserID}</Button>
      </div> : 
      <div></div>)

    return (
      <div>
        <AppContext.Provider value={this.state}>
        {showTestBtn}

            <PCHeader appState={this.state} 
                    bindChild={this.handleBindChild} 
                    appLogin={this.getActUserLogin} 
                    appRegister={this.gActUserRegister}/>
            <Route exact path="/" render={()=> <PCGallery 
                         appChangeCurImgID={this.gActChangeImgID} 
                         appImgInfoList={this.state.gImgList}
                         gActUpdateImageList={this.gActUpdateImageList}
                        />} />
            <Route exact path="/home" render={()=> <PCGallery 
                         appChangeCurImgID={this.gActChangeImgID} 
                         appImgInfoList={this.state.gImgList}
                         gActUpdateImageList={this.gActUpdateImageList}
                        />} />
            <Route exact path="/upload" render={()=> <ReleasePic 
                         appUserId={this.state.gUserID} 
                         />} />
            <Route exact path="/about" component={PCFooter } />
            <Route exact path='/userinfo' render={()=> <UserInfo appLogout={this.gActLogout}/>} />
            <Route exact path="/detail" render={()=> <ArtDetail gActBindMe={this.gActBindImgDetailCom}/>} />
            <Route exact path="/testui" component={TestUI} />
            {/* <Route path='/testcom' component={TestCom}></Route> */}
 
            <PCFooter />
        </AppContext.Provider>

   </div>
    )
  }
}

function setCookie(cname,cvalue,exdays){
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname){
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
  }
  return "";
}

export default withRouter(App);