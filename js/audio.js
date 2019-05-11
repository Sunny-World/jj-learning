//--语音播报---------------------------------------------------------------------
class Audio{
    constructor(){}
    /**
     * 播放音频
     * @param {音频地址} url 
     */
    playUrl(url,fn){
        let audio = document.createElement('audio') //生成一个audio元素 
        audio.controls = true //这样控件才能显示出来 
        audio.hidden = true
        audio.src = url //音乐的路径 
        audio.play();   //播放音频
        audio.onended = function () {
            audio.remove()
            if(typeof fn === "function"){
                fn()
            }
        } 
    }
}

module.exports=new Audio()