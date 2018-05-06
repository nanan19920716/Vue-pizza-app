import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        menuItem: {}
    },
    getter: {

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

    },
    actions: {

    }
})