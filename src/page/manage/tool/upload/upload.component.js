import {baseUrl} from "../../../../config/utils";
import hljs from 'highlight.js';
import 'element-ui/lib/theme-chalk/display.css';
export default {
    data() {
        return {
            uploadLoading: false,
            dialogImageUrl: '',
            dialogVisible: false,
            uploadHeader: {'Authorization': `${window.sessionStorage.getItem('token')}`},
            uploadAction: `${baseUrl}/upload`,
            pagination: {},
            uploadPicList:[],
            activeNames:'',
            formidableHtml: 'const formidable = require(\'formidable\');\n' +
            'app.post(\'/upload\',(req,res)=>{\n' +
            '    let form = new formidable.IncomingForm();\n' +
            '    let targetFile = path.join(__dirname, \'../upload\');\n' +
            '    form.uploadDir = targetFile;\n' +
            '    form.parse(req, function (err, fields, files) {\n' +
            '        if(err) throw err;\n' +
            '        let oldpath = files.upload_img.path;\n' +
            '        let newpath = path.join(path.dirname(oldpath), files.upload_img.name);\n' +
            '        fs.rename(oldpath,newpath,(err)=>{\n' +
            '            if(err) throw err;\n' +
            '            let newFile = new models.upload({\n' +
            '                name: files.upload_img.name,\n' +
            '                path: \'/upload/\'+files.upload_img.name,\n' +
            '                date: formatDateTime(new Date()),\n' +
            '            })\n' +
            '            newFile.save();\n' +
            '            res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});\n' +
            '            res.end(\'图片上传成功！\');\n' +
            '        })\n' +
            '    })\n' +
            '})',
            hljHtml:'在vue中使用：\n' +
            'import hljs from \'highlight.js\'\n' +
            'import \'highlight.js/styles/googlecode.css\' \n' +
            '// 自定义highlightCode方法，将只执行一次的逻辑去掉\n' +
            'hljs.highlightCode = function () {\n' +
            '    let blocks = document.querySelectorAll(\'pre code\');\n' +
            '    [].forEach.call(blocks, hljs.highlightBlock);\n' +
            '};\n' +
            '//在组件中\n' +
            'export default {\n' +
            '  mounted(){\n' +
            '     hljs.highlightCode()\n' +
            '  }\n' +
            '}\n'
        }
    },
    created() {
        this.getUploadPic();
    },
    mounted() {
        hljs.highlightCode()
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleCurrentChange(val) {
            this.getUploadPic({page:val});
        },
        getUploadPic({page = 1} = {page: 1}) {
            this.uploadLoading = true;
            this.axios.get(`${baseUrl}/uploadPic`,{params: {page:page,pageSize:5}}).then((res) => {
                this.uploadPicList = res.data.data;
                this.pagination = res.data.pagination;
            }).catch((err)=>{
                this.$message.error(err)
            }).finally(()=>{
                this.uploadLoading = false;
            })
        },
        picUploadSuccess() {
            this.getUploadPic();
        }
    },
}