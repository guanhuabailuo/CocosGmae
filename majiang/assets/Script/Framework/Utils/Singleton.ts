export function Singleton<T>() {
    class SingletonE {
        protected constructor() {}
        private static _inst: SingletonE = null;
        public static get inst(): T {
            if(SingletonE._inst == null) {
                SingletonE._inst = new this();
            }
            return SingletonE._inst as T;
        }
    }

    return SingletonE;
}

// export class Singleton {

//     static getInstance<T extends {}>(this: new () => T): T {
//         if (!(<any>this).inst) {
//             (<any>this).inst = new this();
//         }
//         return (<any>this).inst;
//     }
// }


/**
 * 
 * class Test extends Singleton<Test>() {
    abc = 0;
    functionXXX() {
    }
}
 */