<template>
<div :style='{"border":"2px solid #dbd9f4","padding":"20px","margin":"10px auto","borderRadius":"8px","background":"#fff","width":"1200px","position":"relative"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' label="菜谱名称" prop="caipumingcheng">
            <el-input v-model="ruleForm.caipumingcheng" 
                placeholder="菜谱名称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}'  label="菜品分类" prop="caipinfenlei">
            <el-select v-model="ruleForm.caipinfenlei" placeholder="请选择菜品分类" >
              <el-option
                  v-for="(item,index) in caipinfenleiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' label="菜谱封面" v-if="type!='cross' || (type=='cross' && !ro.caipufengmian)" prop="caipufengmian">
            <file-upload
            tip="点击上传菜谱封面"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.caipufengmian?ruleForm.caipufengmian:''"
            @change="caipufengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' class="upload" v-else label="菜谱封面" prop="caipufengmian">
                <img v-if="ruleForm.caipufengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.caipufengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.caipufengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' label="口味" prop="kouwei">
            <el-input v-model="ruleForm.kouwei" 
                placeholder="口味" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' label="材料" prop="cailiao">
            <el-input v-model="ruleForm.cailiao" 
                placeholder="材料" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' label="制作工艺" prop="zhizuogongyi">
            <el-input v-model="ruleForm.zhizuogongyi" 
                placeholder="制作工艺" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' label="适应人群" prop="shiyingrenqun">
            <el-input v-model="ruleForm.shiyingrenqun" 
                placeholder="适应人群" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' label="功效营养" prop="gongxiaoyingyang">
            <el-input v-model="ruleForm.gongxiaoyingyang" 
                placeholder="功效营养" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"0"}' label="菜谱详情" prop="caipuxiangqing">
            <editor 
                :style='{"border":"1px solid #cbbae8","width":"100%","borderRadius":"4px","height":"auto"}'
                v-model="ruleForm.caipuxiangqing" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 25%","outline":"none","color":"#666","borderRadius":"10px","background":"linear-gradient(90deg, rgba(255,233,100,1) 0%, rgba(194,248,126,1) 29%, rgba(181,233,252,1) 61%, rgba(246,172,218,1) 100%)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"2px solid rgba(213, 203, 235, 1)","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#000","borderRadius":"4px","background":"rgba(255, 255, 255, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            caipumingcheng : false,
            caipinfenlei : false,
            caipufengmian : false,
            kouwei : false,
            cailiao : false,
            zhizuogongyi : false,
            shiyingrenqun : false,
            gongxiaoyingyang : false,
            caipuxiangqing : false,
            thumbsupnum : false,
            crazilynum : false,
            clicktime : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          caipumingcheng: '',
          caipinfenlei: '',
          caipufengmian: '',
          kouwei: '',
          cailiao: '',
          zhizuogongyi: '',
          shiyingrenqun: '',
          gongxiaoyingyang: '',
          caipuxiangqing: '',
        },
        caipinfenleiOptions: [],
        rules: {
          caipumingcheng: [
            { required: true, message: '菜谱名称不能为空', trigger: 'blur' },
          ],
          caipinfenlei: [
            { required: true, message: '菜品分类不能为空', trigger: 'blur' },
          ],
          caipufengmian: [
          ],
          kouwei: [
            { required: true, message: '口味不能为空', trigger: 'blur' },
          ],
          cailiao: [
            { required: true, message: '材料不能为空', trigger: 'blur' },
          ],
          zhizuogongyi: [
          ],
          shiyingrenqun: [
            { required: true, message: '适应人群不能为空', trigger: 'blur' },
          ],
          gongxiaoyingyang: [
            { required: true, message: '功效营养不能为空', trigger: 'blur' },
          ],
          caipuxiangqing: [
          ],
          thumbsupnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          crazilynum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          clicktime: [
          ],
        },
      };
    },
    computed: {



    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='caipumingcheng'){
              this.ruleForm.caipumingcheng = obj[o];
              this.ro.caipumingcheng = true;
              continue;
            }
            if(o=='caipinfenlei'){
              this.ruleForm.caipinfenlei = obj[o];
              this.ro.caipinfenlei = true;
              continue;
            }
            if(o=='caipufengmian'){
              this.ruleForm.caipufengmian = obj[o].split(",")[0];
              this.ro.caipufengmian = true;
              continue;
            }
            if(o=='kouwei'){
              this.ruleForm.kouwei = obj[o];
              this.ro.kouwei = true;
              continue;
            }
            if(o=='cailiao'){
              this.ruleForm.cailiao = obj[o];
              this.ro.cailiao = true;
              continue;
            }
            if(o=='zhizuogongyi'){
              this.ruleForm.zhizuogongyi = obj[o];
              this.ro.zhizuogongyi = true;
              continue;
            }
            if(o=='shiyingrenqun'){
              this.ruleForm.shiyingrenqun = obj[o];
              this.ro.shiyingrenqun = true;
              continue;
            }
            if(o=='gongxiaoyingyang'){
              this.ruleForm.gongxiaoyingyang = obj[o];
              this.ro.gongxiaoyingyang = true;
              continue;
            }
            if(o=='caipuxiangqing'){
              this.ruleForm.caipuxiangqing = obj[o];
              this.ro.caipuxiangqing = true;
              continue;
            }
            if(o=='thumbsupnum'){
              this.ruleForm.thumbsupnum = obj[o];
              this.ro.thumbsupnum = true;
              continue;
            }
            if(o=='crazilynum'){
              this.ruleForm.crazilynum = obj[o];
              this.ro.crazilynum = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/caipinfenlei/caipinfenlei', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.caipinfenleiOptions = res.data.data;
          }
        });
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('caipuxinxi/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        //更新跨表属性
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('caipuxinxi/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 跨表计算


                          this.$http.post('caipuxinxi/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('caipuxinxi/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
      // 返回
      back() {
        this.$router.go(-1);
      },
      caipufengmianUploadChange(fileUrls) {
          this.ruleForm.caipufengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 80px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #cbbae8;
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #999;
	  background: 0;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 1px solid #cbbae8;
	  border-radius: 4px;
	  padding: 0 10px;
	  outline: none;
	  color: #999;
	  background: 0;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 1px solid #cbbae8;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  outline: none;
	  color: #999;
	  background: 0;
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
	  border: 1px dashed rgba(204, 188, 233, 1);
	  cursor: pointer;
	  border-radius: 6px;
	  color: #cbbae8;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px dashed rgba(204, 188, 233, 1);
	  cursor: pointer;
	  border-radius: 6px;
	  color: #cbbae8;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px dashed rgba(204, 188, 233, 1);
	  cursor: pointer;
	  border-radius: 6px;
	  color: #cbbae8;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #cbbae8;
	  border-radius: 4px;
	  padding: 12px;
	  outline: none;
	  color: #999;
	  background: 0;
	  width: 400px;
	  font-size: 14px;
	  height: 120px;
	}
</style>
