/**
 * 下载二进制文件流
 * @param {*} res 
 * @param {*} fileName 
 * @param {*} type 
 */
export function downloadFile(res, fileName,type="text/xlsx") {
  const blob = new Blob([res.data], {
    type: type
  }) // res为从后台返回的数据
  const url = window.URL.createObjectURL(blob) // res为从后台返回的数据
  if (!fileName) {
    fileName = decodeURI(res.headers['content-disposition']).split('filename=')[1]
  }
  if ('msSaveOrOpenBlob' in navigator) {
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const elink = document.createElement('a')
    elink.setAttribute('download', fileName)
    elink.style.display = 'none'
    elink.href = url
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  }
}

/**
 * 下载blob
 * @param {*} blob 
 * @param {*} fileName 
 * @param {*} type 
 */
export function downloadBlob(blob, fileName,type="video/mp4") {
  const url = window.URL.createObjectURL(blob) // res为从后台返回的数据
  if (!fileName) {
    fileName = decodeURI(res.headers['content-disposition']).split('filename=')[1]
  }
  if ('msSaveOrOpenBlob' in navigator) {
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const elink = document.createElement('a')
    elink.setAttribute('download', fileName)
    elink.style.display = 'none'
    elink.href = url
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  }
}

/**
 * 下载视频文件
 * @param {*} url 
 * @param {*} fileName 
 */
export function downloadVideo(url,fileName='playback') {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener("progress", function(obj) {
      if (obj.lengthComputable) {
          var percentComplete = obj.loaded / obj.total;
          console.log((percentComplete * 100).toFixed(2) + "%");
          // 可得到下载进度
      }
  }, false);
  xhr.responseType = 'blob'; // 设置返回类型blob
  // Response.AddHeader("Access-Control-Allow-Origin", "*"); 
  xhr.onload = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          let blob = this.response;
          // 转换一个blob链接
          let u = window.URL.createObjectURL(new Blob([blob], {
              type: 'video/mp4'
          }))
          let a = document.createElement('a');
          a.download = fileName; //这里是文件名称
          a.href = u;
          a.style.display = 'none'
          document.body.appendChild(a)
          a.click();
          a.remove();
      }
  };
  xhr.send()
}
