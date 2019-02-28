

export default {
    data() {
        return {
            imgSrc: '',
            haveVideo: false,
        }
    },
    created() {
      this.getVideo();
    },
    methods: {
        getVideo() {
            navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
                this.haveVideo = true;
                this.$refs.video.srcObject = stream;
            }).catch((err) => {
                this.haveVideo = false;
                this.$message('暂无视频源，请打开摄像头。');
            });
        },
        covertBase64UrlToFile(urlData) {
            let bytes = window.atob(urlData.split(',')[1]); // 对用base64编码过的字符串进行解码
            let ab = new ArrayBuffer(bytes.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new File([ab], `${new Date().getTime()}.png`, {type: 'image/png', lastModified: new Date()});
        },
        screenShot() {
            if (this.haveVideo) {
                let canvas = this.$refs.canvas;
                let video = this.$refs.video;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
               // this.imgSrc = canvas.toDataURL('image/png');
               // let imgFile = this.covertBase64UrlToFile(canvas.toDataURL('image/png'));
               // this.micHttpRequest({file: imgFile});
            } else {
                this.$message.warning('暂无视频源，不可截图。');
            }
        },
    },
}