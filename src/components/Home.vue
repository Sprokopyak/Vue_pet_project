<template>
<div >
    <div class="banner">
        <h1>Репетитор у Львові</h1>
        <p>Обирайте кращих викладачів на нашому сайті</p>
    </div>
           
  <div class="contact100-form-title">
        <div class="wrap-input100 filter">
            <span class="label-input100 filter-label"> Ціна від:</span>
            <input id="fromP" type="text" v-model.number="priceValueFrom" v-on:keyup="orderBy(priceValueFrom, 'price')" class="input100 input10">
        </div>

        <div class="wrap-input100 filter">
            <span class="label-input100 filter-label"> Ціна до:</span>
            <input id="toP"  type="text" v-model.number="priceValueTo" v-on:keyup="orderBy(priceValueTo, 'price')" class="input100 input10">
        </div>

        <div class="wrap-input100 filter">
            <span class="label-input100 filter-label"> Досвід від: </span>
            <input id="fromE" type="text" v-model.number="experienceValueFrom" v-on:keyup="orderBy(experienceValueFrom, 'experience')" class="input100 input10">
        </div>

        <div class="wrap-input100 filter">
            <span class="label-input100 filter-label"> Досвід до: </span>
            <input id="toE" type="text" v-model.number="experienceValueTo" v-on:keyup="orderBy(experienceValueTo, 'experience')" class="input100 input10">
        </div>

        <div class="wrap-input100 filter dropdown">
            <select id="priority" class="form-control form-control2" v-model="selectedDropdown" v-on:change="orderBy(selectedDropdown, 'level')">
                <option  v-for="item in dropDown" :key="item">{{item}}</option>
            </select>
        </div>
    </div>


    <div style="background-color:#F3F3F3; padding-top:20px">
    <div class="container ">
        <div class="row">
            <div class="col-sm-12" v-for="(user,key) in fireData" :key=key> 
                <div class="brdr bgc-fff pad-10 box-shad btm-mrg-20 property-listing" v-if="user.accountType === 'Teacher' ">
                    <div class="media">
                        <div class="img-block pull-left">
                            <img v-if="!user.avatar" alt="image" class="img img-responsive " src='../assets/man.jpg'>
                            <img v-if="user.avatar" alt="image" class="img img-responsive pull-left" :src='user.avatar'>
                        </div>

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

                            <ul style=" padding: 0" >
                                <p class="pull-left bold">Рівні підготовки: </p>
                                <li style="display: inline-block; margin-left: 5px" v-for="u in user.selected" :key=u> {{u}}, </li>
                            </ul>

                            <ul style=" padding: 0" >
                                <p style="display: inline-block" class="pull-left bold">Можливість проведення занятть: </p>
                                <li style="display: inline-block; margin-left: 5px" v-for="place in user.checkedPlace" :key=place> {{place}}, </li>
                            </ul>
                            <p><span class="bold"> Про репетитора: </span> {{user.description}} </p>
                            
                            <button class="btn btn-xs btn-primary" :disabled="editFormMode.includes(key) ? true : false" @click='editFormMode.push(key)'>Зв'язатись з репетитором</button> 
                            <router-link :to="/user/+ user.uid">
                                <button class="btn btn-xs btn-success ">Детальніше</button> 
                                </router-link>
                            
        
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
                </div>
            </div>
            <h1 v-if="fireData === null || fireData === '' || fireData.length === 0">За ваши запитом не знайдено жодного викладача</h1>
        </div>
    </div>
</div>
</div>    
</template>

<script>
export default {
    data () {
        return {
            fireData:null,
            editFormMode:[],
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
            dropDown: ['Репетитор для початківців', 'Рівень А1-А2 (Beginner, Elementary)', 'Рівень B1-B2 (Intermediate)', 'Рівень C1-C2 (Advanced, Proficiency)', 'Розмовна англійська', 'Ділова та бізнес мова', 'Університетські курси', 'Підготовка до вступу за кордон', 'До співбесіди в посольстві', 'TOEFL', 'IELTS'],
            selectedDropdown: '',    
        }
    },

    methods:{
        orderBy(value, s){
            if(s === 'price'){
                this.experienceValueFrom = 0;
                 this.experienceValueTo = 0;
                firebase.database().ref('users').orderByChild('price').startAt(this.priceValueFrom).endAt(this.priceValueTo).on('value',(snapshot)=>{
                    this.fireData = snapshot.val();
                });
            } else if( s === 'experience'){
                this.priceValueFrom = 0;
                this.priceValueTo = 0;
                 firebase.database().ref('users').orderByChild('experience').startAt(this.experienceValueFrom).endAt(this.experienceValueTo).on('value',(snapshot)=>{
                    this.fireData = snapshot.val();
                });
            } else if (s === 'level') {
                var me = this;
                var arr = [];
                firebase.database().ref('users/').once('value', (snapshot)=>{
                    snapshot.forEach(function(childSnapshot) {
                         let selectedArr = childSnapshot.val().selected
                         selectedArr.map((val) => {
                            if( val === value) {
                                arr.push(childSnapshot.val()); 
                            } 
                         })
                          me.fireData = arr;
                    })
                });
            }   
        },
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

        fetchFirebaseUserData(){
            var me =this;
            var db = firebase.database().ref('users');
            var lastKnownDomainValue = null;
            db.on('value', function(snapshot) {
                snapshot.forEach((childSnap) =>{
                    if(childSnap.val().price > me.priceValueTo){
                        me.priceValueTo = childSnap.val().price;
                    } 
                     if(childSnap.val().experience > me.experienceValueTo){
                        me.experienceValueTo = childSnap.val().experience;
                    }
                });
            });
            this.authUser = firebase.auth().currentUser; 
            db.on('value',(snapshot, t)=>{
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
.banner{
    background-image: url(../assets/banner2.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    height: 100vh;
    color: #fff;
    text-align: center;
}

.banner h1{
    padding-top: 260px;
    font-family: 'Barlow', sans-serif;
    font-weight: 900;
    font-size: 80px;
}

.banner p{
    font-size: 30px;
    padding-top: 20px;
}

.img-block{
    overflow: hidden;
    position: relative;
    background-size: cover;
    padding: 0 0 20%;
    padding-top: 10px;
    max-height: 100px;
    max-width: 200px;
}

.media>.pull-left {
    padding-right: 30px;
}

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

.filter{
    display: inline-block;
    width: 90px;
    margin-left: 130px;
}

.filter:first-child{
    margin-left: 75px;
}

.dropdown{
    margin-left: 50px;
    width: 240px;
}

.filter-label{
    left: -135px;
      color: #fff;
}

.input10{
    color: #fff;
}

    .form-control2 {
        color: #fff;
        background-color: #938f8fb0;
    }

    .contact100-form-title::before {
        background-color: rgba(24, 26, 27, 0.86);
    }

</style>
