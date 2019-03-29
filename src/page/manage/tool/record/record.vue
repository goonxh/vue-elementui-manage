<template>
    <div class="record-page">
        <div style="margin-bottom: 15px;">
            <el-button @click="startRecording" :disabled="videoStart" size="small">start recording</el-button>
            <el-button @click="stopRecording" :disabled="!videoStart" size="small">stop recording</el-button>
        </div>
        <video controls autoplay playsinline ref="video"></video>
    </div>
</template>

<script>
    import RecordRTC from 'recordrtc'
    export default {
        data() {
            return {
                video: null,
                videoStart: false,
                recorder: null,
            }
        },
        created(){

        },
        mounted(){
            this.video = document.querySelector('video');
        },
        methods: {
            captureCamera(callback) {
                navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
                    callback(camera);
                }).catch((error) => {
                    this.$message.error('未找到视频设备');
                });
            },
            stopRecordingCallback() {
                this.video.src = this.video.srcObject = null;
                this.video.muted = false;
                this.video.volume = 1;
                this.video.src = URL.createObjectURL(this.recorder.getBlob());
                window.open(URL.createObjectURL(this.recorder.getBlob()));
                this.recorder.camera.stop();
                this.recorder.destroy();
                this.recorder = null;
            },
            startRecording() {
                console.log(this.video);
                this.videoStart = true;
                this.captureCamera((camera) => {
                    this.video.muted = true;
                    this.video.volume = 0;
                    this.video.srcObject = camera;
                    this.recorder = RecordRTC(camera, {
                        type: 'video'
                    });
                    this.recorder.startRecording();
                    // release camera on stopRecording
                    this.recorder.camera = camera;
                });
            },
            stopRecording() {
                this.videoStart = false;
                this.recorder.stopRecording(this.stopRecordingCallback);
            }
        }
    };
</script>
<style scoped>

</style>
