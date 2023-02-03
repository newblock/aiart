
import axios from "axios";
import md5 from "md5";

//用户登录函数
export async function net_userLogin( info ){

    const uname = info.uname; //'a'
    const upass = info.upass; //'1'
    
    let url =
    "http://hd215.api.yesapi.cn/?" +
    "s=App.Table.FreeFindOne&" +
    "model_name=userlist&" +
    "return_data=1&" +
    "logic=and&" +
    "app_key=24558AD2D4BE9C83BE1343EC5996EB50&" +
    "sign=" + "0A0D9545A951A51AD0B3F33D29D833E4" + "&" + 
    "where_username=" + uname + "&" +
    "where_upass=" + md5(md5(upass))

    console.log('net_userLogin called!!')

    let ret = await axios(url);

    return ret;
}

//用户注册函数
export async function net_userRegister( info ){

    const uname = info.username;
    const upass = md5(md5(info.upass));

    let posturl = "http://hd215.api.yesapi.cn/"

    const dataParam = {
        s:'App.Table.CheckCreate',
        model_name:'userlist',
        check_field:'username',
        app_key:'24558AD2D4BE9C83BE1343EC5996EB50',
        sign:'0A0D9545A951A51AD0B3F33D29D833E4',
        data:{
            'username':uname,
            'upass':upass,
        }
    }

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: JSON.stringify(dataParam),
        url: posturl,
    };

    console.log('net_userRegister called!!')
    
    let ret = await axios(options);

    return ret;
}

//上传图片函数
export async function net_uploadImage( info ){

    let resData = {}
    //第一步：将图片上传至CDN
    //第二步：将上传好的ID创建到临时图片列表中
    //第三步（此操作不在此函数执行）：待艺术详情整体发布或者放弃发布，
    //删除临时图片列表中的图片ID

    console.log('net_imageupload called~');

    return resData ;
}

export async function net_deleteImage( imgID, info )
{
    let url = "http://hd215.api.yesapi.cn/"

    const dataParam = {
        id:imgID,
        s:'App.CDN.DeleteById',
        app_key:'24558AD2D4BE9C83BE1343EC5996EB50',
        sign:'0A0D9545A951A51AD0B3F33D29D833E4'
    }

    const options = {
        url:url,
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: JSON.stringify(dataParam)
    }

    console.log('net_deleteImage called!!')

    let ret = await axios(options);

    return ret.data.data.err_code;
}

//发布作品函数,上传propmt及作品生成
export async function net_createPromptItem( info ){

    console.log(info);
    const dataParam = {
        s:'App.Table.Create',
        model_name:'artitem',
        app_key:'24558AD2D4BE9C83BE1343EC5996EB50',
        sign:'0A0D9545A951A51AD0B3F33D29D833E4',
        data:{
            prompt: info.prompt,
            imageurl: info.imgurl,
            userid:  info.userID,
            openstate: info.openstate
        }
    }

    let url = "http://hd215.api.yesapi.cn/"

    const options = {
        url:url,
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: JSON.stringify(dataParam)
    }

    console.log('net_uoloadItemPrompt called!')

    let ret = await axios(options);

    console.log('net_createPromptItem called')

    return ret ;
}

//获取图像列表，每次50张
export async function net_getImageList( pageNum,perNum ){

    const dataParam = {
        s:'App.Table.FreeQuery',
        model_name:'artitem',
        logic:'and',
        app_key:'24558AD2D4BE9C83BE1343EC5996EB50',
        sign:'0A0D9545A951A51AD0B3F33D29D833E4',
        page:   pageNum,
        perpage:perNum,
        //where:'[["id", ">=", "1"]]',
        order:'["id DESC"]'
    }

    let url = "http://hd215.api.yesapi.cn/"

    const options = {
        url:url,
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: JSON.stringify(dataParam)
    }

    let ret = await axios(options);

    return ret;
}

//获取作品详情信息
export async function net_getImageDetail( imgID ){

    let url = "http://hd215.api.yesapi.cn/"

    const dataParam = {
        s:'App.Table.Get',
        app_key:'24558AD2D4BE9C83BE1343EC5996EB50',
        sign:'0A0D9545A951A51AD0B3F33D29D833E4',
        model_name:'artitem',
        id: imgID
    }

    const options = {
        url:url,
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: JSON.stringify(dataParam)
    }

    console.log('net_getImageDetail called!!')

    let ret = await axios(options);

    return ret ;
}

//获取用户详情函数
export async function net_getUserDetail( info ){
    
    let resData = {}
    return resData ;
}

function testUpJson (e) {

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

function testImgBase64 (e){

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
