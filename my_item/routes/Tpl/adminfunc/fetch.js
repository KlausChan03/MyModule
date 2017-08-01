// var url = 'LargeFile.txt';
// var progress = 0;
// var contentLength = 0;

// function test(){
// fetch(url).then(function (response) {
//   // 本次请求总的数据长度
//   contentLength = response.headers.get('Content-Length');
//   var getStream = function (reader) {};
//   return getStream(response.body.getReader());
// })
// .catch(function (error) {
//   console.log(error);
// });
// }

function test(){
var xhr = new XMLHttpRequest();

// 指定通信过程中状态改变时的回调函数
xhr.onreadystatechange = function(){
  // 通信成功时，状态值为4
  if (xhr.readyState === 4){
    if (xhr.status === 200){
      console.log(xhr.responseText);
    } else {
      console.error(xhr.statusText);
    }
  }
};

xhr.onerror = function (e) {
  console.error(xhr.statusText);
};

// open方式用于指定HTTP动词、请求的网址、是否异步
xhr.open('GET', './LargeFile.txt', true);

// 发送HTTP请求
xhr.send(null);
}
