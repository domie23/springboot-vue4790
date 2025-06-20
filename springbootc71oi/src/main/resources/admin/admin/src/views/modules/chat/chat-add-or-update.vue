<template>
    <div>
        <el-form
            :style='{"padding":"30px","boxShadow":"0 0px 0px #999","borderRadius":"6px","background":"url(http://codegen.caihongy.cn/20221014/5e767dc0afa649ec9fbc71f9da086ab3.jpg)"}'
            class="add-update-preview" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
            <div class="chat-content" id="chat-content">
                <div v-bind:key="item.id" v-for="item in dataList">
                    <div v-if="item.ask" class="left-content">
                        <el-alert v-if="!item.img" class="text-content" :title="item.ask" :closable="false"
                            type="success"></el-alert>
                        <el-image v-if="item.img" :src="imgUrl + item.img" style="width: 120px;margin: 10px;"
                            fit="scale-down" :preview-src-list="[imgUrl + item.img]"></el-image>
                    </div>
                    <div v-else class="right-content">
                        <el-alert v-if="!item.img" class="text-content" :title="item.reply" :closable="false"
                            type="warning"></el-alert>
                        <el-image v-if="item.img" :src="imgUrl + item.img" style="width: 120px;margin: 10px;"
                            fit="scale-down" :preview-src-list="[imgUrl + item.img]"></el-image>
                    </div>
                    <div class="clear-float"></div>
                </div>
            </div>
            <div class="clear-float"></div>
            <el-form-item :style='{"margin":"0 0 20px 0"}' label="回复" prop="reply">
                <el-input v-model="ruleForm.reply" placeholder="回复" clearable></el-input>
            </el-form-item>
            <el-form-item :style='{"padding":"0","margin":"0 0 20px"}'>
                <div style="width: 100%;display: flex;align-items: center;">
                    <img style="width: 40px;cursor: pointer;margin-right: 10px;" src="../../../assets/img/jiahao.png" @click="askShow = !askShow">
                    <el-button
                        :style='{"border":"1px solid #5e9808","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"-webkit-linear-gradient(top,#96d148,#4a7f06)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'
                        type="primary" @click="onSubmit">回复</el-button>
                    <el-button
                        :style='{"border":"1px solid #ccc","cursor":"pointer","padding":"0","margin":"0 0","outline":"none","color":"#5b8020","borderRadius":"4px","background":"-webkit-linear-gradient(top,#fff,#ccc)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'
                        @click="back()">返回</el-button>
                </div>
                
            </el-form-item>
            <el-form-item v-if="askShow" :style='{"padding":"0 0 0 50px","margin":"0"}'>
                <el-upload class="upload-demo" :action="getActionUrl" :on-success="uploadSuccess"
                    :show-file-list="false">
                    <el-button
                        :style='{"border":"1px solid #5e9808","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"-webkit-linear-gradient(top,#96d148,#4a7f06)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'
                        type="primary">上传图片</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import storage from "@/utils/storage";
    export default {
        data() {
            return {
                id: "",
                ruleForm: {},
                dataList: [],
                rules: {
                    reply: [{
                        required: true,
                        message: "回复内容不能为空",
                        trigger: "blur"
                    }]
                },
                inter: null,
                myHeaders: {},
                askShow:false
            };
        },
        props: ["parent"],
        computed: {
            imgUrl() {
                return this.$base.url
            },
            getActionUrl: function() {
                // return base.url + this.action + "?token=" + storage.get("token");
                return `/${this.$base.name}/` + 'file/upload';
            }
        },
        mounted() {
            this.myHeaders = {
                'Token': storage.get("Token")
            }
        },
        methods: {
            // 初始化
            init(id) {
                this.id = id;
                var that = this;
                that.getList();
                var inter = setInterval(function() {
                    that.getList();
                }, 5000)
                this.inter = inter;
            },

            getList() {
                let params = {
                    sort: 'addtime',
                    order: 'asc',
                    limit: 1000
                }
                this.$http({
                    url: this.$api.chatbyuseridpage + this.id,
                    method: "get",
                    params: params
                }).then(({
                    data
                }) => {
                    if (data && data.code === 0) {
                        this.ruleForm.userid = this.id;
                        for (let x in data.data.list) {
                            if (data.data.list[x].ask) {
                                if (data.data.list[x].ask.split('/').length > 1) {
                                    if (data.data.list[x].ask.split('/')[0] == 'upload') {
                                        data.data.list[x].img = data.data.list[x].ask
                                    }
                                }
                            }
                            if (data.data.list[x].reply) {
                                if (data.data.list[x].reply.split('/').length > 1) {
                                    if (data.data.list[x].reply.split('/')[0] == 'upload') {
                                        data.data.list[x].img = data.data.list[x].reply
                                    }
                                }
                            }
                        }
                        this.dataList = data.data.list;
                        let div = document.getElementsByClassName('chat-content')[0]
                        setTimeout(() => {
                            if (div)
                                div.scrollTop = div.scrollHeight
                        }, 100)
                    } else {
                        this.$message.error(data.msg);
                    }
                });
            },
            // 提交
            onSubmit() {
                this.$refs["ruleForm"].validate(valid => {
                    if (valid) {
                        this.$http({
                            url: this.$api.chatsave,
                            method: "post",
                            data: this.ruleForm
                        }).then(({
                            data
                        }) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success",
                                    duration: 1500,
                                    onClose: () => {
                                        this.getList();
                                        this.ruleForm.reply = "";
                                    }
                                });
                            } else {
                                this.$message.error(data.msg);
                            }
                            this.askShow = false
                        });
                    }
                });
            },
            uploadSuccess(res) {
                if (res.code == 0) {
                    let params = JSON.parse(JSON.stringify(this.ruleForm))

                    params.reply = 'upload/' + res.file
                    this.$http({
                        url: this.$api.chatsave,
                        method: "post",
                        data: params
                    }).then(({
                        data
                    }) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: "操作成功",
                                type: "success",
                                duration: 1500,
                                onClose: () => {
                                    this.getList();
                                    this.ruleForm.reply = "";
                                }
                            });
                        } else {
                            this.$message.error(data.msg);
                        }
                        this.askShow = false
                    });
                }
            },
            // 返回
            back() {
                this.parent.showFlag = false;
                this.parent.getDataList();
                if (this.inter) {
                    clearInterval(this.inter);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .chat-content {
        margin-left: 80px;
        padding-bottom: 20px;
        width: 500px;
        margin-bottom: 30px;
        max-height: 300px;
        height: 300px;
        overflow-y: scroll;
        border: 1px solid #eeeeee;
        background: #fff;

        .left-content {
            float: left;
            margin-bottom: 10px;
            padding: 10px;
        }

        .right-content {
            float: right;
            margin-bottom: 10px;
            padding: 10px;
        }
    }

    .clear-float {
        clear: both;
    }

    .detail-form-content {
        background-color: transparent;
    }

    .el-date-editor.el-input {
        width: auto;
    }

    .add-update-preview .el-form-item /deep/ .el-form-item__label {
        padding: 0 10px 0 0;
        text-shadow: 0 1px 10px #fff;
        color: #699620;
        width: 80px;
        font-size: 14px;
        line-height: 40px;
        text-align: right;
    }

    .add-update-preview .el-form-item /deep/ .el-form-item__content {
        margin-left: 80px;
    }

    .add-update-preview .el-input /deep/ .el-input__inner {
        border: 0;
        border-radius: 4px;
        padding: 0 12px;
        box-shadow: 0 0 1px #4b681d;
        outline: none;
        color: #00a9aa;
        width: 400px;
        font-size: 14px;
        height: 40px;
    }

    .add-update-preview .el-select /deep/ .el-input__inner {
        border: 0;
        border-radius: 4px;
        padding: 0 10px;
        box-shadow: 0 0 1px #4b681d;
        outline: none;
        color: #00a9aa;
        width: 200px;
        font-size: 14px;
        height: 40px;
    }

    .add-update-preview .el-date-editor /deep/ .el-input__inner {
        border: 0;
        border-radius: 4px;
        padding: 0 10px 0 30px;
        box-shadow: 0 0 1px #4b681d;
        outline: none;
        color: #00a9aa;
        width: 200px;
        font-size: 14px;
        height: 40px;
    }

    .add-update-preview /deep/ .el-upload--picture-card {
        background: transparent;
        border: 0;
        border-radius: 0;
        width: auto;
        height: auto;
        line-height: initial;
        vertical-align: middle;
    }

    .add-update-preview /deep/ .upload .upload-img {
        border: 1px dashed #fff;
        cursor: pointer;
        border-radius: 6px;
        color: #fff;
        width: 200px;
        font-size: 32px;
        line-height: 100px;
        text-align: center;
        height: 100px;
    }

    .add-update-preview /deep/ .el-upload-list .el-upload-list__item {
        border: 1px dashed #fff;
        cursor: pointer;
        border-radius: 6px;
        color: #fff;
        width: 200px;
        font-size: 32px;
        line-height: 100px;
        text-align: center;
        height: 100px;
    }

    .add-update-preview /deep/ .el-upload .el-icon-plus {
        border: 1px dashed #fff;
        cursor: pointer;
        border-radius: 6px;
        color: #fff;
        width: 200px;
        font-size: 32px;
        line-height: 100px;
        text-align: center;
        height: 100px;
    }

    .add-update-preview .el-textarea /deep/ .el-textarea__inner {
        border: 0;
        border-radius: 4px;
        padding: 12px;
        box-shadow: 0 0 1px #4b681d;
        outline: none;
        color: #00a9aa;
        width: 400px;
        font-size: 14px;
        height: auto;
    }
</style>
