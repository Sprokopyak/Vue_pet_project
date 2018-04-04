<template>
    <div class="container">
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
    data () {
        return {
            formData:{
                name: '',
                email:'',
                password:''
            }
        }
    },
    methods: {
        signUp(){
            var me = this;
            firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password)
            .then(user=> {
                this.$router.replace('/hello')
            })
            .then(()=> {
                firebase.auth().onAuthStateChanged(function(user) {
                    if(user) {
                        user.updateProfile({
                            displayName: me.formData.name,
                            photoURL: `http://www.gravatar.com/avatar/`
                        }).then(()=>{
                            firebase.database().ref('users').child(user.uid).set({
                                name: user.displayName,
                                email: user.email,
                                uid : user.uid,
                                avatar: user.photoURL
                            });
                        })
                        console.log("User is signed in.");
                    } else {
                        console.log("No user is signed in.");
                    }
                });

            })
            .catch((e)=>{
                alert('oops'+e.message);
            })
        },
    },

    created(){
        
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