import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import vuxLocales from '../locales/all.yml'
import Vue from 'vue'
import modules from './modules'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
let store = new Vuex.Store({
	modules: {
		i18n: vuexI18n.store,
		...modules
	},
	plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
/** i18n 中英文设置 **/
Vue.use(vuexI18n.plugin, store)
const finalLocales = {
	'en': vuxLocales['en'],
	'zh-CN': vuxLocales['zh-CN']
}
for (let i in finalLocales) {
	Vue.i18n.add(i, finalLocales[i])
}

//设置默认为中文
Vue.i18n.set('zh-CN')
/**end */

export default store