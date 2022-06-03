<template>
  <div class="text-red">
    <h1 class="title text-dark text-center">Profile</h1>
    <b-alert show variant="danger" dismissible v-if="!profile_status">
      ไม่สามารถเชื่อมต่อกับระบบไลน์ได้
    </b-alert>
    <div class="row">
      <div class="col-12">
        <div class="img-profile-block mb-3">
            <img class="img-profile img-fluid mx-auto d-block" :src="profile.pictureUrl">
        </div>
      </div>
    </div>
    <div>
      <b-table responsive striped hover stacked bordered :items="items"></b-table>
    </div>
    <!--
      <div class="columns is-mobile">
        <div class="column is-half is-offset-one-quarter">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">User ID:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  {{ profile.userId || '-' }}
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Display Name:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  {{ profile.displayName || '-' }}
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Picture URL:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  {{ profile.pictureUrl || '-' }}
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Status Message:</label>
            </div>
            <div class="field-body">
              <div class="field is-narrow">
                <div class="control">
                  {{ profile.statusMessage || '-' }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      -->
    <br>
    <div class="row justify-content-center text-center">
      <div class="col-12 col-md-4" v-if="!user_status">
        <b-button variant="success d-block d-sm-inline w-100" @click="register()" class="mb-2">ลงทะเบียนใช้งาน</b-button>
      </div>
      <div class="col-12 col-md-4" v-else>
        <b-button variant="warning d-block d-sm-inline w-100" @click="updateProfile()" class="mb-2">อัพเดทโปรไฟล์</b-button>
      </div>
      <div class="col-12 col-md-4">
        <b-button variant="warning d-block d-sm-inline w-100" @click="getProfile()" class="mb-2">ppp</b-button>
      </div>
    </div>
    <div class="text-center">
      
      
      
      <!--
      <b-button variant="primary" @click="makeToast('primary')" class="mb-2">Primary</b-button>
      <b-button variant="secondary" @click="makeToast('secondary')" class="mb-2">Secondary</b-button>
      <b-button variant="danger" @click="makeToast('danger')" class="mb-2">Danger</b-button>
      <b-button variant="warning" @click="makeToast('warning')" class="mb-2">Warning</b-button>
      <b-button variant="success" @click="makeToast('success')" class="mb-2">Success</b-button>
      <b-button variant="info" @click="makeToast('info')" class="mb-2">Info</b-button>
      -->
    </div>
  </div>
</template>

<script>
import {HTTP} from '../axios'

export default {
  name: 'prifile',
  components: {
  },
  beforeCreate () {
    this.$liff.init({
        liffId: '1657176644-pl0qB1a7',
    })
  },
  data: () => ({
    profile: {
      userId: '',
      displayName: '',
      pictureUrl: 'img/default-user-profile.png',
      statusMessage: ''
    },
    image: '',
    //toastCount: 0
    showDismissibleAlert: true,
    items: [
      { 'User ID': this.profile.userId, 'Display Name': this.profile.displayName, 'Picture URL': this.profile.pictureUrl, 'Status Message': this.profile.statusMessage },
    ],
    profile_status : false,
    user_status : false
  }),
  created () {
    //this.getProfile ()
    //this.checkUser ()
  },
  mounted(){
    //this.getImage()
    this.getProfile ()
    this.checkUser ()
  },
  methods: {
    async checkUser(){
      await HTTP.post('api/check-user', this.profile)
      .then(res => {
        console.log(res)
        if (res.data.status) {
          this.user_status = true
        }
      }).catch(e => {
        console.log(e);
      })
    },
    getProfile () {
      let _this = this
      this.$liff.getProfile().then(function (profile) {
        _this.profile_status = true
        _this.profile = profile
        //_this.items = [_this.profile]
      }).catch(function (error) {
        alert('Error getting profile: ' + error)
      })
    },
    updateProfile () {
      this.$toast.warning('ยังไม่สามารถใช้งานได้', {
          position: 'top'
        })
    },
    async clickGetProfile () {
      let _this = this
      this.$liff.getProfile().then(function (profile) {
        this.profile_status = true
        _this.profile = profile
      }).catch(function () {
        _this.$toast.error('ไม่สามารถเชื่อมต่อกับระบบไลน์ได้', {
          position: 'top'
        })
        //alert('Error getting profile: ' + error)
        /*_this.$bvToast.toast(`ไม่สามารถเชื่อมต่อกับระบบไลน์ได้`, {
          title: 'BootstrapVue Toast',
          autoHideDelay: 5000,
          toaster: 'b-toaster-top-center',
        })*/
      })
    },
    /*async getImage(){
      await HTTP.get('api/test')
      .then(res => {
        //console.log(res)
        if (res.data.status) {
          console.log(res)
          this.image = res.data.url
        }
      }).catch(e => {
        console.log(e);
      })
    },*/
    register() {
      //this.$swal('Hello Vue world!!!');
      if(this.profile_status){
        this.$swal.fire({
          title: 'ยืนยันการลงทะเบียน?',
          showCancelButton: true,
          confirmButtonText: 'ตกลง',
          //confirmButtonColor:'',
          cancelButtonText: `ยกเลิก`,
          cancelButtonColor: 'red'
        }).then((result) => {
          if (result.isConfirmed) {
            //this.$swal.fire('Saved!', '', 'success')
            HTTP.post('api/register', this.profile)
            .then(res => {
              console.log(res)
              if (res.data.status) {
                this.$swal.fire('ลงทะเบียนสำเร็จ', '', 'success')
              }
              else{
                this.$swal.fire('ไม่สามารถทำรายการได้ กรุณาลองใหม่', '', 'warning')
              }
            }).catch(e => {
              //console.log(e);
              this.$swal.fire('มีบางอย่างผิดพลาด - ' +  e, '', 'error')
            })
          } else {
            //this.$swal.fire('Changes are not saved', '', 'info')
          }
        })
      }
      else{
        this.$swal.fire('ไม่สามารถเชื่อมต่อกับระบบไลน์ได้', '', 'warning')
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast('Toast body content', {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true,
        autoHideDelay: 5000,
        toaster: 'b-toaster-top-center',
      })
    }
  }
}
</script>
<style>
.img-profile {
  max-width: 150px!important;
  border-radius: 50%;
}
</style>