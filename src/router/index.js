import Vue from 'vue'
import Router from 'vue-router'
import HelloFromVux from '@/components/HelloFromVux'
import page from '@/components/page'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
Vue.use(Router)
export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloFromVux
		},
		{
			path: '/page',
			name: 'page',
			component: page
		},
		{
			path: '/page1',
			name: 'page1',
			component: page1
		},
		{
			path: '/page2',
			name: 'page2',
			component: page2
		}
	]
})

