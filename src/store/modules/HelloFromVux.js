export default {
    namespaced: true,
    state: {
        count: 0
    },
    mutations: {//Mutation 通过store.commit方法触发  必须是同步函数
        increment(state, payload) {
            // 变更状态
            state.count++
        }
    },
    actions: {//Action 通过 store.dispatch 方法触发 可以异步操作：

        // 在这个模块中， dispatch(用来触发action) 和 commit(触发mutations) 也被局部化了
        // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
        increment(/*context*/ { dispatch, commit, state, getters,rootState, rootGetters }) {
            commit('increment', "参数")
            //commit('increment',"参数",{ root: true })
            //dispatch('increment', "参数", { root: true })
        },
        // async actionB({ dispatch, commit }) {
        //     await dispatch('actionA') // 等待 actionA 完成
        //     commit('gotOtherData', await getOtherData())
        // }
    }
}