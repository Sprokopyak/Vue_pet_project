<template>
<div id="app">
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/" tag="a" class="navbar-brand">WebSiteName</router-link>
            </div>
            <ul class="nav navbar-nav">
                <li v-if="authUser">
                    <router-link :to="/user/ + userCurrent" tag="a" class="navbar-brand">Profile</router-link>
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
            fireData:null,
            userCurrent: null,
            userName: null,
        }
    },

    // watch:{
    //     '$route':'setAuthUser'
    // },

    methods:{
        setAuthUser(){
            var me = this;
            this.authUser = firebase.auth().currentUser;
            if(this.authUser){
                var userId = this.authUser.uid;
                this.userCurrent = userId
                return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                me.userName  = snapshot.val().name || 'Anonymous';
                        console.log(snapshot.val())
                });
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
        },
        fetchFirebaseUserData(){
            firebase.database().ref('/users/').on('value',(snapshot)=>{
                console.log(snapshot.val())
            });
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