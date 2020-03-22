<template>
    <div class="row">
        <div class="col-sm-6">
            <button type="button" class="btn btn-outline-primary">
                <router-link to='/'>Home</router-link>
            </button>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Live Camera</h5>
                    <div id="full_creen" class="camera">
                        <video id="video" autoplay></video>
                    </div>
                </div>
                <div class="button_group">
                    <button class="swith" v-on:click="swithCamera()">Swith</button>
                    <button class="snap" v-on:click="snapShot()">SNAP</button>
                    <button class="full" v-on:click="fullScreen()">Full</button>
                </div>
            </div>
            <div class="card" style="margin-top:20px">
                <div class="card-body">
                    <h5 class="card-title">Your Image</h5>
                    <canvas class="preview"></canvas>
                </div>
                <button type="button" @click="uploadImage" class="btn btn-outline-primary">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import screenfull from 'screenfull';
    import axios from "axios"
    export default {
        name: 'TakePicture',
        components: {

        },
        data: function () {
            return {
                companies: [],
                currentFacingMode: 'user',
                file: null
            }
        },
        beforeMount() {
            this.cameraStream()
        },
        methods: {
            cameraStream: async function () {
                let constraints = {
                    video: {
                        facingMode: this.currentFacingMode,
                    },
                };
                if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                    navigator.mediaDevices
                        .getUserMedia(constraints)
                        .then(stream => {
                            console.log(constraints.video.facingMode)
                            const videoPlay = document.querySelector("video");
                            videoPlay.srcObject = stream;
                            videoPlay.play();
                        })
                } else {
                    alert("Cannot Get Media Device")
                }
            },

            async uploadImage() {
                let url = "http://";
                let formData = new FormData;
                formData.append('files', this.file)
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
                    alert(err)
                } finally {
                    this.file = null;
                    alert("Success to sent request")
                }

            },

        snapShot() {
            let video = document.getElementById("video");
            let canvas = document.querySelector("canvas");
            let context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
        },

        swithCamera() {
            if (this.currentFacingMode == 'environment') {
                this.currentFacingMode = 'user'
            } else {
                this.currentFacingMode = 'environment'
            }
            this.cameraStream()
        },

        fullScreen() {
            let element = document.getElementById('video')
            if (screenfull.isEnabled) {
                screenfull.toggle(element);
            }
        },


    },
    beforeDestroy() {}



    }
</script>

<style>
    .camera {
        width: 100%;
        height: 50%;
        box-sizing: border-box;
    }

    #video {
        position: relative;
        display: block;
        width: 100%;
        background-color: #171717;
    }

    .button_group {
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        display: flex;
        height: 50px;
        background-color: grey;
        opacity: 0.5;
        z-index: 100;
        margin-bottom: 20px;
        margin-right: 20px;
        margin-left: 20px;
    }

    .snap {
        display: inline-block;
        margin: auto;
        height: 50px;
        background-color: red;
        border: 1px solid #171717;
        outline: none;
        cursor: pointer;
        text-align: center;
    }


    .swith {
        position: absolute;
        display: inline-block;
        margin: 0 auto;
        height: 50px;
        background-color: red;
        border: 1px solid #171717;
        outline: none;
        cursor: pointer;
        bottom: 0px;
    }

    .full {
        position: absolute;
        display: inline-block;
        margin: 0 auto;
        height: 50px;
        background-color: red;
        border: 1px solid #171717;
        outline: none;
        cursor: pointer;
        right: 0px;
        bottom: 0px;

    }

    .snap:active {
        background-color: blue;
        z-index: 100;
    }

    .full:active {
        background-color: blue;
        z-index: 100;
    }

    .swith:active {
        background-color: blue;
        z-index: 100;
    }

    .picture {
        display: block;
        width: 100%;
        height: 50%;
        padding: 30px;
        box-sizing: border-box;
    }

    .picture canvas {
        display: block;
        width: 100%;
        margin: 0 auto;
        box-shadow: 4px 4px 12px 0px;
    }
</style>