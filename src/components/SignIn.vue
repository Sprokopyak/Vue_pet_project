<template>
 
    <div class="bg-container-contact100">
	<div class="container-contact100">
		<div class="wrap-contact100">
			<div class="contact100-form-title">
				<span>Увійти</span>
			</div>

            <div class="contact100-form validate-form">
				<div class="wrap-input100 validate-input" data-validate="Name is required">
					<span class="label-input100">Ваш емейл:</span>
					<input class="input100" type="email" v-model="formData.email" placeholder="Ваш емейл">
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
					<span class="label-input100">Ваш пароль:</span>
					<input class="input100" type="password" v-model="formData.password" placeholder="Ваш пароль">
					<span class="focus-input100"></span>
				</div>

				<div class="container-contact100-form-btn">
					<button class="contact100-form-btn" @click="signIn">Увійти</button>
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
            formData:{
                email:'',
                password:''
            }
        }
    },
    methods: {
        signIn(){
            firebase.auth().signInWithEmailAndPassword(this.formData.email,this.formData.password)
            .then((user)=>{
                console.log(user.email)
                this.$router.replace('/hello')

            })
            .catch((e)=>{
                alert(e.message)
            })
        }
    }
}
</script>

<style>
    



    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 0 10px;
    }
</style>
