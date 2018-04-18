<template>
<div id="app">
    <nav class="navbar navbar-inverse">
        <div class="container">
            <div class="navbar-header ">
                <router-link to="/" tag="a" class="navbar-brand">Головна</router-link>
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
     z-index: 22;
    border-radius: 0;
    background-color:rgba(23, 24, 23, 0.58);
    color: #000 !important;
    border: 0;
    padding: 10px;
    width: 100%;
    position: absolute;
}

.h1, .h2, .h3, h1, h2, h3 {
    margin-top: 0px;
    margin-bottom: 10px;
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

 /* Sign up and sign in styles */
.bg-container-contact100{
        background-image: url(assets/bg-01.jpg);
            width: 100%;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            z-index: 1;
            top: 0;
            left: 0;
    }

    .contact100-form-title{
        background-image: url(assets/bg-03.jpg)
    }

.contact100-form-title::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(54,84,99,0.7);
}

.container-contact100 {
    width: 100%;
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background:  rgba(70, 60, 60, 0.54);
    position: relative;
    z-index: 10;
}

.wrap-contact100 {
    width: 610px;
    background: #fff;
    border-radius: 3px;
    position: relative;
    margin-top: 40px;
}

.contact100-form-title {
    font-family: Montserrat-Bold;
    font-size: 30px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    width: 100%;
    min-height: 128px;
    position: relative;
    z-index: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    overflow: hidden;
    padding: 30px 15px 30px 15px;
}

.contact100-form {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 43px 88px 57px 190px;
}

.validate-input {
    position: relative;
}

.wrap-input100 {
    width: 100%;
    position: relative;
    border-bottom: 1px solid #b2b2b2;
    margin-bottom: 26px;
}

.label-input100 {
    font-family: Poppins-Regular;
    font-size: 15px;
    color: #808080;
    line-height: 1.2;
    text-align: right;
    position: absolute;
    top: 14px;
    left: -150px;
    width: 130px;
}

input.input100 {
    height: 45px;
}

.input100 {
    font-family: Poppins-Regular;
    font-size: 15px;
    color: #555555;
    line-height: 1.2;
    display: block;
    width: 100%;
    background: transparent;
    padding: 0 5px;
}

input, textarea {
    outline: none;
    border: none;
}

.container-contact100-form-btn {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    padding-top: 8px;
}

.contact100-form-btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-width: 160px;
    height: 50px;
    background-color: #57b846;
    border-radius: 25px;
    font-family: Poppins-Regular;
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}

textarea.input100 {
    box-sizing: border-box;
    padding-top: 15px;
    height: 90px;
}

button {
    outline: none !important;
    border: none;
    background: transparent;
}
</style>