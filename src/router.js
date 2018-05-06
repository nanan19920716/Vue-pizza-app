//4  引入一级路由组件
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'

//6 引入二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

//7 引入三级路由
import Phone from './components/about/contact/Phone';
import PersonName from './components/about/contact/PersonName';

export const routes = [{
        path: '/',
        name: "homeLink",
        components: {
            default: Home,
            'orderingGuide': OrderingGuide,
            'delivery': Delivery,
            'history': History
        }
    },
    { path: '/menu', name: 'menuLink', component: Menu },
    {
        path: '/admin',
        name: 'adminLink',
        component: Admin,
        // beforeEnter: (to, from, next) => {
        //   if(to.path =='/login' || to.path =='/register'){
        //     next();
        //   }else{
        //     alert('还没有登录,请先登录!');
        //     next('/login');
        //   }
        // }
    },
    {
        path: '/about',
        name: 'aboutLink',
        redirect: '/about/contact',
        component: About,
        children: [{
                path: '/about/contact',
                name: "contactLink",
                redirect: '/phone',
                component: Contact,
                children: [
                    { path: '/phone', name: "phoneNumber", component: Phone },
                    { path: '/personname', name: "personName", component: PersonName }
                ]
            },
            { path: '/history', name: "historyLink", component: History },
            { path: '/delivery', name: "deliveryLink", component: Delivery },
            { path: '/orderingGuide', name: "orderingGuideLink", component: OrderingGuide },
        ]
    },
    { path: '/login', name: 'loginLink', component: Login },
    { path: '/register', name: 'registerLink', component: Register },
    { path: '*', redirect: '/' }
]