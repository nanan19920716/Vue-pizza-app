import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        menuItem: {},
        currentUserstatus: null,
        isLogin: false
    },
    // 用来获取属性的状态
    getters: {
        currentUser: state => state.currentUserstatus,
        isLogin: state => state.isLogin
    },
    mutations: {
        // 数据同步   设置Id
        setAttrs(state, item) {
            console.log(item)
            state.menuItem = item;
        },
        //往menuItem添加数据
        pushData(state, data) {
            state.menuItem.push(data);
        },
        // 将匹配到对象,在menuItems数组中删除
        removeMenuItems(state, data) {
            state.menuItem.forEach((item, index) => {
                if (item == data) {
                    state.menuItem.splice(index, 1)
                }
            });
        },
        // 设置用户登录显示注册的邮箱号
        // setcurrentUser(state, data) {
        //     // console.log(data)
        //     if (data) {
        //         state.currentUserstatus = data
        //         state.isLogin = true
        //     } else {
        //         state.currentUserstatus = null
        //         state.isLogin = false
        //     }
        // }
        // 更改用户的状态信息
        userStatus(state, user) {
            if (user) {
                state.currentUserstatus = user
                state.isLogin = true
            } else {
                state.currentUserstatus = null
                state.isLogin = false
            }
        }

    },
    actions: {
        // 应用mutations
        setUser({ commit }, user) {
            commit("userStatus", user)
        }
    }
})