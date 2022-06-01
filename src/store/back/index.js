/* eslint-disable */
import axios from 'axios'

export default {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async EXECUTE({commit},requestOption){
      requestOption.url = "http://localhost:4001"+requestOption.url
      var respdata= await axios(requestOption).then((res)=>{
          return res.data
      }).catch(e=>{
          return e.response.data
      });
      return respdata;
    },
  },
}
