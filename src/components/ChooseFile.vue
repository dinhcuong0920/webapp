<template>
    <div class="row">
        <div class="col-sm-6">
            <form>
                <button type="button" class="btn btn-outline-primary">
                    <router-link to='/'>Home</router-link>
                </button>
                <div class="form-group">
                    <label for="exampleInputEmail1">Your Face</label>
                    <input type="file" class="form-control" @change="chooseFace" id="">
                    <div>
                        <img class="img-thumbnail" width="200px" height="200px" v-if="faceImage" :src="faceImage" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Passport</label>
                    <input type="file" class="form-control" @change="choosePassPort" id="">
                    <div>
                        <img class="img-thumbnail" width="200px" height="200px" v-if="passPortImage"
                            :src="passPortImage" />
                    </div>
                </div>
                <div class="form-group form-check">
                </div>
                <button @click="uploadImage" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data: function () {
            return {
                faceImage: null,
                passPortImage: null,
                files: {
                    face: null,
                    pasport: null
                },
            }
        },

        mounted() {

        },

        methods: {
            chooseFace(e) {
                let file = e.target.files[0];
                this.files.face = file;
                this.faceImage = URL.createObjectURL(file)
            },

            choosePassPort(e) {
                let file = e.target.files[0];
                this.files.pasport = file
                this.passPortImage = URL.createObjectURL(file)
            },

            async uploadImage() {
                let url = "http://";
                let formData = new FormData;
                formData.append('files', this.files)
                try {
                    await axios.post(url, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(function (response) {
                            console.log(response)

                        }).catch(function (err) {
                            console.log(err)
                        })
                } catch (err) {
                    console.log(err)
                } finally {
                    this.faceImage = null;
                    this.passPortImage = null;
                    this.files.face = null;
                    this.files.pasport = null;
                    let form = document.querySelector('form')
                    form.reset()
                    alert("Success to sent request")
                }

            }
        }
    }
</script>