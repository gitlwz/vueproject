export default {
    state: {
        count:0
    },
    mutations: {                //Mutation 通过store.commit方法触发  必须是同步函数
        increment(state,params) {
            // 变更状态
            state.count = state.count + 3
        }
    },
    actions: {                  //Action 通过 store.dispatch 方法触发 可以异步操作：
        increment(/*context*/ { dispatch, commit, state, getters }) {
            commit('increment',"参数")
        },
        // async actionB({ dispatch, commit }) {
        //     await dispatch('actionA') // 等待 actionA 完成
        //     commit('gotOtherData', await getOtherData())
        // }
    }
}