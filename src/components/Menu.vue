<template>
 <div class="row">
    <!-- 菜单 -->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>尺寸</th>
            <th>价格</th>
            <th>加入</th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.options.size">
          <tr>
            <td><strong>{{item.name}}</strong></td>
          </tr>
          <tr v-for="option in item.options" :key="option.size">
            <td>{{option.size}}</td>
            <td>{{option.price}}</td>
            <td>
              <button 
                @click="addToBasket(item,option)"
                class="btn btn-sm btn-outline-success">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 购物车 -->
    <div class="col-sm-12 col-md-4" v-if="baskets.length>0">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>数量</th>
            <th>品种</th>
            <th>价格</th>
          </tr>
        </thead>
        <tbody v-for="(shopInfo,index) in baskets" :key="index">
          <tr>
            <td>
              <!-- <button class="btn btn-sm" @click="sub(shopInfo.name,shopInfo.size)">-</button>
              <span>{{shopInfo.quantity}}</span>
              <button class="btn btn-sm" @click="add(shopInfo.name,shopInfo.size)">+</button> -->
              <button class="btn btn-sm" @click="sub(shopInfo)">-</button>
              <span>{{shopInfo.quantity}}</span>
              <button class="btn btn-sm" @click="add(shopInfo)">+</button>
            </td>
            <td>{{shopInfo.name}}</td>
            <td>{{shopInfo.price}}</td>
          </tr>
        </tbody>
      </table>
      <p>总价: {{total+"RMB"}}</p>
      <button class="btn btn-success btn-block">提交</button>
    </div>
    <div v-else>
        {{basketText}}
      </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
         baskets:[],
         basketText:"购物车没有任何商品",
         getMenuItems:{}
      }
    },
    created(){
      fetch("https://wd5037821354auavpu.wilddogio.com/menu.json")
          .then(res => {
            return res.json()
          })
          .then(data =>{
            this.getMenuItems = data
          })
    },
    computed:{
      total(){
        let totalCost = 0
        for(let index in this.baskets){
          let individualItem = this.baskets[index]
          totalCost += individualItem.quantity * individualItem.price
        }

        return totalCost
      }
    },
    methods:{
      addToBasket(item,option){
        // this.baskets.push({
        //   name:item.name,
        //   size:option.size,
        //   price:option.price,
        //   quantity:1
        // })
        // var flag = false;
        // for (var x in this.baskets){
        //   if(this.baskets[x].name === item.name&&this.baskets[x].size === option.size){
        //     this.add(item.name,option.size);
        //     flag = true
        //   }
        // }
        // if(!flag || this.baskets.length==0){
        //   this.baskets.push({
        //     name:item.name,
        //     size:option.size,
        //     price:option.price,
        //     quantity:1,
        //   })
        // }


        let basket = {
          name:item.name,
          size:option.size,
          price:option.price,
          quantity:1
        }

        if(this.baskets.length > 0){
          let result = this.baskets.filter( (basket) => {
            return (basket.name === item.name && basket.price === option.price)
          })
          if(result!=null&&result.length>0){
            result[0].quantity++
          }else{
            this.baskets.push(basket)
          }
        }else{
          this.baskets.push(basket)
        }
      },
      // add(val,size){
      //   for(var i in this.baskets){
      //     if(val!=null && val===this.baskets[i].name && size===this.baskets[i].size){
      //       this.baskets[i].quantity+=1;
      //     }
      //   }
      // },
      // sub(val,size){
      //   for(var i in this.baskets){
      //     if(val!=null && val===this.baskets[i].name && size===this.baskets[i].size){
      //       if(this.baskets[i].quantity<=0){
      //         this.baskets[i].quantity=0
      //       }else{
      //         this.baskets[i].quantity-=1;
      //       }
      //     }
      //   }
      // }

      add(item){
        item.quantity++;
      },
      sub(item){
        item.quantity--;
        if(item.quantity<=0){
         this.removebasket(item)
        }
      },
      // 当减减的值小于等于0的时候 购物车数组截取出一个
      removebasket(val){
        this.baskets.splice(this.baskets.indexOf(val),1)
      }
    }
  }
</script>
