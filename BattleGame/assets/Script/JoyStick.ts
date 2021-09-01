// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCenter from "./GameScript/GameCenter";
import MoveAction from "./GameScript/LogicScript/LogicAction/MoveAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JoyStick extends cc.Component {

    public static JOY_STICK;

    @property(cc.Node)
    panel:cc.Node = null;   //大圆

    @property(cc.Node)
    btn:cc.Node = null;     //小圆

    @property(cc.Node)
    controlNode:cc.Node = undefined;

    @property(cc.Integer)
    private panelWidth:number = 130;    //去掉透明区域的大圆宽度

    private panelInitPos:cc.Vec2; //大圆初始位置
    private touchID:number;    //触摸ID

    public dir:cc.Vec3 = new cc.Vec3(0,0,0);  //移动方向
    public angle:number = 0;   //弧度(角度)
    public moving:boolean = false; //是否正在移动

    onLoad(){
        this.panelInitPos =  new cc.Vec2(this.panel.x, this.panel.y);
        JoyStick.JOY_STICK = this;
        
    }

    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onGameOver(){
        this.stop();
    }

    public stop(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

        this.moving = false;
        this.enabled = false;
    }

    private onTouchStart(e:cc.Touch){
        let pos = this.node.convertToNodeSpaceAR(e.getLocation());
        this.panel.setPosition(pos);
        this.btn.setPosition(0,0);
        this.touchID = e.getID();

        this.moving = false;
        this.enabled = true;
    }

    private onTouchMove(e:cc.Touch){
        if(this.touchID != e.getID()){
            return;
        }
        //小圆移动
        let posDelta = e.getDelta();
        this.btn.x += posDelta.x;
        this.btn.y += posDelta.y;
        //正在移动
        this.moving = true;
    }

    update(dt){
        
    }

    lateUpdate(dt){
        if(this.moving){
            //将小圆限制大圆范围内
            let ratio = this.btn.position.mag() / this.panelWidth;
            if (ratio > 1) {
                this.btn.setPosition(this.btn.position.div(ratio));
            }
            //获取向量归一化
            this.dir = this.btn.position.normalizeSelf();
            //获取弧度
            this.angle = Math.atan2(this.btn.y, this.btn.x);
            
            const action:MoveAction = new MoveAction(1+"",this.dir);
           GameCenter.GAME_CENTER.pushLoginAction(action)
        }
    }

    private onTouchEnd(e:cc.Touch){
        console.log("end");
        if(this.touchID != e.getID()){
            return;
        }
        this.panel.setPosition(this.panelInitPos);
        this.btn.setPosition(0,0);
        this.moving = false;
        this.enabled = false;
    }

    private onTouchCancel(e:cc.Touch){
        console.log("cancel");
        if(this.touchID != e.getID()){
            return;
        }
        this.panel.setPosition(this.panelInitPos);
        this.btn.setPosition(0,0);
        this.moving = false;
        this.enabled = false;
    }

    onDestroy(){
        this.stop();
    }

}