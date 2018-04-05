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
                <div v-if="user.accountType === 'Teacher'">
                    <h2>User name: {{user.name}}</h2> 
                    <h3>User email: {{user.email}}</h3>
                    <img :src="user.avatar">
                    <button class="btn btn-xs btn-primary" @click='editFormMode.push(key);'>Edit</button> 
                     <br>
                    <br>
                    <input v-if='editFormMode.includes(key)' type="text" v-model='editingUser[key]' @keyup.enter='editUser(key)' class="form-control">
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
            editFormMode:[]
        }
    },
    methods:{
        editUser(key){
            console.log(key) 
            firebase.database().ref('users/'+ key).update({ 
                name: this.editingUser[key]
            })
            .then((data)=>{
                this.editingMovie[key]=null;
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
