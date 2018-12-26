import marked from 'marked';
import editableDiv from '@/components/editableDiv';
const rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
})

export default {
    components: {
      editableDiv,
    },
    data() {
        return {
            markdownText: '',
        }
    },
    computed: {
        compiledMarkdown: function () {
            console.log(this.markdownText)
            return marked(this.markdownText, {sanitize: true})
        }
    }
}

