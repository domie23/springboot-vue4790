<template>
<div>
	<div :style='{"padding":"12px","margin":"10px auto","borderColor":"#dbd9f4","borderRadius":"8px","background":"#fff","borderWidth":"0 0 2px","width":"1200px","borderStyle":"solid"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'Ξ'" :style='{"width":"100%","margin":"0 auto","fontSize":"14px","lineHeight":"1","display":"flex"}'>
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in breadcrumbItem" :key="index">{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	
	<div class="detail-preview" :style='{"width":"1200px","padding":"0 0 20px","margin":"20px auto 0"}'>
		<div class="attr" :style='{"minHeight":"780px","padding":"0 0 20px","margin":"20px  0 20px","overflow":"hidden","borderRadius":"8px","background":"#fff","display":"block","position":"relative","justifyContent":"space-between","height":"auto"}'>
			<el-carousel :style='{"width":"45%","margin":"20px 10px 0px 20px","position":"","float":"left","height":"400px","order":"1"}' trigger="click" indicator-position="inside" arrow="always" type="default" direction="horizontal" height="400px" autoplay="false" interval="3000" loop="true">
				<el-carousel-item :style='{"border":"2px solid #dbd9f4","width":"100%","padding":"8px","borderRadius":"8px","background":"#e5e5f5","height":"100%"}' v-for="item in detailBanner" :key="item.id">
					<el-image :style='{"width":"100%","objectFit":"cover","borderRadius":"8px","height":"100%"}' v-if="item.substr(0,4)=='http'" :src="item" fit="cover" class="image"></el-image>
					<el-image :style='{"width":"100%","objectFit":"cover","borderRadius":"8px","height":"100%"}' v-else :src="baseUrl + item" fit="cover" class="image"></el-image>
				</el-carousel-item>
			</el-carousel>
	
			<div class="zancai" :style='{"padding":"0","margin":"0 auto 0 6%","top":"450px","flexWrap":"wrap","background":"none","display":"flex","width":"35%","position":"absolute","justifyContent":"space-between"}'>
				<div :style='{"cursor":"pointer","padding":"10px 0","margin":"0","alignItems":"center","borderRadius":"8px","background":"#e8e8fb","display":"flex","width":"100px","justifyContent":"center"}' v-if="!isThumbsupnum && !isCrazilynum" class="zan" @click="thumbsupOrCrazily(21)">
					<i :style='{"color":"#666","margin":"0 3px","fontSize":"14px"}' class="iconfont icon-dianzan"></i>
					<span :style='{"color":"#666","margin":"0 3px","fontSize":"14px"}'>赞一下({{detail.thumbsupnum}})</span>
				</div>
				<div :style='{"cursor":"pointer","padding":"10px 0","margin":"0","alignItems":"center","borderRadius":"8px","background":"#e8e8fb","display":"flex","width":"100px","justifyContent":"center"}' v-if="!isThumbsupnum && !isCrazilynum" class="cai" @click="thumbsupOrCrazily(22)">
					<i :style='{"color":"#666","margin":"0 3px","fontSize":"14px"}' class="iconfont icon-iconfontzan"></i>
					<span :style='{"color":"#666","margin":"0 3px","fontSize":"14px"}'>踩一下({{detail.crazilynum}})</span>
				</div>
				<div :style='{"cursor":"pointer","padding":"10px 0","margin":"0","alignItems":"center","borderRadius":"8px","background":"#e8e8fb","display":"flex","width":"100px","justifyContent":"center"}' v-if="isThumbsupnum" class="zan" @click="cancelThumbsupOrCrazily(21)">
					<i :style='{"color":"#666","margin":"0 3px","fontSize":"14px"}' class="iconfont icon-dianzan"></i>
					<span :style='{"color":"#666","margin":"0 3px","fontSize":"14px"}'>取消赞({{detail.thumbsupnum}})</span>
				</div>
				<div :style='{"cursor":"pointer","padding":"10px 0","margin":"0","alignItems":"center","borderRadius":"8px","background":"#e8e8fb","display":"flex","width":"100px","justifyContent":"center"}' v-if="isCrazilynum" class="cai" @click="cancelThumbsupOrCrazily(22)">
					<i :style='{"color":"#666","margin":"0 3px","fontSize":"14px"}' class="iconfont icon-iconfontzan"></i>
					<span :style='{"color":"#666","margin":"0 3px","fontSize":"14px"}'>取消踩({{detail.crazilynum}})</span>
				</div>
			</div>
			
			<div class="info" :style='{"border":"8px solid #dbd9f4","minHeight":"750px","padding":"10px","margin":"20px 20px 0 0","borderRadius":"8px 8px 0 8px","background":"linear-gradient(90deg, rgba(250,250,252,1) 0%, rgba(239,239,246,1) 100%)","width":"50%","float":"right","height":"auto","order":"2"}'>
				<div class="item" :style='{"padding":"0","margin":"10px 0 ","alignItems":"center","background":"none","display":"flex","width":"100%","justifyContent":"space-between"}'>
					<div :style='{"color":"#333","padding":"0 20px","fontSize":"16px"}'>
                    {{detail.caipumingcheng}}
                    </div>
					<div @click="storeup(1)" v-show="!isStoreup" :style='{"cursor":"pointer","width":"90px","padding":"6px","borderRadius":"16px","textAlign":"center","background":"radial-gradient(circle, rgba(225,223,244,1) 0%, rgba(207,205,236,1) 100%)"}'><i v-if="true" :style='{"color":"#666","fontSize":"14px"}' class="el-icon-star-off"></i><span :style='{"color":"#666","fontSize":"14px"}'>点我收藏</span></div>
					<div @click="storeup(-1)" v-show="isStoreup" :style='{"cursor":"pointer","width":"90px","padding":"6px","borderRadius":"16px","textAlign":"center","background":"radial-gradient(circle, rgba(225,223,244,1) 0%, rgba(207,205,236,1) 100%)"}'><i v-if="true" :style='{"color":"#666","fontSize":"14px"}' class="el-icon-star-on"></i><span :style='{"color":"#666","fontSize":"14px"}'>取消收藏</span></div>
				</div>

				<div class="item" :style='{"padding":"10px","margin":"0 20px 8px 20px","borderColor":"#ccc","background":"none","borderWidth":"0 0 1px 0","display":"flex","width":"auto","borderStyle":"solid","justifyContent":"spaceBetween"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"left","width":"102px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>菜品分类</div>
					<div  :style='{"width":"498px","padding":"0 10px","fontSize":"14px","lineHeight":"40px","color":"#666"}'>{{detail.caipinfenlei}}</div>
				</div>
				<div class="item" :style='{"padding":"10px","margin":"0 20px 8px 20px","borderColor":"#ccc","background":"none","borderWidth":"0 0 1px 0","display":"flex","width":"auto","borderStyle":"solid","justifyContent":"spaceBetween"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"left","width":"102px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>口味</div>
					<div  :style='{"width":"498px","padding":"0 10px","fontSize":"14px","lineHeight":"40px","color":"#666"}'>{{detail.kouwei}}</div>
				</div>
				<div class="item" :style='{"padding":"10px","margin":"0 20px 8px 20px","borderColor":"#ccc","background":"none","borderWidth":"0 0 1px 0","display":"flex","width":"auto","borderStyle":"solid","justifyContent":"spaceBetween"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"left","width":"102px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>材料</div>
					<div  :style='{"width":"498px","padding":"0 10px","fontSize":"14px","lineHeight":"40px","color":"#666"}'>{{detail.cailiao}}</div>
				</div>
				<div class="item" :style='{"padding":"10px","margin":"0 20px 8px 20px","borderColor":"#ccc","background":"none","borderWidth":"0 0 1px 0","display":"flex","width":"auto","borderStyle":"solid","justifyContent":"spaceBetween"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"left","width":"102px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>制作工艺</div>
					<div  :style='{"width":"498px","padding":"0 10px","fontSize":"14px","lineHeight":"40px","color":"#666"}'>{{detail.zhizuogongyi}}</div>
				</div>
				<div class="item" :style='{"padding":"10px","margin":"0 20px 8px 20px","borderColor":"#ccc","background":"none","borderWidth":"0 0 1px 0","display":"flex","width":"auto","borderStyle":"solid","justifyContent":"spaceBetween"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"left","width":"102px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>适应人群</div>
					<div  :style='{"width":"498px","padding":"0 10px","fontSize":"14px","lineHeight":"40px","color":"#666"}'>{{detail.shiyingrenqun}}</div>
				</div>
				<div class="item" :style='{"padding":"10px","margin":"0 20px 8px 20px","borderColor":"#ccc","background":"none","borderWidth":"0 0 1px 0","display":"flex","width":"auto","borderStyle":"solid","justifyContent":"spaceBetween"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#333","textAlign":"left","width":"102px","fontSize":"14px","lineHeight":"40px","height":"40px"}'>功效营养</div>
					<div  :style='{"width":"498px","padding":"0 10px","fontSize":"14px","lineHeight":"40px","color":"#666"}'>{{detail.gongxiaoyingyang}}</div>
				</div>
				<div class="btn" :style='{"width":"auto","padding":"10px 0","margin":"0 0 10px 20px","flexWrap":"wrap","display":"flex"}'>
				</div>
			</div>
			
			<!-- 热门信息 -->
			<div class="hot" :style='{"border":"2px solid #dbd9f4","padding":"0 0 8px","margin":"0px 10px 0px 20px","top":"524px","borderRadius":"8px","flexWrap":"wrap","background":"#fff","display":"flex","width":"45%","position":"absolute","height":"auto"}'>
			  <div :style='{"padding":"0","margin":"0 auto","color":"#333","textAlign":"center","background":"url(http://codegen.caihongy.cn/20221105/bb1ea9437beb4e1da8fcd1583db2f111.png) no-repeat,radial-gradient(circle, rgba(219,217,244,1) 0%, rgba(181,177,240,1) 100%)","width":"260px","lineHeight":"42px","fontSize":"18px","order":"0"}'>热门信息</div>
			  <div :style='{"padding":"10px","flexWrap":"wrap","background":"#fff","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
			    <div v-for="item in hotList" :key="item" :style='{"cursor":"pointer","width":"23%","padding":"0","background":"#fff","height":"auto"}' @click="toDetail(item)">
			      <img :style='{"width":"100%","objectFit":"cover","display":"block","height":"120px"}' :src="baseUrl + (item.caipufengmian?item.caipufengmian.split(',')[0]:'')" alt="">
			      <div :style='{"padding":"4px 5px 0","fontSize":"14px","lineHeight":"24px","color":"#000","background":"#f8f8fc"}'>{{item.caipumingcheng}}</div>
			      <div :style='{"padding":"4px 5px 0","fontSize":"14px","lineHeight":"24px","color":"#000","background":"#f8f8fc"}'>{{item.caipinfenlei}}</div>
			      <div :style='{"padding":"4px 5px 0","fontSize":"14px","lineHeight":"24px","color":"#000","background":"#f8f8fc"}'>{{item.kouwei}}</div>
			      <!-- <div :style='{"padding":"0 5px","lineHeight":"24px","fontSize":"12px","color":"#999","textAlign":"left","background":"#f8f8fc"}'>2022-02-02</div> -->
			    </div>
			  </div>
			</div>
		</div>
		
		
		<el-tabs class="detail" :style='{"border":"2px solid #dbd9f4","boxShadow":"none","padding":"10px","margin":"20px 0","borderRadius":"8px","background":"#fff"}' v-model="activeName" type="border-card">
			<el-tab-pane label="菜谱详情" name="first">
				<div v-html="detail.caipuxiangqing"></div>
			</el-tab-pane>
			<el-tab-pane label="评论" name="second">
				<el-form class="add comment" :style='{"padding":"15px","margin":"0 0 20px","display":"flex"}' :model="form" :rules="rules" ref="form">
					<el-form-item class="item" :style='{"width":"60%","display":"flex","height":"auto"}' label="评论" prop="content">
						<el-input type="textarea" :rows="5" v-model="form.content" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item class="btn" :style='{"width":"100%","padding":"0 0 0 50px","margin":"0px 0 0","height":"100px"}'>
						<el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"40px 20px 40px 50px","outline":"none","color":"#666","borderRadius":"10px","background":"rgba(223, 218, 235, 1)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="primary" @click="submitForm('form')">立即提交</el-button>
						<el-button :style='{"border":"2px solid #dfdaeb","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"#666","borderRadius":"10px","background":"none","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="resetForm('form')">重置</el-button>
					</el-form-item>
				</el-form>
				
				<div v-if="infoList.length" :style='{"padding":"15px","flexWrap":"wrap","display":"flex"}' class="comment">
					<div :style='{"padding":"0","margin":"0 20px 20px","borderColor":"#ddd","overflow":"hidden","alignItems":"center","borderWidth":"0 0 1px 0","background":"#fcfcfc","width":"45%","borderStyle":"solid","height":"auto"}' v-for="item in infoList" :key="item.id">
						<div class="user" :style='{"width":"100%","alignItems":"center","background":"#f5f5fc","display":"flex","height":"auto"}'>
							<el-image v-if="item.avatarurl" :style='{"width":"auto","margin":"0 10px 0 0","borderRadius":"0","objectFit":"cover","height":"50px"}' :size="50" :src="baseUrl + item.avatarurl"></el-image>
							<el-image v-if="!item.avatarurl" :style='{"width":"auto","margin":"0 10px 0 0","borderRadius":"0","objectFit":"cover","height":"50px"}' :size="50" :src="require('@/assets/touxiang.png')"></el-image>
							<div :style='{"color":"#ab85d3","fontSize":"16px"}' class="name">{{item.nickname}}</div>
						</div>
						<div :style='{"padding":"8px","margin":"10px 0px 0px","color":"#333","borderRadius":"4px","lineHeight":"30px","fontSize":"14px","textIndent":"2em"}' class="content-block-ask">
							{{item.content}}
						</div>
						<div :style='{"padding":"8px","margin":"10px 0px 0px","color":"#333","borderRadius":"4px","lineHeight":"30px","fontSize":"14px","textIndent":"2em"}' class="content-block-reply" v-if="item.reply">
							回复：{{item.reply}}
						</div>
					</div>
				</div>
				
				<el-pagination
				  background
				  class="pagination"
				  :pager-count="7"
				  :page-size="pageSize"
				  :page-sizes="pageSizes"
				  prev-text="<"
				  next-text=">"
				  :hide-on-single-page="true"
				  :layout='["total","prev","pager","next","sizes","jumper"].join()'
				  :total="total"
				  :style='{"width":"1200px","padding":"0","margin":"20px auto","whiteSpace":"nowrap","color":"#333","fontWeight":"500"}'
				  @current-change="curChange"
				  @prev-click="prevClick"
				  @next-click="nextClick"
				></el-pagination>
			</el-tab-pane>
			
		</el-tabs>
	</div>
