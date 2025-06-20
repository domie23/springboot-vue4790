export function isAuth(tableName, key) {
  let role = localStorage.getItem("UserTableName");
  let menus = [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-taxi","buttons":["新增","查看","修改","删除","用户性别统计","首页总数","首页统计"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"appFrontIcon":"cuIcon-time","buttons":["新增","查看","修改","删除"],"menu":"菜品分类","menuJump":"列表","tableName":"caipinfenlei"}],"menu":"菜品分类管理"},{"child":[{"appFrontIcon":"cuIcon-pic","buttons":["新增","查看","修改","删除","菜谱分类统计","查看评论","首页总数","首页统计"],"menu":"菜谱信息","menuJump":"列表","tableName":"caipuxinxi"}],"menu":"菜谱信息管理"},{"child":[{"appFrontIcon":"cuIcon-link","buttons":["查看","删除"],"menu":"笔记信息","menuJump":"列表","tableName":"bijixinxi"}],"menu":"笔记信息管理"},{"child":[{"appFrontIcon":"cuIcon-discover","buttons":["查看","回复","删除"],"menu":"留言板管理","tableName":"messages"}],"menu":"留言板管理"},{"child":[{"appFrontIcon":"cuIcon-group","buttons":["查看","删除"],"menu":"饮食论坛","tableName":"forum"}],"menu":"饮食论坛"},{"child":[{"appFrontIcon":"cuIcon-copy","buttons":["新增","查看","修改","删除"],"menu":"趣味答题管理","tableName":"exampaper"}],"menu":"趣味答题管理"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["新增","查看","修改","删除"],"menu":"试题管理","tableName":"examquestion"}],"menu":"试题管理"},{"child":[{"appFrontIcon":"cuIcon-rank","buttons":["查看","修改"],"menu":"轮播图管理","tableName":"config"},{"appFrontIcon":"cuIcon-news","buttons":["查看","修改"],"menu":"关于我们","tableName":"aboutus"},{"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"公告信息","tableName":"news"},{"appFrontIcon":"cuIcon-news","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"},{"appFrontIcon":"cuIcon-service","buttons":["新增","查看","修改","删除"],"menu":"在线咨询","tableName":"chat"},{"appFrontIcon":"cuIcon-form","buttons":["新增","查看","修改","删除"],"menu":"智能助手","tableName":"chathelper"}],"menu":"系统管理"},{"child":[{"appFrontIcon":"cuIcon-taxi","buttons":["查看","删除"],"menu":"考试记录","tableName":"examrecord"},{"appFrontIcon":"cuIcon-explore","buttons":["查看","删除"],"menu":"错题本","tableName":"examfailrecord"}],"menu":"考试管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-present","buttons":["查看","查看评论"],"menu":"菜谱信息列表","menuJump":"列表","tableName":"caipuxinxi"}],"menu":"菜谱信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-link","buttons":["新增","查看","修改","删除"],"menu":"笔记信息","menuJump":"列表","tableName":"bijixinxi"}],"menu":"笔记信息管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-present","buttons":["查看","查看评论"],"menu":"菜谱信息列表","menuJump":"列表","tableName":"caipuxinxi"}],"menu":"菜谱信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"用户","tableName":"yonghu"}];
  for(let i=0;i<menus.length;i++){
    if(menus[i].tableName==role){
      for(let j=0;j<menus[i].frontMenu.length;j++){
          for(let k=0;k<menus[i].frontMenu[j].child.length;k++){
            if(tableName==menus[i].frontMenu[j].child[k].tableName){
              let buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
              return buttons.indexOf(key) !== -1 || false
            }
          }
      }
    }
  }
  return false;
}

/**
 *  * 获取当前时间（yyyy-MM-dd hh:mm:ss）
 *   */
export function getCurDateTime() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate(),
    hour = currentTime.getHours(),
    minute = currentTime.getMinutes(),
    second = currentTime.getSeconds();
    return year + "-" + month + "-" + day + " " +hour +":" +minute+":"+second;
}

/**
 *  * 获取当前日期（yyyy-MM-dd）
 *   */
export function getCurDate() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
    return year + "-" + month + "-" + day;
}
