/*
包含n个用于间接更新状态数据方法的对象
 */
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
} from '../api'

import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_USERINFO,
  RECEIVE_USER,
  RESET_USR,
} from './mutation-types'

export default {
  // 异步获取address
  async getAddress ({commit, state}) {
    // 发送ajax请求
    const {latitude, longitude} = state
    const result = await reqAddress(latitude+','+longitude)   // {code: 0, data: address}
    if(result.code===0) {
      const address = result.data
      // commit给mutation
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取categorys
  async getCategorys ({commit}) {
    // 发送ajax请求
    const result = await reqFoodCategorys()
    if(result.code===0) {
      const categorys = result.data
      // commit给mutation
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },


  // 异步获取shops
  async getShops ({commit, state}) {
    // 发送ajax请求
    const {latitude, longitude} = state
    const result = await reqShops(longitude, latitude)
    if(result.code===0) {
      const shops = result.data
      // commit给mutation
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  //保存登录用户信息
    saveUser({commit},user){
    commit(RECEIVE_USER,{user})
    },

  //实现自动登录,获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      commit(RECEIVE_USERINFO,{user:result.data})
    }
  },
  //退出登录信息
  async logOut({commit}){
    const result = await reqLogout()
    if(result.code === 0){
      commit(RESET_USR)
    }
  }


}
