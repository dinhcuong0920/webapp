<template>
  <div class="modal fade show" id="token-modal" tabindex="-1" role="dialog"
    style="display: none; padding-right: 17px;" aria-modal="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">
            Token
          </h4>
          <button type="button" class="close" data-toggle="modal" data-target="#token-modal">
            <span aria-hidden="true"><i class="fal fa-times"></i></span>
          </button>
        </div>
        <div class="modal-body">
          <textarea name="" id="" cols="100" rows="10" v-model="token" class="form-control"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary waves-effect waves-themed" data-toggle="modal"
            data-target="#token-modal">Close</button>
          <button type="button" class="btn btn-primary waves-effect waves-themed" @click="submit()">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {
        token: null
      }
    },
    methods: {
      submit() {
        if (this.token) {
          this.$emit('setToken', this.token)
          this.token = null
          $('button.btn-secondary').click()
        }
      }
    },
  }

</script>
