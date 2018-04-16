<template>
    <div class="container">
        <div class=" col-md-8 col-md-offset-3" v-if="fireData !== null">
            <button v-if="authUser && currentUserId === userId" class="btn btn-xs btn-success pull-right " @click='editFormMode.push(fireData.uid)'>Редагувати профіль</button> 
             <img class="pull-left img-responsive" :src="fireData.avatar">
            <h2>Ім'я: {{fireData.name}}</h2> 
            <h3>Емейл: {{fireData.email}}</h3>
            <ul>
                <h3>Навики викладання:</h3>
                <li v-for="key in fireData.selected" :key="key" >{{key}}</li>
            </ul>
            <h3>Вартість заняття: {{fireData.price}} грн/год</h3>
            <h3>Досвід роботи: {{fireData.experience}} років</h3>
           
      
            <br>
            <br>
            <input v-if='editFormMode.includes(fireData.uid)' type="text" v-model='editingUser[fireData.uid]' @keyup.enter='editUser(fireData.uid)' class="form-control">
        
        <div>
            <h4> Студенти, які залишили свої контакті дані, щоб ви їм зателефонували: </h4> 
            <div v-for="(val, key) in studentContact" :key="key" v-if="currentUserId === userId" class="border">
            <button @click='deleteStudent(key)' aria-label="Close" type="button" class="close"><span aria-hidden="true">×</span></button>
                <p><span class="bold"> Ім'я студента: </span>{{val.name}}</p>
                <p><span class="bold">Номер телефону студента: </span>{{val.phone}}</p>
                <p><span class="bold">Що студент хоче вивчити: </span>{{val.comment}}</p>
            </div>
        </div>
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
            studentContact: null,
            authUser: null,
        }
    },
    watch: {
        '$route'(to, from) {
            this.userId = to.params.id;
            this.setAuthUser()
        },
    },
    
    methods:{
        deleteStudent(key){
            firebase.database().ref('users/' + this.userId + '/studentContact/' + key).remove();
            this.setAuthUser();
        },

        setAuthUser(){
            var me = this
            this.authUser = firebase.auth().currentUser;
            if( this.authUser){
                 this.currentUserId =  this.authUser.uid;
            }
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


<style>
    .border{
        border: 1px solid #000;
        border-radius: 5px;
        padding: 5px;
        margin: 5px 0;
    }

    .bold{
        font-weight: bold;
    }
</style>
