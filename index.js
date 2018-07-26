const request = require('request');
const rp = require('request-promise');
const fs = require("fs");

var arguments = process.argv;

// 设置cookie
//const mycookie = 'x-stgw-ssl-info=8a8db50953ce78932939271bdf479e2f|0.096|1532568350.200|2|.|I|TLSv1.2|ECDHE-RSA-AES128-GCM-SHA256|13500|h2|0; pgv_pvi=4418706432; RK=6bjtBsRwRz; ptcz=36f4e83fa3b834700af4d27c1b8dd726eb2f0ab2ce7a39bafd225ad3f788f5fe; pgv_pvid=6703600965; pt2gguin=o0496081759; qz_screen=1920x1080; QZ_FE_WEBP_SUPPORT=1; __Q_w_s__QZN_TodoMsgCnt=1; __Q_w_s_hat_seed=1; randomSeed=882390; ptui_loginuin=496076446; cpu_performance_v8=4; zzpaneluin=; zzpanelkey=; pgv_si=s1515747328; _qpsvr_localtk=0.39046524194540466; ptisp=ctc; uin=o0496081759; skey=@FhWkOR5Xg; p_uin=o0496081759; pt4_token=RRGo6cBLcBEkeawQTllNtegbDpiLZBFwwVWQt8qCfB4_; p_skey=6jF2KiNL8ZjhCgdehISXWhR76L6L42d*IixMbdVTmPA_; Loading=Yes; pgv_info=ssid=s675748675';
//const myQQ = '496081759';

var myQQ = arguments[2];
var mycookie = fs.readFileSync('cookie.txt','utf-8');;
var self_url = 'https://h5.qzone.qq.com/proxy/domain/g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_more?uin='+ myQQ +'&mask=7&g_tk='+ getGTK(parseCookie(mycookie).p_skey)+'&page=1&fupdate=1&clear=1'
var friend_url = 'https://h5.qzone.qq.com/proxy/domain/g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_simple?uin=1324789616&mask=2&g_tk=37294197&page=1&fupdate=1';

// 存储关系信息
var nodes = [];
var links = [];
// 存储qq号
var groups = {
  me:myQQ,
  group1:[],
  group2:[],
  group3:[]
}

// 去空格
function trim(string){
  return string.replace(/\s+/g,"");
}


// 解析cookie
function parseCookie(cookieString){
	let cookieDict = {};
	let cookie = cookieString.split(';');
	for(let i of cookie){
		let a = i.split('=');
    //console.log(a[0],a[1]);
		cookieDict[trim(a[0])] = a[1];
	}
	return cookieDict;
}

// 获取GTK
function getGTK(str){     
  var hash = 5381;
  for(var i = 0, len = str.length; i < len; ++i)
   {
      hash += (hash << 5) + str.charAt(i).charCodeAt();
    }
  return hash & 0x7fffffff;
}

//http://g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_simple?uin=496081759&clear=1&mask=7&mod=8&fupdate=1&g_tk=1669163940

//console.log(parseCookie(mycookie));
//https://user.qzone.qq.com/496081759/friends/visitor
//https://h5.qzone.qq.com/proxy/domain/g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_more?uin=496081759&mask=7&g_tk=37294197&page=1&fupdate=1&clear=1&sd=0.5062615347804227&qzonetoken=abaa74f4513fe479f3356d60816edec263d1a43fa95bbad18b67612b4e479e71798609a64e59
//https://h5.qzone.qq.com/proxy/domain/g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_simple?uin=1324789616&mask=2&g_tk=37294197&page=1&fupdate=1&qzonetoken=5b93b7ec5efa4b3caa58b38bcc1814598e62156b62c456b538553b8fd1aa14adeba550c4904f



