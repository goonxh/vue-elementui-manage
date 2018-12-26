<template>
    <div class="edit-div"
         v-text="innerText"
         :contenteditable="contenteditable"
         :placeholder="placeholder"
         @focus="isLocked = true"
         @blur="isLocked = false"
         @input="changeText">
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        name: 'editDiv',
        props: {
            value: {
                type: String,
                default: ''
            },
            contenteditable: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                innerText: this.value,
                isLocked: false
            }
        },
        watch: {
            value(){
                if (!this.isLocked || !this.innerText) {
                    this.innerText = this.value;
                }
            }
        },
        methods: {
            changeText(){
                this.$emit('input', this.$el.innerHTML);
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "../style/common";
    .edit-div {
        width: 100%;
        height: 100%;
        overflow: auto;
        word-break: break-all;
        outline: none;
        user-select: text;
        white-space: pre-wrap;
        text-align: left;
        border: 1px #ccc solid;
        border-radius: 4px;
        font-size: 14px;
        color: #6f6f6f;
        padding: 5px;
        &[contenteditable=true]{
            user-modify: read-write-plaintext-only;
            &:empty:before {
                content: attr(placeholder);
                display: block;
                color: #ccc;
            }
        }
        &:focus {
            border: 1px #359EE8 solid;
        }
    }
</style>
