<template>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">You can take picture with camera on this web application</p>
            <a href="#" class="btn btn-outline-primary"><router-link to='/takepicture'>Take picture</router-link></a>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">Choose you file on your device</p>
            <a href="#" class="btn btn-outline-primary"><router-link to='/choosefile'>Choose File</router-link></a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {

  }
</script>