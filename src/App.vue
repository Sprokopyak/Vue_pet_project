<template>
<div id="app">
    <nav class="navbar navbar-inverse">
        <div class="container">
            <div class="navbar-header ">
                <router-link to="/" tag="a" class="navbar-brand">WebSiteName</router-link>
            </div>
            <ul class="nav navbar-nav">
                <li v-if="authUser">
                    <router-link :to="/user/ + userId" tag="a" class="navbar-brand">Мій профіль</router-link>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li v-if="!authUser">
                    <router-link to="/sign-up" tag="a"><span class="glyphicon glyphicon-user"></span> Зареєструватись</router-link>
                </li>
                
                <li v-if="!authUser">
                    <router-link to="/sign-in" tag="a" ><span class="glyphicon glyphicon-log-in"></span> Увійти</router-link>
                </li>
                <li v-if="authUser">
                    <a > Ви увійшли як: {{userName}}</a>
                    <!-- <a href="#">{{authUser.identifier}}</a> -->
                </li>
                <li v-if="authUser">
                    <a @click="logout"><span class="glyphicon glyphicon-log-in"></span> Вийти</a>
                    <!-- <a href="#">{{authUser.identifier}}</a> -->
                </li>
            </ul>
        </div>
    </nav>
    <router-view> </router-view>
</div>
</template>

<script>
export default {
    data(){
        return {
            authUser: null,
            userId: this.$route.params.id,
            userName: null,
        }
    },

    methods:{
        setAuthUser(){
            var me = this;
            this.authUser = firebase.auth().currentUser;
            if(this.authUser){
                this.userId = this.authUser.uid;
                this.userName = this.authUser.email;
            }
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
.navbar {
    border-radius: 0;
    margin-bottom: -70px;
    background-color:rgba(23, 24, 23, 0.58);
    color: #000 !important;
    border: 0;
}
.navbar-inverse .navbar-nav>li>a {
    color: #ffffff;
    cursor: pointer;
}

.navbar-inverse .navbar-nav>li>a:hover {
    color: #b8b6b6;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>