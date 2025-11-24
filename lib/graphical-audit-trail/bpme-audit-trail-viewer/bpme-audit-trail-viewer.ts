import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { AuditTrailService, AuditTrailServiceContext, AuditTrailServiceImpl } from "../audit-trail-service";




@customElement("bpme-audit-trail-viewer")
export class BPMEAuditTrailViewer extends LitElement {

    private selectedTask: string | null = null;

    @property({type: String}) 
    processInstance: string | null = null;


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

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListeners();
    }
    

    override render() {
        return html`
            <div>CB Audit Trail Viewer !!!</div>

            ${this.processInstance ? html`<bpme-audit-trail .processInstance=${this.processInstance} .selectedTask=${this.selectedTask}></bpme-audit-trail>` : html`<div>Loading AuditTrail.</div>` }
            `;
    }

    onAuditTrailComplete(event: any){
        console.log('Audit Trail Complete Event Received: ', event);
    }

    onAuditTaskSelected(event: any){
        console.log('Audit Task Selected Event Received: ', event);
    }


    addEventListeners(){
        if(this.shadowRoot){
            this.shadowRoot.addEventListener('bpme-subprocess-clicked', (event: Event) => {
                this.processInstance = 'subprocess';
            });
        }
    }

 
}

declare global {
  interface HTMLElementTagNameMap {
    "audit-trail-viewer": BPMEAuditTrailViewer;}
}

