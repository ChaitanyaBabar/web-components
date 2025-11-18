export class OverlayInfoImpl {
    constructor() {
        this.todos = [];
        this.highestTodo = null;
        this.iconSrc = '';
        this.typeId = '';
        this.overlayPriority = '';
        this.overlayClickCallback = (event) => { };
        this.msg = '';
    }
}
