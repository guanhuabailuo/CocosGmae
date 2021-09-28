// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property,executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class RingLaout extends cc.Component {

    @property({tooltip:"半径"})
    radius:number = 100;

    @property({tooltip:"顺时针"})
    clockwise:boolean = true;

    @property({tooltip:"起始角度"})
    startAngle:number = 0;
    _startAngle:number = 0;

    _currentAngle:number = 0;

    @property({range:[0,360],tooltip:"扇形的总角度"})
    allAngle:number = 90;

    @property({tooltip:"是否旋转"})
    rotato:boolean = false;

    @property({tooltip:"旋转速度"})
    rotatoSpeed:number = 10;

    @property({tooltip:"子物体是否跟随旋转"})
    followRotato:boolean = false;

    _childCount:number = 0;

    start () {
        this.recaculateLaout();
        this._childCount = this.node.childrenCount;
        this._currentAngle = this.startAngle;
        this._startAngle = this.startAngle;
        
    }

    update(dt){
        let update = false;
        if(this.rotato){
            update = true;
            if(this.clockwise){
                this._startAngle += this.rotatoSpeed*dt
                if(this._startAngle > 360){
                    this._startAngle -= 360
                }
            }else{
                this._startAngle -= this.rotatoSpeed*dt
                if(this._startAngle < -360){
                    this._startAngle += 360
                }
            }
        }

        if(CC_EDITOR){
            update = false;
        }

        if(this._childCount != this.node.childrenCount || update){
            this._childCount = this.node.childrenCount;
            this._childCount = this._currentAngle;
            this.recaculateLaout();
        }
        
        
    }

    recaculateLaout(){
        let children =  this.node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            let angle = this.calculateChildPosition(i)
            let radian = angle*Math.PI/180;
            let x = Math.sin(radian)*this.radius;
            let y = Math.cos(radian)*this.radius;
            child.position = new cc.Vec3(x,y,0);
            if(this.followRotato){
                child.angle = -angle;
            }
        }
    }

    calculateChildPosition(index:number):number{
        if(this.node.childrenCount == 1){
            return this._startAngle;
        }
        let angle:number = this.allAngle/(this.node.childrenCount)*index+this._startAngle;
        
        
        if(!this.clockwise){
            angle = -angle;
            if(angle < -360){
                angle += 360;
            }
        }else{
            if(angle > 360){
                angle -= 360;
            }
        }
        return angle;
    }


}