function getMyVistors(){
    const options = {
      method:'GET',
      url:self_url,
      headers:{
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'cookie':mycookie,
        'Referer':'https://user.qzone.qq.com/496081759/main'
      }
    }

    rp(options).then(function (body) {
      //console.log(body);
      const code = JSON.parse(body.slice(10,-3)).code;
    //console.log(response.statusCode);
    //console.log(body.slice(10,-3));
      if(code === 0){
        let data = JSON.parse(body.slice(10,-3)).data.items;
        let showData = {};
        //console.log(data);
        //console.log("------------------------------");
        //console.log('最近访问的访客有：')
        nodes.push({id:'我',group:1});
        for(let i of data){
          // 将自己和好友的关系压入links中
          links.push({source:'我',target:i.name,value:1});

          // 把自己的好友信息压入gruop和nodes中
          groups.group1.push({qq:i.uin,name:i.name});
          nodes.push({id:i.name,group:2})



          //console.log(i);
          console.log('昵称：' + i.name);
          console.log('QQ号：' + i.uin);
          for(let v of groups.group1){
              
              getFriendsVistors(v.qq,v.name);
            }
        } 

      }else{
        console.log('请检查你的cookie是否过期');
      }

}).catch(function(err){
  console.log(err);
})


/*    request(options, function (error, response, body) {
      console.log(body);
      const code = JSON.parse(body.slice(10,-3)).code;
    //console.log(response.statusCode);
    //console.log(body.slice(10,-3));
      if(code === 0){
        let data = JSON.parse(body.slice(10,-3)).data.items;
        let showData = {};
        //console.log(data);
        console.log("------------------------------");
        console.log('最近访问的访客有：')
        for(let i of data){
          // 将自己的数据压入nodes
          nodes.push({id:'0.5英里',group:1});

          // 把自己的好友信息压入gruop中
          groups.group1.push(i.uin);

          //console.log(i);
          console.log('昵称：' + i.name);
          console.log('QQ号：' + i.uin);
        }
        if (!error && response.statusCode == 200) {
          console.log('进入成功');
        }
      }else{
        console.log('请检查你的cookie是否过期');
      }

})*/
}

function getFriendsVistors(friend_qq,friend_name){
    let friend_url = 'https://h5.qzone.qq.com/proxy/domain/g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_simple?uin='+ friend_qq +'&mask=2&g_tk='+ getGTK(parseCookie(mycookie).p_skey) +'&page=1&fupdate=1';
     const options = {
      url:friend_url,
      headers:{
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'cookie':mycookie,
        'Referer':'https://user.qzone.qq.com/496081759/main'
      }
    }

    request(options, function (error, response, body) {
      //console.log(response.body);
      const code = JSON.parse(body.slice(10,-3)).code;

      if(code === 0){
        let data = JSON.parse(body.slice(10,-3)).data.items;
        let showData = {};
        //console.log(data);
        //console.log("------------------------------");
        //console.log('最近访问的访客有：')

        for(let i of data){
          // 把朋友压入nodes
          nodes.push({id:i.name,group:3})
          // 把关系压入links
          links.push({source:friend_name,target:i.name,value:1}) 

          // 把朋友的qq号再压入
          groups.group1.push({qq:i.uin,name:i.name});


          //console.log(i);
          console.log('昵称：' + i.name);
          console.log('QQ号：' + i.uin);
        }
      }else{
        console.log(JSON.parse(body.slice(10,-3)).message);
      }
     
})
}
function getFriendsVistors2(friend_qq,friend_name){
    let friend_url = 'https://h5.qzone.qq.com/proxy/domain/g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_simple?uin='+ friend_qq +'&mask=2&g_tk='+ getGTK(parseCookie(mycookie).p_skey) +'&page=1&fupdate=1';
     const options = {
      url:friend_url,
      headers:{
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
        'cookie':mycookie,
        'Referer':'https://user.qzone.qq.com/496081759/main'
      }
    }

    request(options, function (error, response, body) {
      const code = JSON.parse(body.slice(10,-3)).code;

      if(code === 0){
        let data = JSON.parse(body.slice(10,-3)).data.items;
        let showData = {};
        //console.log(data);
        //console.log("------------------------------");
        //console.log('最近访问的访客有：')

        for(let i of data){
          // 把朋友压入nodes
          nodes.push({id:i.name,group:4})
          // 把关系压入links
          links.push({source:friend_name,target:i.name,value:1}) 

          // 把朋友的qq号再压入
          //groups.group2.push({qq:i.uin,name:i.name});


          //console.log(i);
          console.log('昵称：' + i.name);
          console.log('QQ号：' + i.uin);
        }
      }else{
        console.log(JSON.parse(body.slice(10,-3)).message);
      }
     
})
}


/*var options = {
  url: 'https://h5.qzone.qq.com/proxy/domain/g.qzone.qq.com/cgi-bin/friendshow/cgi_get_visitor_more?uin=496081759&mask=7&g_tk=1443877932&page=1&fupdate=1&clear=1',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
    'cookie':mycookie,
    'Referer':'https://user.qzone.qq.com/496081759/main'
  },
  timeout:2000
}*/


// 程序开始
// 先获取自己的好友
getMyVistors();
setTimeout(function(){
  //console.log(groups.group1);
  for(let v of groups.group1){
    //getFriendsVistors2(v.qq,v.name);
  }
},3000);
setTimeout(function(){
  let data = {
    nodes:nodes,
    links:links
  }
  fs.writeFile('data.json',JSON.stringify(data), function(err){
    if (err) {
       return console.error(err);
    }
   console.log("数据写入成功！");
    })
},5000)




// 获取朋友的朋友
//getFriendsVistors('1144672219');


