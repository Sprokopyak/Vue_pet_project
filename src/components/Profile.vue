<template>
    <div class="container">
        <p>{{userId}}</p>
        <div class=" col-md-6 col-md-offset-3" v-if="fireData !== null">
            <h2>User name: {{fireData.name}}</h2> 
            <h3>User email: {{fireData.email}}</h3>
            <img :src="fireData.avatar">
            <button v-if="currentUserId === userId" class="btn btn-xs btn-primary" @click='editFormMode.push(fireData.uid);'>Edit</button> 
            <br>
            <br>
            <input v-if='editFormMode.includes(fireData.uid)' type="text" v-model='editingUser[fireData.uid]' @keyup.enter='editUser(fireData.uid)' class="form-control">
        </div>
        
        <div v-for="(val, key) in studentContact" :key="key" v-if="currentUserId === userId">
            <p>{{val.name}}</p>
            <p>{{val.phone}}</p>
            
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            fireData:null,
            userId: this.$route.params.id,
            currentUserId: null,
            editingUser:[],
            editFormMode:[],
            users: null,
            studentContact: null
        }
    },
    watch: {
        '$route'(to, from) {
            this.userId = to.params.id;
            this.setAuthUser()
        },
    },
    
    methods:{
        setAuthUser(){
            var me = this
            this.currentUserId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/' + this.userId).once('value').then(function(snapshot) {
                me.fireData = snapshot.val();
                me.studentContact=  me.fireData.studentContact
            });
            firebase.database().ref('users').on('value',(snapshot)=>{
                this.users = snapshot.val();
            })     
        },
         editUser(key){
            console.log(key) 
            firebase.database().ref('users/'+ key).update({ 
                name: this.editingUser[key]
            })
            .then((data)=>{
                this.editingUser[key]=null;
                this.editFormMode=[];
            })
        },
    },
     created(){
        this.setAuthUser();
    }
}
</script>
