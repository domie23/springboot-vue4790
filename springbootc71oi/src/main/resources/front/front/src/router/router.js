import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Messages from '../pages/messages/list'
import Forum from '../pages/forum/list'
import ForumAdd from '../pages/forum/add'
import ForumDetail from '../pages/forum/detail'
import MyForumList from '../pages/forum/myForumList'
import ExamPaper from '../pages/exam/examPaper'
import Exam from '../pages/exam/exam'
import ExamList from '../pages/exam/examList'
import ExamRecord from '../pages/exam/examRecord'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import caipinfenleiList from '../pages/caipinfenlei/list'
import caipinfenleiDetail from '../pages/caipinfenlei/detail'
import caipinfenleiAdd from '../pages/caipinfenlei/add'
import caipuxinxiList from '../pages/caipuxinxi/list'
import caipuxinxiDetail from '../pages/caipuxinxi/detail'
import caipuxinxiAdd from '../pages/caipuxinxi/add'
import bijixinxiList from '../pages/bijixinxi/list'
import bijixinxiDetail from '../pages/bijixinxi/detail'
import bijixinxiAdd from '../pages/bijixinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'messages',
					component: Messages
				},
				{
					path: 'forum',
					component: Forum
				},
				{
					path: 'forumAdd',
					component: ForumAdd
				},
				{
					path: 'forumDetail',
					component: ForumDetail
				},
				{
					path: 'myForumList',
					component: MyForumList
				},
				{
					path: 'examPaper',
					component: ExamPaper
				},
				{
					path: 'examList',
					component:ExamList
				},
				{
					path: 'examRecord/:type',
					component:ExamRecord
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'caipinfenlei',
					component: caipinfenleiList
				},
				{
					path: 'caipinfenleiDetail',
					component: caipinfenleiDetail
				},
				{
					path: 'caipinfenleiAdd',
					component: caipinfenleiAdd
				},
				{
					path: 'caipuxinxi',
					component: caipuxinxiList
				},
				{
					path: 'caipuxinxiDetail',
					component: caipuxinxiDetail
				},
				{
					path: 'caipuxinxiAdd',
					component: caipuxinxiAdd
				},
				{
					path: 'bijixinxi',
					component: bijixinxiList
				},
				{
					path: 'bijixinxiDetail',
					component: bijixinxiDetail
				},
				{
					path: 'bijixinxiAdd',
					component: bijixinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/exam',
			component: Exam
		}
	]
})
