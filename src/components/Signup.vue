<template>

 <div class="bg-container-contact100">
	<div class="container-contact100">
		<div class="wrap-contact100">
			<div class="contact100-form-title">
				<span>Зареєструватись</span>
			</div>

            <div class="contact100-form validate-form">
				<div class="wrap-input100 validate-input">
					<span class="label-input100">Ім'я:</span>
					<input class="input100" type="text" name="name" v-model="formData.name" placeholder="Введіть ваше ім'я">
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input">
					<span class="label-input100">Емейл:</span>
					<input class="input100" type="text" name="email" v-model="formData.email"  placeholder="Введіть ваш емейл">
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input">
					<span class="label-input100">Пароль:</span>
					<input class="input100" type="password" name="password" v-model="formData.password" placeholder="Введіть ваш пароль">
					<span class="focus-input100"></span>
				</div>

                <div class="img-input validate-input">
					<span class="label-input100">Зображення:</span>
					<input class="input100" type="file" ref="fileInput" accept="image/*" @change="onFilePicked" name="img"  >
					<span class="focus-input100"></span>
				</div>

                <div class="wrap-input100 img-input validate-input">
					<span class="label-input100">Зареєструватись як:</span>
					<label for="teacher"> 
                        <input type="radio" id="teacher" value="Teacher" v-model="formData.accountType"> Репетитор 
                    </label>
                    <label for="student">
                        <input type="radio" id="student" value="Student" v-model="formData.accountType"> Студент
                    </label>
				</div>
                
                <div class="wrap-input100 validate-input" v-if="formData.accountType === 'Teacher'">
					<span class="label-input100">Вартість заняття:</span>
					<input class="input100" type="text" name="price" v-model.number="formData.price" placeholder="Введіть вартість заняття грн/год">
					<span class="focus-input100"></span>
				</div>

                <div class="wrap-input100 validate-input" v-if="formData.accountType === 'Teacher'">
					<span class="label-input100">Досвід роботи:</span>
					<input class="input100" type="text" name="experience" v-model.number="formData.experience" placeholder="Введіть ваш досвід роботи (роки)">
					<span class="focus-input100"></span>
				</div>
               
                <div class="wrap-input100 img-input validate-input" v-if="formData.accountType === 'Teacher'">
                    <span class="label-input100">Рівні підготовки студента:</span>
                    <select id="priority" class="form-control" v-model="selectedDropdown" v-on:change="setModel(selectedDropdown)">
                        <option v-for="item in dropDown" :key="item">{{item}}</option>
                    </select>
                    <ul v-if="formData.selected.length !== 0">
                        <li v-for="(val, key) in formData.selected" :key="val">
                            <p style="float: left; margin: 10px 0">{{val}}</p>
                            <button style="margin: 10px" class="btn btn-xs btn-danger" @click='deleteVal(key, val);'>Delete</button> 
                        </li>
                    </ul>
                </div>

                <div class="wrap-input100 img-input validate-input" v-if="formData.accountType === 'Teacher'">
					<span class="label-input100">Місце проведення занятть:</span>
					<label for="stud"> 
                        <input type="checkbox" id="stud" value="В учня" v-model="formData.checkedPlace"> В учня 
                    </label>
                    <label for="teach">
                        <input type="checkbox" id="teach" value="В репетитора" v-model="formData.checkedPlace"> В репетитора
                    </label>
				</div>

				<div class="wrap-input100 validate-input" v-if="formData.accountType === 'Teacher'">
					<span class="label-input100">Коротко про себе:</span>
					<textarea class="input100" name="message" placeholder="Кілька речень про себе"></textarea>
					<span class="focus-input100"></span>
				</div>

				<div class="container-contact100-form-btn">
					<button class="contact100-form-btn" @click="signUp">Зареєструватись</button>
				</div>
			</div>
		</div>
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
                price: '',
                experience: '',
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
.img-input{
    padding-top: 10px;
    border: 0;
    font-family: Poppins-Regular;
    font-size: 15px;
    color: #808080;
}

.img-input label{
        padding-right: 15px;
}
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
    }
</style>