const axios = require('axios');
//var url = "http://g.qzone.qq.com/fcg-bin/cgi_emotion_list.fcg";
//http://r.qzone.qq.com/cgi-bin/main_page_cgi
/*axios.post('http://r.qzone.qq.com/cgi-bin/main_page_cgi', {
    uin: '2406865312',
    loginUin: '2406865312',
    rd:Math.random(),
    num:3,
    noflower:1
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });*/

  axios.post('https://i.qq.com/loginform?',{u:'496081759',p:'8499891515828350242'})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });