<template>
  <div id="app">

    <div class="navbar">
      <ul class="nav navbar-nav">

        <li>
           <router-link to="/">VueFire</router-link>
        </li>
        <li v-if="!authUser">
          <router-link to="/sign-in">SignIn</router-link>
        </li>

        <li v-if="!authUser">
          <router-link to="/sign-up">SignUp</router-link>
        </li>

        <li v-if="authUser">
          <a @click="logout"> Logout</a>
          <a href="#">{{authUser.identifier}}</a>
       </li>
      </ul>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <router-link to="/" tag="a" class="navbar-brand">WebSiteName</router-link>
    </div>
    <!-- <ul class="nav navbar-nav">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">Page 1</a></li>
      <li><a href="#">Page 2</a></li>
    </ul> -->
    <ul class="nav navbar-nav navbar-right">
       <li v-if="!authUser">
          <router-link to="/sign-up" tag="a"><span class="glyphicon glyphicon-user"></span> Зареєструватись</router-link>
        </li>
     

       <li v-if="!authUser">
          <router-link to="/sign-in" tag="a" ><span class="glyphicon glyphicon-log-in"></span> Увійти</router-link>
      </li>
      <li v-if="authUser">
          <a @click="logout"><span class="glyphicon glyphicon-log-in"></span> Вийти</a>
          <!-- <a href="#">{{authUser.identifier}}</a> -->
       </li>
    </ul>
  </div>
</nav>

    </div>


      <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      authUser:null
    }
  },
  watch:{
    '$route':'setAuthUser'
  },
  methods:{
    setAuthUser(){
      this.authUser=firebase.auth().currentUser;
    },
    logout(){
      firebase.auth().signOut()
        .then(()=>{
          this.$router.replace('/sign-in')
        })
        .catch((e)=>{
          alert(e.message)
        })
    }
  },
  created(){
    this.setAuthUser();
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>