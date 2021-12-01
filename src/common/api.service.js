import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common.AccessControlAllowOrigin = '*'
    Vue.axios.defaults.headers.common.Authorization = `Token ${JwtService.getToken()}`
  },

  query (resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[ADIRMU] ApiService ${error}`)
    })
  },

  get (resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[ADIRMU] ApiService ${error}`)
    })
  },

  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  patch (resource, params) {
    return Vue.axios.patch(`${resource}`, params)
  },

  update (resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },

  delete (resource, slug = '') {
    return Vue.axios.delete(`${resource}/${slug}`).catch(error => {
      throw new Error(`[UMUROBOTS] ApiService ${error}`)
    })
  },

  deleteOld (resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[UMUROBOTS] ApiService ${error}`)
    })
  },
}

export default ApiService