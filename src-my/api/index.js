/*
与后台交互模块
 */
import ajax from "./ajax";
//1.根据经纬度获取位置详情
// export const reqAddress = (geohash)=>ajax('/position/'+geohash)
export const reqAddress = geohash => ajax('/api/position/' + geohash)
//2、获取食品分类列表
// export const reqCategorys = ()=>ajax('/index_category')
export const reqFoodCategorys = () => ajax('/api/index_category')
//3、根据经纬度获取商铺列表
// export const reqShops = ({latitude,longitude})=>ajax('/shops',{latitude,longitude})
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})
//6、用户名密码登陆
export const reqPwdLogin = ({name,pwd,captcha}) =>ajax('/api/login_pwd',{name,pwd,captcha},'POST')
//7、发送短信验证码
export const reqSendCode = phone =>ajax('/api/sendcode',{phone})
//8、手机号验证码登陆
export const reqSmsLogin = (phone,code) =>ajax('/api/login_sms',{phone,code},'POST')
//9、根据会话获取用户信息
export const reqUserInfo = () => ajax('/api/userinfo')
//10.退出登录
export const reqLogout = () =>ajax('api/logout')

//模拟后台请求的数据 mock数据
export  const reqGoods = () =>ajax('/goods')
export  const reqRatings = () =>ajax('/ratings')
export  const reqInfo = () =>ajax('/info')
