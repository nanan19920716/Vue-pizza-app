<template>
   <div class="row mt-3">
    <div class="col-md-12 col-lg-12">
      <div class="card">
        <div class="card-body">
          <img class="mx-auto d-block" src="../../src/assets/icon.png" alt="">
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label for="email">邮箱</label>
              <input 
                type="email"
                class="form-control"
                v-model="email"
                >
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input 
                type="password"
                class="form-control"
                v-model="password"
                >
            </div>
            <button type="submit" class="btn btn-block btn-success">登录</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
  export default{
    // beforeRouteEnter: (to, from, next) => {
    //   // this.$store.dispatch("setUser",null)
    //   next(vm => vm.$store.commit("setcurrentUser",null))
    // },

    // 控制退出之后的状态
    // 组件内的守卫
    beforeRouteEnter: (to, from, next) => {
      // this.$store.dispatch("setUser",null)
      next(vm => vm.$store.dispatch("setUser",null))
    },
    data(){
      return{
        email:'',
        password:''
      }
    },
    methods:{
      onSubmit(){
        axios.get('register/user.json')
            .then((res) =>{
              var data = res.data
              var result = [];    
              for(var key in data){
                 result.push(data[key]);
              }
              //过滤数组拿对应的值
              let persons=result.filter((el,index) =>{
                return el.email === this.email && el.password === this.password
              })
              // console.log(persons)
              if(result != null && result.length > 0){
                // this.$store.commit('setcurrentUser',persons[0].email)
                this.$store.dispatch("setUser",persons[0].email)
                this.$router.push({name:'homeLink'})
              }else{
                alert('账户或密码错误')
                // this.$store.commit('setcurrentUser',null)
                this.$store.dispatch("setUser",null)
              }
              // var flag = false
              // for(var resKey in result){
              //   if(this.email == result[resKey].email&&this.password == result[resKey].password){
              //     this.$router.push('/')
              //     flag = true
              //   }
              // }
              // if(!flag){
              //   alert('账户或密码错误')
              // }
            })
      }
    }
  }
</script>
