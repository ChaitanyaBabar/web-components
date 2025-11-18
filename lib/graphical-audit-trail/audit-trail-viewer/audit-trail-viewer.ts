import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AnnotateService, AnnotateServiceContext, AnnotateServiceImpl } from "../annotate-service";
import { provide } from "@lit/context";
import { AnnotateUtilityContext, AnnotationUtility, AnnotationUtilityImpl } from "../annotate-utility";
import { AuditTrailService, AuditTrailServiceContext, AuditTrailServiceImpl } from "../audit-trail-service";




@customElement("audit-trail-viewer")
class AuditTrailViewer extends LitElement {

    private selectedWorkItem: string | null = null;
    private processInstance: string | null = null;

    @provide({ context: AnnotateServiceContext })
    private _annotateService: AnnotateService = new AnnotateServiceImpl();

    @provide({ context: AnnotateUtilityContext })
    private _annotateUtility: AnnotationUtility = new AnnotationUtilityImpl();


    @provide({ context: AuditTrailServiceContext })
    private _auditTrailService: AuditTrailService = new AuditTrailServiceImpl();

    static styles = css`
        div {
            color: blue;
        }
    `;

    constructor() {
        super();
        this.selectedWorkItem = "_7fju4I_MEfCCSrkQV0fGYA";
        this.processInstance = "p:0a20b";
    }
    

    override render() {
        return html`
            <div>CB Audit Trail Viewer !!!</div>
            <audit-trail .processInstance=${this.processInstance} .selectedWorkItem=${this.selectedWorkItem}></audit-trail>
            `;
    }

    onAuditTrailComplete(event: any){
        console.log('Audit Trail Complete Event Received: ', event);
    }

    onAuditTaskSelected(event: any){
        console.log('Audit Task Selected Event Received: ', event);
    }
 
}

