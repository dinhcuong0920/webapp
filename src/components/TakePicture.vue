<template>
    <div class="row">

        <div class="col-sm-6">
            <button type="button" class="btn btn-outline-primary">
                <router-link to='/'>Home</router-link>
            </button>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Special title treatment</h5>
                    <div class="camera">
                        <video id="video" autoplay></video>
                        <div class="button_group">
                            <button class="swith" v-on:click="swithCamera()">Swith Camera</button>
                            <button class="snap" v-on:click="snapShot()">SNAP</button>
                            <button class="full" v-on:click="fullScreen()">Full</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="picture">
                <canvas class="preview"></canvas>
                <button type="button" class="btn btn-outline-primary">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import screenfull from 'screenfull';
    export default {
        name: 'TakePicture',
        components: {

        },
        data: function () {
            return {
                companies: [],
                currentFacingMode: 'user'
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
            }

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
        display: flex;
        width: 100%;
        height: 50px;
        background-color: grey;
        opacity: 0.5;
    }

    .snap {
        display: inline-block;
        margin: auto;
        width: 33.33%;
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
        width: 33.33%;
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
        width: 33.34%;
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