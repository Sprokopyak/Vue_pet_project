<template>
<div>
    <!-- <div class="row"> -->
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
         <!-- <div class=" col-md-6 col-md-offset-3">
        <ul>
            <li v-for="(user,key) in fireData" :key=key >
                <p v-for="(u,key) in user.registered" :key=key>
                            <span>{{u.title}}</span>
                        </p>
                <div v-if="user.accountType === 'Teacher'">
                    <router-link :to="/user/+ user.uid">
                    <p>{{key}}</p>
                    <h2>User name: {{user.name}}</h2> 
                    <h3>User email: {{user.email}}</h3>
                     </router-link>
                     <img :src="user.avatar">
                     <button class="btn btn-xs btn-primary" @click='editFormMode.includes(key) ? editFormMode.pop() : editFormMode.push(key)'>Замовити репетитора</button>
                     <div v-if='editFormMode.includes(key)' class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">
                        <input type="text"  class="form-control" placeholder="Ім'я">
                        <br>
                        <input type="number" class="form-control" placeholder="Номер телефону">
                        <br>
                        <button class="btn btn-success" @click='bookTeacher(key)'>Замовити</button>
                    </div>
                    <button class="btn btn-xs btn-primary" @click='editFormMode.push(key)'>Edit</button> 
    
                </div>
            </li>
        </ul>
         </div>
    </div> -->









<div class="container-fluid" style="background-color:#F3F3F3">
    <div class="container container-pad" id="property-listings">
        <div class="row">
            <div class="col-md-12">
            <h1>Репетитор у Львові</h1>
            <p>Обирайте кращих викладачів на нашому сайті</p>
            </div>

      
<div>
    <label for="from"> Ціна від:
         <input id="from" type="number" v-model.number="priceValueFrom" v-on:keyup="orderBy(priceValueFrom, 'price')" class="form-control">
    </label>
    <label for="to"> Ціна до:
         <input v-model.number="priceValueTo" v-on:keyup="orderBy(priceValueTo, 'price')" id="to" type="number" class="form-control">
    </label>

    <label for="from"> Досвід від:
         <input id="from" type="number" v-model.number="experienceValueFrom" v-on:keyup="orderBy(experienceValueFrom, 'experience')" class="form-control">
    </label>
    <label for="to"> Досві до:
         <input v-model.number="experienceValueTo" v-on:keyup="orderBy(experienceValueTo, 'experience')" id="to" type="number" class="form-control">
    </label>
   
</div>

            <div class="col-sm-12" v-for="(user,key) in fireData" :key=key> 

                <div class="brdr bgc-fff pad-10 box-shad btm-mrg-20 property-listing" v-if="user.accountType === 'Teacher' ">
                    <div class="media">
                        <img v-if="!user.avatar" alt="image" class="img-responsive pull-left" src='http://images.prd.mris.com/image/V2/1/Yu59d899Ocpyr_RnF0-8qNJX1oYibjwp9TiLy-bZvU9vRJ2iC1zSQgFwW-fTCs6tVkKrj99s7FFm5Ygwl88xIA.jpg'>
                        <img v-if="user.avatar" alt="image" class="img-responsive pull-left" :src='user.avatar'>
                        
                        <div class="media-body fnt-smaller clearfix ">
                            <h4> {{user.name}} 
                                <small class="pull-right"> 
                                <span class="glyphicon glyphicon-map-marker"></span> м. Львів | <span class="glyphicon glyphicon-usd"></span>
                                <span >{{user.price}} грн/год</span>
                                </small>
                            </h4>
                            <hr style="margin:10px 0">
                            
                            <p v-if="user.experience < 2"> <span class="bold">Досві роботи: </span> {{user.experience}} рік</p>
                            <p v-if="user.experience > 1"> <span class="bold">Досві роботи: </span> {{user.experience}} роки</p>
<router-link :to="/user/+ user.uid">
                            <ul style=" padding: 0" >
                                <p class="pull-left bold">Рівні підготовки: </p>
                                <li style="display: inline-block; margin-left: 5px" v-for="u in user.selected" :key=u> {{u}}, </li>
                            </ul>
