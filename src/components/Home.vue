<template>
<div class="container">
    <div class="row">
        <!-- <div class=" col-md-6 col-md-offset-3">
            <input placeholder="add movie" @keyup.enter="addMovie" type="text" v-model="movie" class="form-control">  
            <ul>
                <li v-for="(movie,key) in fireData" :key=key >
                <h2>{{movie.name}}</h2>
                <button class="btn btn-xs btn-primary" @click='editFormMode.push(key);'>Edit</button> 
                <button class="btn btn-xs btn-danger" @click='deleteMovie(key);'>Delete</button> 
                <br><br>                
                <input v-if='editFormMode.includes(key)' type="text" v-model='editingMovie[key]' @keyup.enter='editMovie(key)' class="form-control">
                </li>
            </ul>
        </div> -->
         <div class=" col-md-6 col-md-offset-3">
        <ul>
            <li v-for="(user,key) in fireData" :key=key >
                <p v-for="(u,key) in user.registered" :key=key>
                            <span>{{u.title}}</span>
                        </p>
                <div v-if="user.accountType === 'Teacher'">
                    <router-link :to="/user/+ user.uid">
                    <p>{{key}}</p>
                    <h2>User name: {{user.name}}</h2> 
                    <h3>User email: {{user.email}}</h3>
                     </router-link>
                     <img :src="user.avatar">
                     <button class="btn btn-xs btn-primary" @click='editFormMode.includes(key) ? editFormMode.pop() : editFormMode.push(key)'>Замовити репетитора</button>
                     <div v-if='editFormMode.includes(key)' class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">
                        <input type="text"  class="form-control" placeholder="Ім'я">
                        <br>
                        <input type="number" class="form-control" placeholder="Номер телефону">
                        <br>
                        <button class="btn btn-success" @click='bookTeacher(key)'>Замовити</button>
                    </div>
                    <button class="btn btn-xs btn-primary" @click='editFormMode.push(key)'>Edit</button> 
                     <br>
                    <br>
                    <!-- <input v-if='editFormMode.includes(key)' type="text" v-model='editingUser[key]' @keyup.enter='editUser(key)' class="form-control"> -->
                </div>
            </li>
        </ul>
         </div>
    </div>
</div>    
</template>

<script>
export default {
    data () {
        return {
            movies:[],
            fireData:null,
            editingUser:[],
            editFormMode:[],
            book: true
        }
    },
    methods:{
        bookTeacher(key){
            console.log(key)
             let newWorkout = {
                title: 'title1'
            }
             firebase.database().ref('users/' + key).child("registered").push(newWorkout) 
           
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

        deleteMovie(key){
            firebase.database().ref('movies/' + key).remove();
        },

        fetchFirebaseUserData(){
            firebase.database().ref('users').on('value',(snapshot)=>{
                this.fireData = snapshot.val();
            });
        }
    },

    created(){
        this.fetchFirebaseUserData();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
</style>
