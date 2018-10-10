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
