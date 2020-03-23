<template>
    <div>
        <div class="row">
            <div class="col-sm-6">
                <button type="button" class="btn btn-outline-primary">
                    <router-link to='/'>Home</router-link>
                </button>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Live Camera</h5>
                        <div id="card-full" class="camera">
                            <video id="video" autoplay></video>
                            <div class="button_group">
                                <button class="swith" v-on:click="swithCamera()">Swith</button>
                                <button class="snap" v-on:click="snapShot()">SNAP</button>
                                <button class="full" v-on:click="fullScreen()">Full</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
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
                srcImage: null,
                onStream: null
            }
        },
        mounted() {
            this.cameraStream()
        },
        methods: {
            cameraStream: async function () {
                let constraints = {
                    audio: false,
                    video: {
                        facingMode: this.currentFacingMode,
                    },
                };
                if (navigator.mediaDevices) {
                    navigator.mediaDevices
                        .getUserMedia(constraints)
                        .then(stream => {
                            this.onStream = stream
                            const videoPlay = document.querySelector("video");
                            videoPlay.srcObject = stream;
                        }).catch(() => {
                            alert('webcam is not available')
                        })
                }
            },

            async uploadImage() {
                let url = "http://";
                let formData = new FormData;
                let imageData = this.dataURItoBlob(this.srcImage)
                formData.append('files', imageData)
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
                    let canvas = document.querySelector('canvas');
                    let context = canvas.getContext('2d');
                    context.clearRect(0, 0, 250, 150);
                    alert("Success to sent request");
                }

            },
            async snapShot() {
                let video = document.getElementById("video");
                let canvas = document.querySelector("canvas");
                let context = canvas.getContext('2d');
                let snd = new Audio(require("../snd/click.mp3"));
                await snd.play();
                context.drawImage(video, 0, 0, 250, 150);
                this.srcImage = canvas.toDataURL("image/png")
            },

            async swithCamera() {
                if (this.currentFacingMode == 'environment') {
                    this.currentFacingMode = 'user'
                } else {
                    this.currentFacingMode = 'environment'
                }
                await this.stopStreaming();
                this.cameraStream()
            },

            fullScreen() {
                let element = document.getElementById('card-full')
                if (screenfull.isEnabled) {
                    screenfull.toggle(element);
                }
            },

            //convet URI Images to Blob
            dataURItoBlob(dataURI) {

                let byteString = atob(dataURI.split(',')[1]);
                let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                let buffer = new ArrayBuffer(byteString.length);
                let data = new DataView(buffer);

                for (let i = 0; i < byteString.length; i++) {

                    data.setUint8(i, byteString.charCodeAt(i));
                }

                return new Blob([buffer], {
                    type: mimeString
                });
            },

            stopStreaming() {
                if (null != this.onStream) {
                    let track = this.onStream.getTracks()[0];
                    track.stop();
                }
            }
        },
        beforeDestroy() {
            this.stopStreaming()
        }



    }
</script>

<style>
    .camera {
        box-sizing: border-box;
    }

    #video {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        background-color: #171717;
        z-index: 0;
    }

    .button_group {
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        display: flex;
        height: 50px;
        opacity: 0.5;
        z-index: 1000;
        margin: 0px 20px 20px 20px;
    }

    .snap {
        display: inline-block;
        margin: auto;
        height: 50px;
        background-color: red;
        border: 1px solid #171717;
        outline: none;
        cursor: pointer;
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
        box-shadow: 4px 4px 12px 0px;
        margin: 10px 10px 10px 10px;
    }
</style>