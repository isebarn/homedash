import Vue from 'vue'
import moment from 'moment'

function date (date) {
  return date !== '' ? moment(date).format('LL') : ''
}

function objectidDate (objectId) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
}

Vue.filter('date', date)
Vue.filter('objectidDate', objectidDate)
