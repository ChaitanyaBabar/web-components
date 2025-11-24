export interface OverlayInfo {
    todos: any[];
    highestTodo: any;
    iconSrc: string;
    typeId: string;
    overlayPriority: string;
    overlayClickCallback: Function;
    msg: string;
}

export class OverlayInfoImpl implements OverlayInfo {
    
    todos: never[];
    highestTodo: null;
    iconSrc: string;
    typeId: string;
    overlayPriority: string;
    overlayClickCallback: (event: any) => void;
    msg: string;



    constructor() {
        this.todos = [];
        this.highestTodo = null;
        this.iconSrc = '';
        this.typeId = '';
        this.overlayPriority = '';
        this.overlayClickCallback = (event: any) => {};
        this.msg = '';
    }
}