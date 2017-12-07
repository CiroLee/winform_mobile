class winForm {
    constructor(selector){
        this.selector = selector;
        this.startPos;
        this.endPos;
    }
    //移除元素，私有函数
    _removeElement(element){
        let parent = element.parentNode;
        if(parent){
            parent.removeChild(element);
        }
    }
    _getPos(event){
        let posx = event.touches[0].pageX;
        let posy = event.touches[0].pageY;
        return {
            x:posx,
            y:posy
        }
    }
    //移除加载层，公共函数,移除loading
    remoeLoading(){
        let removeElement = document.getElementsByClassName('box-load')[0];
        removeElement.style.opacity = 0;
        removeElement.style.transition="0.3s";
        setTimeout(()=>{removeElement.parentNode.removeChild(removeElement)},300);
    }
    //提示层，上滑动消失
    alert(message,hex=null,type=0){
        let alertElement = document.createElement('div');
        let msgElement = document.createElement('span');
        alertElement.className = 'alertform';
        msgElement.className = 'alert-span';
        msgElement.innerHTML = message;

        alertElement.style.boxShadow=`0 4px 12px -4px ${hex}`;

        /*外层元素添加事件,上滑消失**/
        //获取起始坐标
        alertElement.addEventListener('touchstart',(event)=>{
            event.preventDefault();
            this.startPos = this._getPos(event);
        },false);
        //滑动过程称计算相关值
        alertElement.addEventListener('touchmove',()=>{
            this.endPos = this._getPos(event);
            
        },false);
        //结束滑动，判断，移除元素
        alertElement.addEventListener('touchend',()=>{
            let deltax = this.endPos.x - this.startPos.x;
            let deltay = this.endPos.y - this.startPos.y;
            let angle = parseInt(Math.abs(Math.atan(deltay/deltax)*180/Math.PI));

            if(angle > 70 && deltay < -10){
                alertElement.className +=" " + "leave-up";
                setTimeout(()=>{
                    this._removeElement(alertElement);
                },1000);
            }
        }
        ,false);

        /***
         type = 0,自动消失,type = 1,不能自动消失，默认type = 0
        ***/

        if(type == 0){
            setTimeout(()=>{
                alertElement.className +=" " + "leave-up";
                setTimeout(()=>{
                    this._removeElement(alertElement);
                },1000);
            },3000);
        }
        
        
        document.getElementById(this.selector).appendChild(alertElement);
        alertElement.appendChild(msgElement);
    }
    //简单提示层
    tips(message,time=2.0,location="center"){
        let tipsElement = document.createElement('div');
        let msgElement = document.createElement('span');
        tipsElement.className = 'tipsform';
        msgElement.className = 'tips-span';
        msgElement.innerHTML = message;
        
        switch(location){
            case "top":
            tipsElement.style.top=50+"px";
            break;
            case "bottom":
            tipsElement.style.top="80%";
            tipsElement.style.bottom=50+'px';
        }

        setTimeout(()=>{
            this._removeElement(tipsElement);
        },time*1000);

        document.getElementById(this.selector).appendChild(tipsElement);
        tipsElement.appendChild(msgElement);
    }
    //信息确认层
    confirm(message,hex = null,callback=null){
        let confirmElement = document.createElement('div');
        let quitBtnElement = document.createElement('button');
        let sureBtnElement = document.createElement('button');
        let msgElement = document.createElement('span');

        quitBtnElement.innerHTML = "取消";
        sureBtnElement.innerHTML = "确认";
        quitBtnElement.className = 'confirm-btn quit-btn';
        sureBtnElement.className = 'confirm-btn sure-btn';
        confirmElement.className = 'confirm-form';
        msgElement.className = 'tips-span confirm-span';
        confirmElement.style.boxShadow = `0 6px 20px 0px ${hex}`;
        msgElement.innerHTML = message;

        quitBtnElement.addEventListener('touchstart',()=>{
            this._removeElement(confirmElement);
        },false);

        sureBtnElement.addEventListener('touchstart',()=>{
            this._removeElement(confirmElement);
            if(callback!= null){
                callback();
            }
            else{
                console.log("no callback");
            }
            
        },false);

        document.getElementById(this.selector).appendChild(confirmElement);
        confirmElement.appendChild(msgElement);
        confirmElement.appendChild(quitBtnElement);
        confirmElement.appendChild(sureBtnElement);
    }
    loading(type = 0,objects,callback = null){
        
        // objects = {
        //         text:'hahah',
        //         ballcolor:'#ff0000',
        //         textcolor:'#fff',
        // }

        let boxElement = document.createElement('div');
        let first_ball = document.createElement('span');
        let second_ball = document.createElement('span');
        let third_ball = document.createElement('span');
        first_ball.className = second_ball.className = third_ball.className = 'ball-span';
        second_ball.style.animationDelay = '-1s';
        third_ball.style.animationDelay = '0.6s';
        boxElement.className = 'box-load';

        if(type == 1){
            let objectbool = Object.prototype.toString.call(arguments[1]) === '[object Object]';

            if(objectbool && JSON.stringify(arguments[1]) != '{}'){
                let textElement = document.createElement('span');
                textElement.className = 'loading-text'
                textElement.innerHTML = objects.text;
                textElement.style.color = objects.textcolor;
                first_ball.style.backgroundColor = second_ball.style.backgroundColor = third_ball.style.backgroundColor = objects.ballcolor;
                boxElement.appendChild(textElement);

            }
        }

        if(callback !=null){
            callback();
        }

        

        document.getElementById(this.selector).appendChild(boxElement);
        boxElement.appendChild(first_ball);
        boxElement.appendChild(second_ball);
        boxElement.appendChild(third_ball);
    }
}
