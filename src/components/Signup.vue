<template>
    <div class="row">
        <h2>Signup</h2>

        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">
            <input type="text" v-model="formData.name" class="form-control" placeholder="name">
            <br>
            <input type="email" v-model="formData.email" class="form-control" placeholder="email">
            <br>
            <input type="password" v-model="formData.password" class="form-control" placeholder="password">
            <br>
            <button class="btn btn-success" @click="signUp">SignUp</button>
        </div>

    </div>
</template>
<script>

    export default {
        name: 'Signup',
        data () {
            return {
                formData:{
                    name: '',
                    email:'',
                    password:'',
                    userRef: firebase.database().ref('user')
                }
            }
        },
        methods: {
            signUp(){
                var vm = this;
                firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password)
                    .then((user)=>{
                    
                        this.$router.replace('/hello')

                        user.updateProfile({
                            displayName: this.formData.name,
                            photoURL: `http://www.gravatar.com/avatar/`
                        })
                    
                    
                        //  .then(function(user){
                        //      var vm = this;
                        //      console.log(user)
                        //           return vm.formData.userRef.child(user.uid).set({
                        //             name: user.displayName,
                        //             avatar: user.photoURL
                        //           }) 
                        //  })
                    })
                     .then(function(){
                         var user = firebase.auth().currentUser;
                         var b = firebase.database().ref('user').child(user.uid).set({
                                name: user.displayName,
                                avatar: user.photoURL

                         })
                            console.log(user)
                            console.log(b)
                            return b
                            // vm.formData.saveUserToUsersRef(user).then(function(){
                            // })
                        })
                    .catch((e)=>{
                        alert('oops'+e.message);
                    })
            },
            saveUserToUsersRef(user){
                var vm = this
                return vm.formData.userRef.child(user.uid).set({
                    name: user.displayName,
                    avatar: user.photoURL
                })   
            },
        },

        created(){

        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
