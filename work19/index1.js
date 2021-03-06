

document.getElementById('upload').onclick = function(){
  var form = document.getElementById('form');
  var fd = new FormData(form);
  var bar = document.getElementById('bar');
  var per = document.getElementById('per');
  var down = document.getElementById('download');
  var xhr = new XMLHttpRequest();
  xhr.upload.onprogress = function (e) {
      var num = Math.floor(e.loaded / e.total * 100);
      bar.style.width = num + '%';
      per.innerHTML = num + '%';
  };
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 200 || xhr.status >= 300 && xhr.status !== 304) {
              throw new Error('文件上传失败，服务器状态异常');
          }
          var name = xhr.responseText;
          if (name == '') {
              throw new Error('服务器保存文件失败');
          }
          down.innerHTML = `文件上传成功。<a href=${name}>下载文件${name}</a>`;
      }
  };
  xhr.open('POST', 'http://139.9.81.203:8090/upload');
  xhr.send(fd);
};


