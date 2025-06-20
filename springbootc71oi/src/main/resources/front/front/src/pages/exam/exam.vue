<template>
  <div>
    <div class="top-content">
      <div class="top-content-left" v-if="questionList.length > 0">当前第 <el-tag type="danger">{{curQuesIndex + 1}}</el-tag> 道题。未答题目：<el-tag type="danger">{{questionList.length - curQuesIndex - 1}}</el-tag> 道，总题目：<el-tag type="danger">{{questionList.length}}</el-tag> 道。</div>
      <div class="top-content-left" v-else>当前卷子没有题目。未答题目：<el-tag type="danger">0</el-tag> 道，总题目：<el-tag type="danger">0</el-tag> 道。</div>
      <div class="top-content-center" v-cloak>距离考试结束还有 <el-tag type="danger">{{this.hour}}</el-tag> 时 <el-tag type="danger">{{this.minute}}</el-tag> 分 <el-tag type="danger">{{this.second}}</el-tag> 秒</div>
      <div class="top-content-right">
        <el-button type="danger" @click="doneExam(0)">结束考试</el-button>
      </div>
    </div>
    <div class="question-content" v-for="(item, index) in questionList" :key="item.id" v-show="curQuesIndex == index">
      <div class="question-title">
        题目 ({{questionType(item)}}) ({{item.score}}分)：{{item.questionname}}
      </div>
      <div class="question-answer">
        <div v-show="!isSubmit && !end">
          作答：
          <el-select v-model="examrecord.myanswer" placeholder="请选择您的答案" v-if="item.type == 0 || item.type == 2">
            <el-option
              v-for="(option, idx) in JSON.parse(item.options)"
              :key="idx"
              :label="option.text"
              :value="option.code">
            </el-option>
          </el-select>
          <el-select v-model="myanswer" multiple placeholder="请选择您的答案" v-if="item.type == 1">
            <el-option
              v-for="(option, idx) in JSON.parse(item.options)"
              :key="idx"
              :label="option.text"
              :value="option.code">
            </el-option>
          </el-select>
          <el-input style="width: 400px;" v-if="item.type == 3" v-model="examrecord.myanswer" placeholder="请输入答案"></el-input>
        </div>
        <div v-show="isSubmit && !end">
          <div class="question-title">填写答案： {{question.type == 1 ? myanswer.join(',') : examrecord.myanswer}}</div>
          <div v-if="question.answer == examrecord.myanswer" class="question-title"><el-tag type="success">正确</el-tag> 解析：{{question.answer}}, {{question.analysis}}</div>
          <div v-if="question.answer != examrecord.myanswer" class="question-title"><el-tag type="danger">错误</el-tag> 解析：{{question.answer}}, {{question.analysis}}</div>
        </div>
        <div v-show="end">
          <div class="question-title">考试成绩：<el-tag type="danger">{{totalScore}}</el-tag> 分</div>
        </div>
      </div>
      <div class="question-btn">
        <el-button v-show="!isSubmit && !end" type="primary" @click="submitAnswer">提交答案</el-button>
        <el-button v-show="isSubmit && !end" type="success" @click="nextQuestion">下一题</el-button>
        <el-button v-show="end" type="success" @click="doneExam(1)">结束考试</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    //数据集合
    data() {
      return {
        questionList: [],
        curQuesIndex: 0,
        question: {},
        examrecord: {
          analysis: '',
          answer: '',
          myanswer: '',
          myscore: '',
          options: '',
          paperid: '',
          papername: '',
          questionid: '',
          questionname: '',
          score: '',
          userid: localStorage.getItem('userid'),
          username: localStorage.getItem('username')
        },
        myanswer: [],
        totalScore: 0,
        isSubmit: false,
        end: false,
        maxtime: 0,
        timer: null,
        hour: '',
        minute: '',
        second: '',
        user: {}
      }
    },
    created() {
      this.maxtime = this.$route.query.time * 60;
      this.deleteRecords(this.$route.query.id);
      this.getQuestion(this.$route.query.id);
      this.hour = Math.floor(this.maxtime / 60 / 60);
      this.minute = Math.floor(this.maxtime / 60 % 60);
      this.second = Math.floor(this.maxtime % 60);
      this.timer = setInterval(this.countDown, 1000);
      this.$http.get(localStorage.getItem('UserTableName') + '/session', {emulateJSON: true}).then(res => {
        if (res.data.code == 0) {
          this.user = res.data.data;
        }
      });
    },
    //方法集合
    methods: {
      questionType(item) {
        switch (item.type) {
          case 0:
            return '单选题';
          case 1:
            return '多选题';
          case 2:
            return '判断题';
          case 3:
            return '填空题';
        }
      },
      nextQuestion() {
        this.isSubmit = false;
        this.examrecord.myanswer = '';
        if (this.curQuesIndex >= this.questionList.length -1) {
          this.end = true;
          return;
        }
        this.curQuesIndex++;
        this.question = this.questionList[this.curQuesIndex];
      },
      deleteRecords(paperid) {
        this.$http.post(`examrecord/deleteRecords?userid=${localStorage.getItem('userid')}&paperid=${paperid}`).then(res => {});
      },
      getQuestion(paperid) {
        this.$http.get('examquestion/list', {params: {page: 1, limit: 1000, sort: 'sequence', paperid}}).then(res => {
          if (res.data.code == 0) {
            this.questionList = res.data.data.list;
            if (res.data.data.list.length > 0) {
              this.question = res.data.data.list[0];
            }
          }
        });
      },
      submitAnswer() {
        this.examrecord.myanswer = this.question.type == 1 ? this.myanswer.sort().join(',') : this.examrecord.myanswer;
        this.examrecord.analysis = this.question.analysis;
        this.examrecord.answer = this.question.answer;
        this.examrecord.myscore = this.examrecord.myanswer == this.question.answer ? this.question.score : 0;
        this.examrecord.options = this.question.options;
        this.examrecord.username = this.user.xingming;
        this.examrecord.paperid = this.question.paperid;
        this.examrecord.papername = this.question.papername;
        this.examrecord.questionid = this.question.id;
        this.examrecord.questionname = this.question.questionname;
        this.examrecord.score = this.question.score;
        this.totalScore = parseFloat(this.totalScore) + parseFloat(this.examrecord.myscore);
        this.$http.post('examrecord/add', this.examrecord).then(res => {
          if (res.data.code == 0 && this.questionList.length > this.curQuesIndex) {
            this.isSubmit = true;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      },
      doneExam(type) {
        if (type == 0) {
          this.$confirm('确定离开考试?未答题目按0分计', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.end = true;
            if (this.questionList.length == 0) {
              this.$router.push('/index/examPaper');
            }
          });
        } else {
          this.$router.push('/index/examPaper');
        }
      },
      countDown() {
        if (this.maxtime > 0) {
          this.hour = Math.floor((this.maxtime - 1) / 60 / 60);
          this.minute = Math.floor((this.maxtime - 1) / 60 % 60);
          this.second = Math.floor((this.maxtime - 1) % 60);
          --this.maxtime;
        } else {
          clearInterval(this.timer);
          this.end = true;
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top-content {
    height: 80px;
    width: 100%;
    background-color: #409EFF;
    display: flex;
    justify-content: space-between;
  }
  .top-content-left, .top-content-center, .top-content-right {
    font-size: 18px;
    line-height: 80px;
    color: #fff;
  }
  .top-content-left {
    padding-left: 20px;
  }
  .top-content-right {
    padding-right: 20px;
  }
  .question-content {
    width: 90%;
    margin: 0 auto;
    height: 200px;
    margin-top: 30px;
  }
  .question-title, .question-answer, .question-btn {
    padding: 20px 0;
  }
</style>
