<template>
<div class="bg-container-contact100">
	<div class="container-contact100">
		<div class="wrap-contact100">
			<div class="contact100-form-title">
				<span>Увійти</span>
			</div>

            <form class="contact100-form" @submit="signIn">
				<div class="wrap-input100">
					<span class="label-input100">Ваш емейл:</span>
					<input class="input100 " type="email" required v-model="formData.email" placeholder="Ваш емейл">
				</div>

				<div class="wrap-input100">
					<span class="label-input100">Ваш пароль:</span>
					<input class="input100" type="password" required v-model="formData.password" placeholder="Ваш пароль">
				</div>

				<div class="container-contact100-form-btn">
					<input type="submit" class="contact100-form-btn" value="Увійти">
				</div>
			</form>
		</div>
	</div>
</div>
</template>

<script>
export default {
    data () {
        return {
            formData:{
                errors:[],
                email: null,
                password: null
            }
        }
    },
    methods: {
        signIn(e){   
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(this.formData.email,this.formData.password)
            .then((user)=>{
                this.$router.replace('/hello')
            })
            .catch((e)=>{
                alert(e.message)
            })
        }
    },
    
    beforeRouteEnter(to, from, next){
        if(firebase.auth().currentUser){
            next(false);
            this.$router.push('/')
        } else{
             next();
        }
    }
}
</script>