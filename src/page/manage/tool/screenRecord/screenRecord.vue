<template>
    <div class="record-page">
        <div style="margin-bottom: 15px;">
            <el-button @click="startRecording" :disabled="videoStart" size="small">start recording</el-button>
            <el-button @click="stopRecording" :disabled="!videoStart" size="small" id="btn-stop-recording">stop recording</el-button>
        </div>
        <video controls autoplay playsinline ref="video" width="400" height="300"></video>
    </div>
</template>

<script>
    import RecordRTC from 'recordrtc';
    export default {
        name: "screenRecord",
        data() {
            return {
                video: null,
                videoStart: false,
                recorder: null,
            }
        },
        created() {
            if (!navigator.getDisplayMedia && !navigator.mediaDevices.getDisplayMedia) {
                let error = 'Your browser does NOT support the getDisplayMedia API.';
                throw new Error(error);
            }
        },
        mounted() {
            this.video = document.querySelector('video');
        },
        methods: {
            invokeGetDisplayMedia(success, error) {
                let displaymediastreamconstraints = {
                    video: {
                        displaySurface: 'monitor', // monitor, window, application, browser
                        logicalSurface: true,
                        cursor: 'always' // never, always, motion
                    }
                };
                // above constraints are NOT supported YET
                // that's why overridnig them
                displaymediastreamconstraints = {
                    video: true
                };
                if (navigator.mediaDevices.getDisplayMedia) {
                    navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
                }
                else {
                    navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
                }
            },
            captureScreen(callback) {
                this.invokeGetDisplayMedia((screen) => {
                    this.addStreamStopListener(screen, () => {
                       //
                    });
                    callback(screen);
                }, function (error) {
                    console.error(error);
                    alert('Unable to capture your screen. Please check console logs.\n' + error);
                });
            },
            addStreamStopListener(stream, callback) {
                stream.addEventListener('ended', function () {
                    callback();
                    callback = function () { };
                }, false);
                stream.addEventListener('inactive', function () {
                    callback();
                    callback = function () { };
                }, false);
                stream.getTracks().forEach(function (track) {
                    track.addEventListener('ended', function () {
                        callback();
                        callback = function () { };
                    }, false);
                    track.addEventListener('inactive', function () {
                        callback();
                        callback = function () { };
                    }, false);
                });
            },
            startRecording() {
                this.captureScreen(screen=>{
                    this.video.srcObject = screen;
                    this.recorder = RecordRTC(screen, {
                        type: 'video'
                    });
                    this.recorder.startRecording();
                    // release screen on stopRecording
                    this.recorder.screen = screen;
                    this.videoStart = true;
                });
            },
            stopRecordingCallback() {
                this.video.src = this.video.srcObject = null;
                this.video.src = URL.createObjectURL(this.recorder.getBlob());

                this.recorder.screen.stop();
                this.recorder.destroy();
                this.recorder = null;
                this.videoStart = false;
            },
            stopRecording() {
                this.recorder.stopRecording(this.stopRecordingCallback);
            }
        },
    }
</script>

<style scoped>

</style>
