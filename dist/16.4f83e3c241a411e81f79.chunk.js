(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{388:function(e,t,n){var i=n(424);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,n(9).default)("4cb44b6c",i,!0,{})},423:function(e,t,n){"use strict";var i=n(388);n.n(i).a},424:function(e,t,n){(e.exports=n(8)(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},441:function(e,t,n){"use strict";n.r(t);var i={data:function(){return{imgSrc:"",haveVideo:!1}},created:function(){this.getVideo()},methods:{getVideo:function(){var t=this;navigator.mediaDevices.getUserMedia({video:!0}).then(function(e){t.haveVideo=!0,t.$refs.video.srcObject=e}).catch(function(e){t.haveVideo=!1,t.$message("暂无视频源，请打开摄像头。")})},covertBase64UrlToFile:function(e){for(var t=window.atob(e.split(",")[1]),n=new ArrayBuffer(t.length),i=new Uint8Array(n),a=0;a<t.length;a++)i[a]=t.charCodeAt(a);return new File([n],"".concat((new Date).getTime(),".png"),{type:"image/png",lastModified:new Date})},screenShot:function(){if(this.haveVideo){var e=this.$refs.canvas,t=this.$refs.video;e.width=t.videoWidth,e.height=t.videoHeight,e.getContext("2d").drawImage(t,0,0)}else this.$message.warning("暂无视频源，不可截图。")}}},a=(n(423),n(19)),o=Object(a.a)(i,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"fill-contain"},[n("el-row",{attrs:{type:"flex"}},[n("el-col",[n("video",{ref:"video",staticStyle:{border:"1px dashed #ccc","border-radius":"5px"},attrs:{autoplay:"",width:"400",height:"300",id:"video"}})]),e._v(" "),n("el-col",[n("el-button",{staticClass:"screen-shot-btn",attrs:{size:"small"},on:{click:e.screenShot}},[e._v("拍照")])],1)],1),e._v(" "),n("canvas",{ref:"canvas",staticStyle:{display:"block",width:"600px"}})],1)},[],!1,null,"da7674f2",null);o.options.__file="videoInCanvas.vue";t.default=o.exports}}]);