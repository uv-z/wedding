// 预加载函数 ，会在加载完毕后隐藏遮罩层
function preLoad(urlList) {
  let process = document.querySelector('#mask'),  // 遮罩层 ，用于修改进度和隐藏
    len = urlList.length,// 提出 URL 数组长度 ，提供性能
    count = 0,  // 计算已加载数量和修改进度
    ul = document.querySelector("ul"), // 将图片放入此
    imgList = "";  // img 标签字符串临时存放点，避免刷新DOM的次数。

  // 为了模拟多图片资源和将加载过程慢下来，这里使用了计时器 ， 实际情况我们采用遍历 URL 数组。
  let id = setInterval(() => {
    let img = new Image()
    img.src = urlList[count]
    imgList += `<li><img src="${urlList[count]}"></li>`
    img.onload = img.onerror = function () {
      count++;
      process.innerText = (count / len * 100).toFixed(2) + '%'; // 设置进度百分比
      if (count === len) {
        clearInterval(id)
        ul.innerHTML += imgList;
        process.style.display = 'none'
      }
    }
  }, 500)
}