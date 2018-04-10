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
            <span>Зареєструватись як:</span>  
             <label for="teacher"> 
                        <input type="radio" id="teacher" value="Teacher" v-model="formData.accountType"> Репетитор 
                    </label>
                    <label for="student">
                        <input type="radio" id="student" value="Student" v-model="formData.accountType"> Студент
                    </label>
            <br>
             <br>
             <input type="file" ref="fileInput" accept="image/*" @change="onFilePicked">
              <br>
              <br>
            <button class="btn btn-success" @click="signUp">SignUp</button>
        </div>
        <img :src="formData.photoURL" alt="">
    </div>
</template>

<script>
export default {
    data () {
        return {
            formData:{
                name: '',
                email:'',
                password:'',
                photoURL:'',
                accountType: 'Teacher',
                image: null
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
                    // if(!me.formData.image){
                    //     return;
                    // }
                    if(user) {
                        user.updateProfile({
                            displayName: me.formData.name,
                            photoURL: `http://www.gravatar.com/avatar/`
                        }).then(()=>{
                            const uId = user.uid;
                            firebase.database().ref('users').child(user.uid).set({
                                name: user.displayName,
                                email: user.email,
                                uid : user.uid,
                                // avatar: me.formData.photoURL,
                                avatar: me.formData.image,
                                accountType: me.formData.accountType
                            });
                            return uId
                        }).then(key=>{
                            console.log(key)
                            return firebase.storage().ref('users/' + key).put()
                        }).then(fileData=>{
                            let image = fileData.metadata.downloadURLs[0];
                            return firebase.database().ref('users/').child(uId).update({avatar: image})
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
        onPickFile(){
            this.$refs.fileInput.click()
        },
        onFilePicked(event){
            const files = event.target.files;
            let filename = files[0].name;
            if(filename.lastIndexOf('.')<=0){
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader();
            fileReader.addEventListener('load', ()=>{
                this.formData.photoURL=fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.formData.image= files[0]
        }
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