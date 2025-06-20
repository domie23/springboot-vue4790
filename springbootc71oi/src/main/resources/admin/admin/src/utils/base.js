const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootc71oi/",
            name: "springbootc71oi",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springbootc71oi/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "饮食分享平台"
        } 
    }
}
export default base
