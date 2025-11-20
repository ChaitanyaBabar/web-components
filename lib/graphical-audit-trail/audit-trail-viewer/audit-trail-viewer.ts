import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { provide } from "@lit/context";
import { AuditTrailService, AuditTrailServiceContext, AuditTrailServiceImpl } from "../audit-trail-service";




@customElement("audit-trail-viewer")
export class AuditTrailViewer extends LitElement {

    private selectedTask: string | null = null;
    private processInstance: string | null = null;


    @provide({ context: AuditTrailServiceContext })
    private _auditTrailService: AuditTrailService = new AuditTrailServiceImpl();

    static styles = css`
        div {
            color: blue;
        }
    `;

    constructor() {
        super();
        this.selectedTask = "_7fju4I_MEfCCSrkQV0fGYA";
        this.processInstance = "p:0a20b";
    }
    

    override render() {
        return html`
            <div>CB Audit Trail Viewer !!!</div>
            <audit-trail .processInstance=${this.processInstance} .selectedTask=${this.selectedTask}></audit-trail>
            `;
    }

    onAuditTrailComplete(event: any){
        console.log('Audit Trail Complete Event Received: ', event);
    }

    onAuditTaskSelected(event: any){
        console.log('Audit Task Selected Event Received: ', event);
    }
 
}

declare global {
  interface HTMLElementTagNameMap {
    "audit-trail-viewer": AuditTrailViewer;}
}

