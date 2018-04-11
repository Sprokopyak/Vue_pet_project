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
        <img :src="formData.image" alt="">
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
                accountType: 'Teacher',
                image: null
            }
        }
    },
    methods: {
        signUp(){
            var me = this;
            firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password)
            .then((user)=> {
                if(user) {
                    user.updateProfile({
                        displayName: me.formData.name,
                    })
                    .then(()=>{
                        firebase.database().ref('users').child(user.uid).set({
                            name: me.formData.name,
                            email: user.email,
                            uid : user.uid,
                            avatar: me.formData.image,
                            accountType: me.formData.accountType
                        });
                        return firebase.storage().ref('users/' + user.uid).put(me.formData.image);
                    }) 
                    .then(fileData=>{
                        let image = fileData.metadata.downloadURLs[0];
                        return firebase.database().ref('users/').child(user.uid).update({avatar: image})
                    })
                    console.log("User is signed in.");
                } else {
                    console.log("No user is signed in.");
                }
            })
            .then(user=> {
                this.$router.push('/')
            })
            .catch((e)=>{
                alert('Oops'+e.message);
            })
        },

        onPickFile(){
            this.$refs.fileInput.click()
        },

        onFilePicked(event){
            const files = event.target.files;
            const fileReader = new FileReader();
            fileReader.addEventListener('load', ()=>{
                this.formData.image = fileReader.result
            })
             fileReader.readAsDataURL(files[0])
            this.formData.image = files[0]
        }
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