</router-link>
                            <ul style=" padding: 0" >
                                <p style="display: inline-block" class="pull-left bold">Можливість проведення занятть: </p>
                                <li style="display: inline-block; margin-left: 5px" v-for="place in user.checkedPlace" :key=place> {{place}}, </li>
                            </ul>
                            <p><span class="bold"> Про репетитора: </span> {{user.description}} </p>
                            <button v-if="authUser.uid !== user.uid" class="btn btn-xs btn-primary" :disabled="editFormMode.includes(key) ? true : false" @click='editFormMode.push(key)'>Зв'язатись з репетитором</button> 
                            
                          
                            


                            <div class="modal-dialog " id="modal" v-if='editFormMode.includes(key)'>
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button aria-label="Close" class="close" type="button">
                                            <span aria-hidden="true" @click="editFormMode.pop()">×</span>
                                        </button>
                                        <h4 class="modal-title">Залиште свої контактні дані</h4>
                                    </div>
                                    <div class="modal-body">
                                        <input type="text"  class="form-control" placeholder="Ім'я" v-model="studentContact.name">
                                        <br>
                                        <input type="number" class="form-control" placeholder="Номер телефону" v-model="studentContact.phone">
                                        <br>
                                        <textarea class="form-control"  rows="4" placeholder="Що саме ви хотіли б вивчити?" v-model="studentContact.comment"></textarea>
                                        <br>
                                        <button class="btn btn-success" @click='bookTeacher(key)'>Відправити</button>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-dialog " id="modal" v-if='modalShow === true'>
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button aria-label="Close" class="close" type="button">
                                            <span aria-hidden="true" @click="closeModal">×</span>
                                        </button>
                                        <h4 class="modal-title">Дякуємо! Репетиртор зв'яжеться з вами найближчиш часом</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- End Listing-->
            </div>
        </div><!-- End row -->
    </div><!-- End container -->
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
            editFormMode:[],
            book: true,
            modalShow: false,
            studentContact: {
                name: null,
                phone: null,
                comment: null
            },
             authUser: null,
             priceValueFrom: 0,
             priceValueTo: 0,
             experienceValueFrom: 0,
             experienceValueTo: 0,
        }
    },
    methods:{
        orderBy(v, s){
            console.log(this.priceValueFrom, this.priceValueTo)
            if(s === 'price'){
                this.experienceValueFrom= 0;
                 this.experienceValueTo= 0;
                firebase.database().ref('users').orderByChild('price').startAt(this.priceValueFrom).endAt(this.priceValueTo).limitToFirst(3).on('value',(snapshot)=>{
                    this.fireData = snapshot.val();
                });
            } else if( s === 'experience'){
                this.priceValueFrom= 0;
                this.priceValueTo= 0;
                 firebase.database().ref('users').orderByChild('experience').startAt(this.experienceValueFrom).endAt(this.experienceValueTo).limitToFirst(3).on('value',(snapshot)=>{
                    this.fireData = snapshot.val();
                });
            }
            
        },
        // price(v){
        //     console.log(this.priceValueFrom, this.priceValueTo)
        //     firebase.database().ref('users').orderByChild("price").startAt(this.priceValueFrom).endAt(this.priceValueTo).limitToFirst(3).on('value',(snapshot)=>{
        //         this.fireData = snapshot.val();
        //         console.log(this.fireData)
        //     });
        // },
        bookTeacher(key){
             firebase.database().ref('users/' + key).child("studentContact").push(this.studentContact) 
             .then(()=>{
                this.editFormMode=[];
                this.modalShow= true;
                setTimeout(()=>{
                     this.modalShow= false;
                }, 4000)
             })
           
        },
        closeModal(){
            this.modalShow = false
        },

        editUser(key){
            console.log(key) 
            firebase.database().ref('users/'+ key).update({ 
                name: this.editingUser[key]
            })
            .then((data)=>{
                this.editingUser[key]=null;
                this.editFormMode=[];
            })
        },

        deleteMovie(key){
            firebase.database().ref('movies/' + key).remove();
        },

        fetchFirebaseUserData(){
            var me =this;
            var db = firebase.database().ref('users');
          
            
            var lastKnownDomainValue = null;
            db.on('value', function(snapshot) {
                snapshot.forEach(function(childSnap) {
                    if(childSnap.val().price > me.priceValueTo){
                        me.priceValueTo = childSnap.val().price;
                    } 
                     if(childSnap.val().experience > me.experienceValueTo){
                        me.experienceValueTo = childSnap.val().experience;
                    }
                });
            });


           
            this.authUser = firebase.auth().currentUser;
           
            db.limitToFirst(3).on('value',(snapshot, t)=>{
                this.fireData = snapshot.val();
              
               
            });
        }
    },

    created(){
        this.fetchFirebaseUserData();
       
    }
}
</script>
<style>
@keyframes alertAnim {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
#modal {
    -webkit-animation: 1s alertAnim forwards;
    animation: 1s alertAnim forwards;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999999;
}
.modal-content {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #999;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 6px;
    outline: 0;
    box-shadow: 0 3px 9px rgba(0,0,0,.5);
}

.bold{
    font-weight: bold;
}

ul li{
    list-style: none
}
/**** BASE ****/
body {
    color: rgb(56, 55, 55);   
}

/**** LAYOUT ****/
.container-pad {
    padding: 30px 15px;
}

/**** MODULE ****/
.bgc-fff {
    background-color: #fff!important;
}
.box-shad {
    -webkit-box-shadow: 1px 1px 0 rgba(0,0,0,.2);
    box-shadow: 1px 1px 0 rgba(0,0,0,.2);
}
.brdr {
    border: 1px solid #ededed;
}

/* Font changes */
.fnt-smaller {
    font-size: .9em;
}

/* Padding - Margins */
.pad-10 {
    padding: 10px!important;
}


.btm-mrg-20 {
    margin-bottom: 20px!important;
}

/**** MEDIA QUERIES ****/
@media only screen and (max-width: 991px) {
    #property-listings .property-listing {
        padding: 5px!important;
    }
    #property-listings .property-listing a {
        margin: 0;
    }
    #property-listings .property-listing .media-body {
        padding: 10px;
    }
}

@media only screen and (min-width: 992px) {
    #property-listings .property-listing img {
        max-width: 180px;
    }
}

</style>
