<template>
  <div class="modal fade show" id="token-modal" tabindex="-1" role="dialog" style="display: none; padding-right: 17px;"
    aria-modal="true">
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
          <nav>
            <div class="nav nav-tabs" role="tablist">
              <a class="nav-item nav-link active" id="token-fireant" data-toggle="tab" role="tab"
                aria-controls="nav-home" aria-selected="true" href="#nav-fireant">FireAnt Token</a>
              <a class="nav-item nav-link" id="token-simplize" data-toggle="tab" role="tab" aria-controls="nav-home"
                aria-selected="true" href="#nav-simplize">Simplize Token</a>
            </div>
          </nav>
          <div class="tab-content p-5">
            <div class="tab-pane fade active show" id="nav-fireant" role="tabpanel" aria-labelledby="nav-home-tab">
              <div class="row mb-2">
                <textarea name="" id="" cols="100" rows="10" v-model="data.token" class="form-control"></textarea>

              </div>
            </div>
            <div class="tab-pane fade" id="nav-simplize" role="tabpanel" aria-labelledby="nav-home-tab">
              <div class="row mb-2">
                <textarea name="" id="" cols="100" rows="10" v-model="data.tokenSimplize"
                  class="form-control"></textarea>
              </div>
            </div>
          </div>
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
        data: {
          token: null,
          tokenSimplize: null
        }
      }
    },
    methods: {
      submit() {
        if (this.data.token && this.data.tokenSimplize) {
          this.$emit('setToken', this.data)
          this.data = {}
          $('button.btn-secondary').click()
        }
      }
    },
  }
</script>