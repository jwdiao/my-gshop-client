/*
使用mock,提供mockjs的接口
 */
import Mock from 'mockjs'
import data from './data'
//提供3个接口
Mock.mock('/goods',{code:0,data:data.goods})
Mock.mock('/ratings',{code:0,data:data.ratings})
Mock.mock('/info',{code:0,data:data.info})
