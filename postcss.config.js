const autoprefixer = require('autoprefixer')
//后处理css
//有些浏览器属性需要加前缀如-webkit-，autoprefixer可以省略这种
module.exports = {
  plugins: [
    autoprefixer()
  ]
}