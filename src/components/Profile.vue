<template>
    <div class="container">
        <div class=" col-md-6 col-md-offset-3" v-if="fireData !== null">
            <h2>User name: {{fireData.name}}</h2> 
            <h3>User email: {{fireData.email}}</h3>
            <img :src="fireData.avatar">
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            fireData:null
        }
    },
    methods:{
        setAuthUser(){
            var me = this
            var user = firebase.auth().currentUser;
            if(user){
                var userId = user.uid;
                return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
                        console.log(snapshot.val())
                         me.fireData = snapshot.val();
                });
            }
        },
    },
     created(){
        this.setAuthUser();
    }
}
</script>
