import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import firebase from 'firebase'

// Vue.config.productionTip = false

var config = {
    apiKey: "AIzaSyD3Rjn9nI1eHT74x0czICNGdShAV8GVPIk",
    authDomain: "my-project2-e2e7e.firebaseapp.com",
    databaseURL: "https://my-project2-e2e7e.firebaseio.com",
    projectId: "my-project2-e2e7e",
    storageBucket: "my-project2-e2e7e.appspot.com",
    messagingSenderId: "853779935094",
    storageBucket: 'gs://my-project2-e2e7e.appspot.com'
};

firebase.initializeApp(config);

window.firebase=firebase;

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged((user)=>{
    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    });
});