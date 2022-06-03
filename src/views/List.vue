<template>
  <div class="text-red">
    <h1 class="title text-dark text-center">Profile</h1>
    <b-alert show variant="danger" dismissible v-if="!profile_status">
      ไม่สามารถเชื่อมต่อกับระบบไลน์ได้
    </b-alert>
    <div>
      <b-table responsive striped hover stacked bordered :items="items"></b-table>
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
      pictureUrl: '',
      statusMessage: ''
    },
    image: '',
    //toastCount: 0
    showDismissibleAlert: true,
    items: [
      { 'User ID': '-', 'Display Name': '-', 'Picture URL': '-', 'Status Message': '-' },
    ],
    profile_status : false
  }),
  created () {
  },
  mounted(){
    //this.getImage()
  },
  methods: {
    checkUser () {
      let _this = this
      this.$liff.getProfile().then(function (profile) {
        this.profile_status = true
        _this.profile = profile
      }).catch(function () {
        _this.$toast.error('ไม่สามารถเชื่อมต่อกับระบบไลน์ได้', {
          position: 'top'
        })
      })
    },
    getProfile () {
      let _this = this
      this.$liff.getProfile().then(function (profile) {
        this.profile_status = true
        _this.profile = profile
      }).catch(function () {
        //alert('Error getting profile: ' + error)
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
    async getListExpense(){
      await HTTP.get('api/list-expense')
      .then(res => {
        //console.log(res)
        if (res.data.status) {
          console.log(res)
          this.image = res.data.url
        }
      }).catch(e => {
        console.log(e);
      })
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
