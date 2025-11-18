var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AnnotateServiceContext, AnnotateServiceImpl } from "../annotate-service";
import { provide } from "@lit/context";
import { AnnotateUtilityContext, AnnotationUtilityImpl } from "../annotate-utility";
import { AuditTrailServiceContext, AuditTrailServiceImpl } from "../audit-trail-service";
let AuditTrailViewer = class AuditTrailViewer extends LitElement {
    constructor() {
        super();
        this.selectedWorkItem = null;
        this.processInstance = null;
        this._annotateService = new AnnotateServiceImpl();
        this._annotateUtility = new AnnotationUtilityImpl();
        this._auditTrailService = new AuditTrailServiceImpl();
        this.selectedWorkItem = "_7fju4I_MEfCCSrkQV0fGYA";
        this.processInstance = "p:0a20b";
    }
    render() {
        return html `
            <div>CB Audit Trail Viewer !!!</div>
            <audit-trail .processInstance=${this.processInstance} .selectedWorkItem=${this.selectedWorkItem}></audit-trail>
            `;
    }
    onAuditTrailComplete(event) {
        console.log('Audit Trail Complete Event Received: ', event);
    }
    onAuditTaskSelected(event) {
        console.log('Audit Task Selected Event Received: ', event);
    }
};
AuditTrailViewer.styles = css `
        div {
            color: blue;
        }
    `;
__decorate([
    provide({ context: AnnotateServiceContext })
], AuditTrailViewer.prototype, "_annotateService", void 0);
__decorate([
    provide({ context: AnnotateUtilityContext })
], AuditTrailViewer.prototype, "_annotateUtility", void 0);
__decorate([
    provide({ context: AuditTrailServiceContext })
], AuditTrailViewer.prototype, "_auditTrailService", void 0);
AuditTrailViewer = __decorate([
    customElement("audit-trail-viewer")
], AuditTrailViewer);
