import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
export default () => {
  const store = new Vuex.Store({
    strict: process.env.NODE_ENV === 'development', // 设置开发环境下无法从外部修改数据，修改数据必须通过mutations修改
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: { // 模块
      a: {
        namespaced: true, // 设置命名空间，使mutations,getters不冲突
        state: {
          text: 'a'
        },
        mutations: {
          updateText (state, text) {
            state.text = text
          }
        }
      },
      b: {
        state: {
          text: 'b'
        }
      }
    }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state')
      const newMutations = require('./mutations/mutations')
      const newActions = require('./actions/actions')
      const newGetters = require('./getters/getters')
      store.hotUpdate({
        state: newState,
        getters: newGetters,
        mutations: newMutations,
        actions: newActions
      })
    })
  }
  return store
}
