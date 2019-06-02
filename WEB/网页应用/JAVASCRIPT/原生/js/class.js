class Vue{
    constructor(){
        this.testVal=0
    }
    get test(){
        return this.testVal
    }
    set test(val){
        if(val<=10){
            this.testVal=100
        }else{
            this.testVal=10
        }
    }
}
let app = new Vue()
console.log(app.test)
app.test=10
console.log(app.test)