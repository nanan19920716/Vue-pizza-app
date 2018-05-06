<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- new pizza -->
      <app-new-pizza></app-new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
      <!-- 品种展示 -->
      <h3 class="text-muted my-5">菜单</h3>
      <table class="table">
        <thead class="table table-default">
          <tr>
            <th>品种</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td>{{item.name}}</td>
            <td>
              <button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
 import NewPizza from './NewPizza.vue'
  export default{
    components:{
      'app-new-pizza':NewPizza
    },
    data(){
      return{
        // getMenuItems:[]
      }
    },
    // beforeRouteEnter: (to, from, next) => {
    //   // alert('hello'+ this.msg);
    //   next(vm =>{
    //     alert('hello'+ vm.msg);
    //   })
    // },
    // beforeRouteLeave (to, from , next) {
    //   if(confirm("确定离开吗?") == true){
    //     next()
    //   }else{
    //     next(false)
    //   }
    // }
    computed:{
      getMenuItems:{
        get(){
          return this.$store.state.menuItem
        },
        set(){

        }
      }
    },
     created(){
      fetch("https://wd5037821354auavpu.wilddogio.com/menu.json")
          .then(res => {
            return res.json()
          })
          .then(data => {
            // console.log(data)
            let menuArray = []
            for(let key in data){
              // console.log(key)
              // console.log(data[key])
              data[key].id = key
              menuArray.push(data[key])
            }
            // this.getMenuItems = menuArray
            this.$store.commit("setAttrs",menuArray)
          })
    },
    methods:{
      deleteData(item){
        console.log(item.id)
        fetch("https://wd5037821354auavpu.wilddogio.com/menu/"+item.id+"/.json",{
          method:"DELETE",
          headers:{
            'Content-type':'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          this.$store.commit('removeMenuItems',item)
        })
        .catch(err => console.log(err))
      }
    }
  }

</script>