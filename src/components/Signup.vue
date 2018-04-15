<template>
    <div class="container">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">
            <h3>Реєстрація</h3>
            <br>
            <input type="text" v-model="formData.name" class="form-control" placeholder="Ім'я">
            <br>
            <input type="email" v-model="formData.email" class="form-control" placeholder="Емейл">
            <br>
            <input type="password" v-model="formData.password" class="form-control" placeholder="Пароль">
            <br>
            <label for="img">Виберіть зображення:    </label>   
            <input id="img" type="file" ref="fileInput" accept="image/*" @change="onFilePicked">
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
            <span v-if="formData.accountType === 'Teacher'">
                <label for="price"> Вартість заняття грн/год:</label>
                <input id="price"  v-model.number="formData.price" class="form-control" type="number">
                <br>
                <label for="experience"> Ваш досвід роботи (років): </label>
                <input id="experience" v-model.number="formData.experience" class="form-control" type="number">
                <br>
                <label for="priority">Рівні підготовки студента:</label>
                <select id="priority" class="form-control" v-model="selectedDropdown" v-on:change="setModel(selectedDropdown)">
                    <option v-for="item in dropDown" :key="item">{{item}}</option>
                </select>
                <ul v-if="formData.selected.length !== 0">
                    <li v-for="(val, key) in formData.selected" :key="val">
                        <p style="float: left; margin: 10px 0">{{val}}</p>
                        <button style="margin: 10px" class="btn btn-xs btn-danger" @click='deleteVal(key, val);'>Delete</button> 
                    </li>
                </ul>
                <br>
                <label>Місце проведення занятть:
                    <input type="checkbox" id="stud" value="В учня" v-model="formData.checkedPlace">
                    <label for="stud"> В учня </label>
                    <input type="checkbox" id="teach" value="В репетитора" v-model="formData.checkedPlace">
                    <label for="teach"> В репетитора</label>
                    <br>
                </label>
                <br>
                <br>
                <textarea class="form-control" rows="5" v-model="formData.description" placeholder="Коротко про себе"></textarea>
                <br>
            </span>
            <button class="btn btn-success" @click="signUp">Зареєструватись</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dropDown: ['Репетитор для початківців', 'Рівень А1-А2 (Beginner, Elementary)', 'Рівень B1-B2 (Intermediate)', 'Рівень C1-C2 (Advanced, Proficiency)', 'Розмовна англійська', 'Ділова та бізнес мова', 'Університетські курси', 'Підготовка до вступу за кордон', 'До співбесіди в посольстві', 'TOEFL', 'IELTS'],
            selectedDropdown: '',
            formData:{
                name: '',
                email:'',
                password:'',
                accountType: 'Student',
                image: null,
                price: 0,
                experience: 0,
                checkedPlace: [],
                selected: [],
                description: null
            }
        }
    },
    methods: {
        setModel: function (e) {         
            for(var i in this.dropDown){
                if(this.dropDown[i]===e){
                    this.formData.selected.push(e);
                    this.dropDown.splice(i,1);
                    break;
                }
            }
        },

        deleteVal(key, val){
            this.dropDown.push(val)
            this.formData.selected.splice(key,1);
        },

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
                            accountType: me.formData.accountType,
                            price: me.formData.price,
                            experience: me.formData.experience,
                            checkedPlace: me.formData.checkedPlace,
                            selected: me.formData.selected,
                            description: me.formData.description
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