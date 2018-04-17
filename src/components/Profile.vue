<template>
<div>
    <div class="wrapper">
        <div class="wrapper2 mt">
            <span v-if="authUser && currentUserId === userId">Ваш дані </span>
            <span v-if="!authUser || currentUserId !== userId">Дані репетитора </span>
        </div>
        <div class="wrapper2 ">
            <p class="img-frame">
                  <img v-if="fireData !== null" class=" img-responsive" :src="fireData.avatar">
            </p>
        </div>
    </div>

   
    <div class="container information">
        <div class=" col-md-12 " v-if="fireData !== null">
            <h2>Ім'я: {{fireData.name}}</h2> 
             <h3>Навики викладання:
            <button v-if="authUser && currentUserId === userId && !editFormMode.includes(fireData.uid)" class="btn btn-xs btn-success pull-right " @click='editFormMode.push(fireData.uid)'>Редагувати</button> 
                 <select v-if='editFormMode.includes(fireData.uid)' id="priority" class="form-control" v-model="selectedDropdown" v-on:change="setMode(selectedDropdown)">
                        <option v-for="item in dropDown" :key="item">{{item}}</option>
                    </select>
                 <ul>
                    <li class="list" v-for="(val,key) in fireData.selected" :key="val" >{{val}}
                        <button v-if='editFormMode.includes(fireData.uid)' style="margin: 10px" class="btn btn-xs btn-danger" @click='deleteVal(key, val);'>Delete</button>
                    </li>
                </ul>
                <button v-if='editFormMode.includes(fireData.uid)' class="btn btn-xs btn-success " @click='editSelected'>Зберегти</button> 
             </h3>
            
            <h3>Вартість заняття: {{fireData.price}} грн/год
                    <button v-if="authUser && currentUserId === userId && !editFormMode.includes(fireData.uid)" class="btn btn-xs btn-success pull-right " @click='editFormMode.push(fireData.uid)'>Редагувати</button> 
                    <input v-if='editFormMode.includes(fireData.uid)' type="text" v-model='fireData.price' class="form-control mw">
                    <button v-if='editFormMode.includes(fireData.uid)' class="btn btn-xs btn-success " @click='editPrice'>Зберегти</button> 
            </h3>
            <h3>Досвід роботи: {{fireData.experience}} років
                <button v-if="authUser && currentUserId === userId && !editFormMode.includes(fireData.uid)" class="btn btn-xs btn-success pull-right " @click='editFormMode.push(fireData.uid)'>Редагувати</button> 
                <input v-if='editFormMode.includes(fireData.uid)' type="text" v-model='fireData.experience' class="form-control mw">
                <button v-if='editFormMode.includes(fireData.uid)' class="btn btn-xs btn-success " @click='editExperience'>Зберегти</button> 
            </h3>
            <h3>Про репетитора: {{fireData.description}}
                <button v-if="authUser && currentUserId === userId && !editFormMode.includes(fireData.uid)" class="btn btn-xs btn-success pull-right " @click='editFormMode.push(fireData.uid)'>Редагувати</button> 
                <textarea style="margin: 20px 0 10px 0" v-if='editFormMode.includes(fireData.uid)' type="text" v-model='fireData.description' class="form-control "></textarea>
                <button v-if='editFormMode.includes(fireData.uid)' class="btn btn-xs btn-success " @click='editDescription'>Зберегти</button> 
            </h3>
            <br>
            <br>
            <div v-if="currentUserId === userId">
                <h4> Студенти, які залишили свої контакті дані, щоб ви їм зателефонували: </h4>
                <div v-for="(val, key) in studentContact" :key="key" class="border">  
                <button @click='deleteStudent(key)' aria-label="Close" type="button" class="close"><span aria-hidden="true">×</span></button>
                    <p><span class="bold"> Ім'я студента: </span>{{val.name}}</p>
                    <p><span class="bold">Номер телефону студента: </span>{{val.phone}}</p>
                    <p><span class="bold">Що студент хоче вивчити: </span>{{val.comment}}</p>
                </div> 
            </div>
        </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return {
            dropDown: ['Репетитор для початківців', 'Рівень А1-А2 (Beginner, Elementary)', 'Рівень B1-B2 (Intermediate)', 'Рівень C1-C2 (Advanced, Proficiency)', 'Розмовна англійська', 'Ділова та бізнес мова', 'Університетські курси', 'Підготовка до вступу за кордон', 'До співбесіди в посольстві', 'TOEFL', 'IELTS'],
            selectedDropdown: '',
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
         deleteVal(key, val){
            this.fireData.selected.splice(key,1);
        },
        setMode: function (e) {     
            for(var i in this.fireData.selected){
                if(this.fireData.selected[i]===e){
                    this.fireData.selected.splice(i,1);
                    break;
                } else{
                    this.fireData.selected.push(e);
                    break;
                } 
            }
        },
        editSelected(){
            firebase.database().ref('users/'+  this.currentUserId).update({ 
                selected: this.fireData.selected
            })
            .then((data)=>{
                this.editFormMode=[];
                 this.setAuthUser();
            })
        },
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
         editPrice(){
            firebase.database().ref('users/'+  this.currentUserId).update({ 
                price: this.fireData.price
            })
            .then((data)=>{
                this.editFormMode=[];
                 this.setAuthUser();
            })
        },
        editExperience(){
            firebase.database().ref('users/'+  this.currentUserId).update({ 
                experience: this.fireData.experience
            })
            .then((data)=>{
                this.editFormMode=[];
                 this.setAuthUser();
            })
        },
        editDescription(){
            firebase.database().ref('users/'+  this.currentUserId).update({ 
                description: this.fireData.description
            })
            .then((data)=>{
                this.editFormMode=[];
                 this.setAuthUser();
            })
        }
    },
     created(){
        this.setAuthUser();
    }
}
</script>


<style >
    h3 ul li:first-child{
        padding-top: 10px;
    }
    .list{
        font-weight: normal;
        font-size: 18px;
        padding: 4px;
    }
    .mw{
        max-width: 300px;
        margin: 10px 0;
    }

    .information h3{
        border-bottom: 1px solid grey;
        padding: 5px 0;
        margin: 30px 0;
    }

    .wrapper{
        background-image: url(../assets/bg-03.jpg);
        height: 400px;
        position: relative;
        z-index: 1;
        background-repeat: no-repeat; 
        background-size: cover;
        background-position: center;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
         font-size: 40px;
        padding: 30px 15px 30px 15px;
        color: #fff;
    }

    .wrapper::before {
        content: "";
        display: block;
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(11, 12, 12, 0.7);
    }

    .mt{
        margin-top: 120px;
    }

    .wrapper2{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .img-frame{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #000;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 60px;
        background: #fff;
        text-align: center;
        min-width: 200px;
        min-height: 200px;
        max-width: 200px;
        max-height: 200px;
     
    }

    .information{
        margin-top: 80px;
    }

    .border{
        border: 1px solid #000;
        border-radius: 5px;
        padding: 5px;
        margin: 10px 0;
    }

     .border:last-child{
         margin-bottom: 40px;
     }

    .bold{
        font-weight: bold;
    }
</style>