</div>
</template>

<script>
  import CountDown from '@/components/CountDown';
  export default {
    //数据集合
    data() {
      return {
        tablename: 'caipuxinxi',
        baseUrl: '',
        breadcrumbItem: [
          {
            name: '详情信息'
          }
        ],
        title: '',
        detailBanner: [],
        endTime: 0,
        hotList: [],
        detail: {},
        activeName: 'first',
        form: {
          content: '',
          userid: localStorage.getItem('userid'),
          nickname: localStorage.getItem('username'),
          avatarurl: '',
        },
        infoList: [],
        total: 1,
        pageSize: 5,
		pageSizes: [10,20,30,50],
        totalPage: 1,
        rules: {
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        },
        storeupParams: {
          name: '',
          picture: '',
          refid: 0,
          tablename: 'caipuxinxi',
          userid: localStorage.getItem('userid')
        },
        isStoreup: false,
        storeupInfo: {},
        isCrazilynum: false,
        isThumbsupnum: false,
        thumbsupOrCrazilyInfo: {},
        buynumber: 1,
      }
    },
    created() {
        this.init();
    },
    //方法集合
    methods: {
        init() {
          this.baseUrl = this.$config.baseUrl;
          if(this.$route.query.detailObj) {
            this.detail = JSON.parse(this.$route.query.detailObj);
          }
          if(this.$route.query.storeupObj) {
            this.detail.id = JSON.parse(this.$route.query.storeupObj).refid;
          }
          this.$http.get(this.tablename + '/detail/'  + this.detail.id, {}).then(res => {
            if (res.data.code == 0) {
              this.detail = res.data.data;
              this.title = this.detail.caipumingcheng;
              this.detailBanner = this.detail.caipufengmian ? this.detail.caipufengmian.split(",") : [];
              this.$forceUpdate();
            }
          });

          this.getDiscussList(1);
          this.getStoreupStatus();
          this.getThumbsupOrCrazilyStatus();
          this.getHotList();

        },
        toDetail(item) {
          this.$router.push({path: '/index/caipuxinxiDetail', query: {detailObj: JSON.stringify(item)}});
          this.init();
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
        },
        getHotList() {
          let autoSortUrl = "";
          autoSortUrl = "caipuxinxi/autoSort";
          if(localStorage.getItem('Token')) {
              autoSortUrl = "caipuxinxi/autoSort2";
          }
            this.$http.get(autoSortUrl, {params: {
                page: 1,
                limit: 4,
            }}).then(res => {
                if (res.data.code == 0) {
                    this.hotList = res.data.data.list;        
                }
            })
        },
      storeup(type) {
        if (type == 1 && !this.isStoreup) {
          this.storeupParams.name = this.title;
          this.storeupParams.picture = this.detailBanner[0];
          this.storeupParams.inteltype = this.detail.caipinfenlei;
          this.storeupParams.refid = this.detail.id;
          this.storeupParams.type = type;
          this.$http.post('storeup/add', this.storeupParams).then(res => {
            if (res.data.code == 0) {
              this.isStoreup = true;
              this.$message({
                type: 'success',
                message: '收藏成功!',
                duration: 1500,
              });
            }
          });
        }
        if (type == -1 && this.isStoreup) {
          let delIds = new Array();
          delIds.push(this.storeupInfo.id);
          this.$http.post('storeup/delete', delIds).then(res => {
            if (res.data.code == 0) {
              this.isStoreup = false;
              this.$message({
                type: 'success',
                message: '取消成功!',
                duration: 1500,
              });
            }
          });
        }
      },
      getStoreupStatus(){
        if(localStorage.getItem("Token")) {
            this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 1, refid: this.detail.id, tablename: 'caipuxinxi', userid: localStorage.getItem('userid')}}).then(res => {
              if (res.data.code == 0 && res.data.data.list.length > 0) {
                this.isStoreup = true;
                this.storeupInfo = res.data.data.list[0];
              }
            });
        }
      },
      thumbsupOrCrazily(type) {
        this.storeupParams.name = this.title;
        this.storeupParams.picture = this.detailBanner[0];
        this.storeupParams.refid = this.detail.id;
        this.storeupParams.type = type;
        this.$http.post('storeup/add', this.storeupParams).then(res => {
          if (res.data.code == 0) {
            this.getThumbsupOrCrazilyStatus();
            this.$message({
              type: 'success',
              message: '操作成功!',
              duration: 1500,
            });
          }
        });

        if (type == 21) this.detail.thumbsupnum = Number(this.detail.thumbsupnum) + 1;
        if (type == 22) this.detail.crazilynum = Number(this.detail.crazilynum) + 1;
        this.$http.post('caipuxinxi/update', this.detail).then(res => {});
      },
      cancelThumbsupOrCrazily(type) {
        let delIds = new Array();
        delIds.push(this.thumbsupOrCrazilyInfo.id);
        this.$http.post('storeup/delete', delIds).then(res => {
          if (res.data.code == 0) {
            this.isThumbsupnum = false;
            this.isCrazilynum = false;
            this.$message({
              type: 'success',
              message: '取消成功!',
              duration: 1500,
            });
          }
        });

        if (type == 21) this.detail.thumbsupnum -= 1;
        if (type == 22) this.detail.crazilynum -= 1;
        this.$http.post('caipuxinxi/update', this.detail).then(res => {});
      },
    getThumbsupOrCrazilyStatus() {
        if(localStorage.getItem("Token")) {
            this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 21, refid: this.detail.id, tablename: 'caipuxinxi', userid: localStorage.getItem('userid')}}).then(res => {
              if (res.data.code == 0 && res.data.data.list.length > 0) {
                this.isThumbsupnum = true;
                this.thumbsupOrCrazilyInfo = res.data.data.list[0];
              }
            });

            this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 22, refid: this.detail.id, tablename: 'caipuxinxi', userid: localStorage.getItem('userid')}}).then(res => {
              if (res.data.code == 0 && res.data.data.list.length > 0) {
                this.isCrazilynum = true;
                this.thumbsupOrCrazilyInfo = res.data.data.list[0];
              }
            });
        }
    },
      curChange(page) {
        this.getInfo(page);
      },
      prevClick(page) {
        this.getInfo(page);
      },
      nextClick(page) {
        this.getInfo(page);
      },
      // 下载
      download(file){
        if(!file) {
            this.$message({
              type: 'error',
              message: '文件不存在',
              duration: 1500,
            });
            return;
        }
        window.open(this.baseUrl+file)
      },
      getDiscussList(page) {
        this.$http.get('discusscaipuxinxi/list', {params: {page, limit: this.pageSize, refid: this.detail.id}}).then(res => {
          if (res.data.code == 0) {
            this.infoList = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
            this.totalPage = res.data.data.totalPage;
          }
        });
      },
      submitForm(formName) {
        let sensitiveWords = "";
        let sensitiveWordsArr = [];
        if(sensitiveWords) {
            sensitiveWordsArr = sensitiveWords.split(",");
        }
        for(var i=0; i<sensitiveWordsArr.length; i++){
            //全局替换
            var reg = new RegExp(sensitiveWordsArr[i],"g");
            //判断内容中是否包括敏感词
            if (this.form.content.indexOf(sensitiveWordsArr[i]) > -1) {
                // 将敏感词替换为 **
                this.form.content = this.form.content.replace(reg,"**");
            }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.refid = this.detail.id;
            this.form.avatarurl = localStorage.getItem('headportrait')?localStorage.getItem('headportrait'):'';
            this.$http.post('discusscaipuxinxi/add', this.form).then(res => {
              if (res.data.code == 0) {
                this.form.content = '';
                this.getDiscussList(1);
                this.$message({
                  type: 'success',
                  message: '评论成功!',
                  duration: 1500,
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },


    },
    components: {
      CountDown
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.detail-preview {
	
	  .attr {
	    .el-carousel /deep/ .el-carousel__indicator button {
	      width: 0;
	      height: 0;
	      display: none;
	    }
	
	    .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
	      border-color: none;
	    }
	  }
	
	  .detail {
	    & /deep/ .el-tabs__header .el-tabs__nav-wrap {
	      margin-bottom: 0;
	    }
	
	    & .add .el-textarea {
	      width: auto;
	    }
	  }
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: rgba(223, 218, 235,.6);
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: rgba(223, 218, 235,.6);
	}

	.attr .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0 0 16px;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.attr .el-carousel /deep/ .el-carousel__indicators li {
		border-radius: 50%;
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.4;
		transition: 0.3s;
		height: 12px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__indicators li:hover {
		border-radius: 50%;
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.7;
		height: 12px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__indicators li.is-active {
		border-radius: 50%;
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 1;
		height: 12px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__decrease {
		cursor: pointer;
		z-index: 1;
		display: flex;
		border-color: #DCDFE6;
		border-radius: 4px 0 0 4px;
		top: 1px;
		left: 1px;
		background: #f5f5f5;
		width: 40px;
		justify-content: center;
		border-width: 0 1px 0 0;
		align-items: center;
		position: absolute;
		border-style: solid;
		text-align: center;
		height: 38px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__decrease i {
		color: #666;
		font-size: 14px;
	}

	.attr .el-input-number /deep/ .el-input-number__increase {
		cursor: pointer;
		z-index: 1;
		display: flex;
		border-color: #DCDFE6;
		right: 1px;
		border-radius: 0 4px 4px 0;
		top: 1px;
		background: #f5f5f5;
		width: 40px;
		justify-content: center;
		border-width: 0 0 0 1px;
		align-items: center;
		position: absolute;
		border-style: solid;
		text-align: center;
		height: 38px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__increase i {
		color: #666;
		font-size: 14px;
	}
	
	.attr .el-input-number /deep/ .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		border-radius: 4px;
		padding: 0 40px;
		outline: none;
		color: #666;
		background: #FFF;
		display: inline-block;
		width: 100%;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		height: 40px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header {
		border: 0;
		margin: 0;
		background: none;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item {
		border: 2px solid #dbd9f4;
		padding: 0 20px;
		margin: 0 4px 0 0;
		color: #999;
		background: none;
		font-weight: 500;
		display: inline-block;
		font-size: 14px;
		line-height: 40px;
		position: relative;
		list-style: none;
		height: 40px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item:hover {
		border: 2px solid #dbd9f4;
		margin: 0 4px 0 0;
		color: #ab85d3;
		background: #FFF;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item.is-active {
		border: 2px solid #dbd9f4;
		margin: 0 4px 0 0;
		color: #ab85d3;
		background: radial-gradient(circle, rgba(248,247,254,1) 0%, rgba(204,202,240,1) 100%);
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__content {
		padding: 15px;
	}
	
	.detail-preview .detail.el-tabs .add /deep/ .el-form-item__label {
		padding: 0 10px 0 0;
		color: #666;
		width: 20%;
		font-size: 14px;
		line-height: 40px;
		text-align: right;
	}
	
	.detail-preview .detail.el-tabs .add /deep/ .el-textarea__inner {
		border: 1px solid #dfdaeb;
		border-radius: 4px;
		padding: 0 12px;
		outline: none;
		color: #333;
		width: 450px;
		font-size: 14px;
		line-height: 32px;
		height: 120px;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__separator {
		margin: 0 9px;
		color: #ccc;
		font-weight: 500;
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner a {
		color: #333;
		display: inline-block;
	}

	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__inner {
		color: #666;
		display: inline-block;
	}
	
	.el-pagination /deep/ .el-pagination__total {
		margin: 0 10px 0 0;
		color: #666;
		font-weight: 400;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px 0 40%;
		color: #999;
		background: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #999;
		background: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-prev:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .btn-next:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #C0C4CC;
		background: #fff;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager {
		padding: 0;
		margin: 0;
		display: inline-block;
		vertical-align: top;
	}
	
	.el-pagination /deep/ .el-pager .number {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #999;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: #fff;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pager .number:hover {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #666;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: rgba(171, 133, 211,.2);
		text-align: center;
		min-width: 30px;
		height: 28px;
}

.el-pagination /deep/ .el-pager .number.active {
		cursor: default;
		padding: 0 4px;
		margin: 0 5px;
		color: #FFF;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: rgba(171, 133, 211,.5);
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes {
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input {
		margin: 0 5px;
		width: 100px;
		position: relative;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 25px 0 8px;
		color: #606266;
		display: inline-block;
		font-size: 13px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
		top: 0;
		position: absolute;
		right: 0;
		height: 100%;
	}
	
	.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
		cursor: pointer;
		color: #C0C4CC;
		width: 25px;
		font-size: 14px;
		line-height: 28px;
		text-align: center;
	}

	.el-pagination /deep/ .el-pagination__jump {
		margin: 0 0 0 24px;
		color: #606266;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input {
		border-radius: 3px;
		padding: 0 2px;
		margin: 0 2px;
		display: inline-block;
		width: 50px;
		font-size: 14px;
		line-height: 18px;
		position: relative;
		text-align: center;
		height: 28px;
	}
	
	.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 3px;
		color: #606266;
		display: inline-block;
		font-size: 14px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
</style>
