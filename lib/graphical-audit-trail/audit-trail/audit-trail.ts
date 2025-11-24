import { LitElement, PropertyValues, html, unsafeCSS } from "lit";
import {customElement, property, query, state} from 'lit/decorators.js';
import { emit } from "../../internal/event/event";
// @ts-ignore
import styles from './audit-trail.css?raw';


@customElement("audit-trail")
export class AuditTrail extends LitElement {

    @property({type: Object}) 
    selectedTask?: any | null;

    @property({type: String}) 
    processInstance?: string | null;

    @state()
    private _diagramModel: any = null;

    @property({state: true, type: Object})
    auditTrailData?: any | null;


    @state()
    processInstanceDiagramModelUrl?: string = '';



    static override styles = [
        unsafeCSS(styles)
    ];

    private svgMouseOverHandler?: (evt: any) => void;
    private svgMouseOutHandler?: (evt: any) => void;
    private objectMouseClickHandler?: (evt: any) => void;

    config: any = {"top":100,"skip":0,"orderby":"creationTime desc","reference":""};




    constructor() {
        super();

        // Register SVG event handlers on window object
        this.registerSvgHandlers();
    }


    override render() {
        return html`
            <div>Audit Trail Component Loaded</div>

            <div>Selected Work Item: ${this.selectedTask}</div>
            <div>Process Instance: ${this.processInstance}</div>

            ${this.auditTrailData ? html`<div>Audit Trail Data EeventId: ${this.auditTrailData[0].eventId}</div>` : html`<div>Loading Audit Trail Data...</div>` }


            CODE CLEAN UP IN PROGRESS !!! bpme-process-diagarm-component !!!

            <bpme-process-diagram .diagramModel=${this._diagramModel} .auditTrailData=${this.auditTrailData} @bpm-diagram-selection-changed=${this._onDiagramSelectionChanged} @bpm-diagram-ready=${this._onBpmDiagramReady}></bpme-process-diagram>
        `;
    }


    async fetchAuditData() {
       
       if(this.processInstanceDiagramModelUrl) 
        fetch(this.processInstanceDiagramModelUrl).then(response => response.json()).then(data => {
                this._diagramModel = data;

                const mockCall = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            data: [{"eventId":"263","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_SUBPROCESS_CREATED","message":"Sub-process Instance created.","severity":"Audit","creationTime":"2025-11-17T15:02:56.663Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"SYNC","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","applicationActivityInstanceId":"t:002gy.31","subprocessInstanceId":"p:0a20z","subprocessName":"BPMBusinessSubProcessProcess","processPriority":"NORMAL","moduleName":"BPMProcess","subprocessVersion":"1.0.0.20251024140914996","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"processInstanceId","value":"34"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"processInstanceStateChange"},{"name":"methodName","value":"processInstanceStateChange"},{"name":"contextId","value":"3ea06f3a_3c9d_432a_a244_a752181b770e"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"be922c1c_1320_4ac2_8889_e3e1ab3810aa"},{"name":"threadName","value":"ce_7"},{"name":"threadId","value":"824"},{"name":"parentContextId","value":"fca75860_9a4b_4667_9863_7c3548996508"},{"name":"correlationId","value":"cbc45446_fffc_4762_bfdf_348092d5088c"},{"name":"subprocessTemplateId","value":"p:0a21w"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"262","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_CREATED","message":"Task created.","severity":"Audit","creationTime":"2025-11-17T15:02:56.555Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"reusableSubProcess","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","applicationActivityName":"CallSubProcess","applicationActivityModelId":"_DxnXQLDgEfCKCv84icLsWg","applicationActivityInstanceId":"t:002gy.31","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"beforeExecution"},{"name":"methodName","value":"beforeExecution"},{"name":"contextId","value":"3ea06f3a_3c9d_432a_a244_a752181b770e"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"9dee36e4_28cc_4ba9_b4b5_0bd533f4321c"},{"name":"threadName","value":"ce_7"},{"name":"threadId","value":"824"},{"name":"parentContextId","value":"fca75860_9a4b_4667_9863_7c3548996508"},{"name":"correlationId","value":"cbc45446_fffc_4762_bfdf_348092d5088c"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"261","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_COMPLETED","message":"Task completed.","severity":"Audit","creationTime":"2025-11-17T15:02:56.543Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"userTask","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","extendedMessage":"11124","applicationActivityName":"ConditionMatchedUserTask","applicationActivityModelId":"_kFtxwLDVEfCKCv84icLsWg","applicationActivityInstanceId":"t:002gy.30","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"afterExecution"},{"name":"methodName","value":"afterExecution"},{"name":"contextId","value":"3ea06f3a_3c9d_432a_a244_a752181b770e"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"71ff6ec9_ea76_47ef_9c5e_1401537363ed"},{"name":"threadName","value":"ce_7"},{"name":"threadId","value":"824"},{"name":"parentContextId","value":"fca75860_9a4b_4667_9863_7c3548996508"},{"name":"correlationId","value":"cbc45446_fffc_4762_bfdf_348092d5088c"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"256","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_CREATED","message":"Task created.","severity":"Audit","creationTime":"2025-11-17T15:02:45.408Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"userTask","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","applicationActivityName":"ConditionMatchedUserTask","applicationActivityModelId":"_kFtxwLDVEfCKCv84icLsWg","applicationActivityInstanceId":"t:002gy.30","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"beforeExecution"},{"name":"methodName","value":"beforeExecution"},{"name":"contextId","value":"405fc22c_dc73_48b6_b4b5_1e6d12f714c8"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"b94fc52f_e342_4e3a_910b_c39a314e371d"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"eef5ab33_72ae_49ac_9e7a_0f020130525e"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"255","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_COMPLETED","message":"Task completed.","severity":"Audit","creationTime":"2025-11-17T15:02:45.403Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"scriptTask","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","extendedMessage":"80","applicationActivityName":"ScriptTask","applicationActivityModelId":"_7fju4I_MEfCCSrkQV0fGYA","applicationActivityInstanceId":"t:002gy.2x","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"afterExecution"},{"name":"methodName","value":"afterExecution"},{"name":"contextId","value":"405fc22c_dc73_48b6_b4b5_1e6d12f714c8"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"30701cd6_6254_4075_9087_6da57dd8ef8c"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"eef5ab33_72ae_49ac_9e7a_0f020130525e"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"254","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_CREATED","message":"Task created.","severity":"Audit","creationTime":"2025-11-17T15:02:45.318Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"scriptTask","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","applicationActivityName":"ScriptTask","applicationActivityModelId":"_7fju4I_MEfCCSrkQV0fGYA","applicationActivityInstanceId":"t:002gy.2x","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"beforeExecution"},{"name":"methodName","value":"beforeExecution"},{"name":"contextId","value":"405fc22c_dc73_48b6_b4b5_1e6d12f714c8"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"e49e1d00_a76a_41a7_adad_c93eb4475648"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"eef5ab33_72ae_49ac_9e7a_0f020130525e"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"253","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_COMPLETED","message":"Task completed.","severity":"Audit","creationTime":"2025-11-17T15:02:45.312Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"exclusiveGateway","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","extendedMessage":"237","applicationActivityName":"Decide","applicationActivityModelId":"_Q6ffEI_QEfCCSrkQV0fGYA","applicationActivityInstanceId":"t:002gy.2y","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"afterExecution"},{"name":"methodName","value":"afterExecution"},{"name":"contextId","value":"405fc22c_dc73_48b6_b4b5_1e6d12f714c8"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"b0457fc5_35b8_4756_a8f0_55af66aca7d8"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"eef5ab33_72ae_49ac_9e7a_0f020130525e"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"252","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_CREATED","message":"Task created.","severity":"Audit","creationTime":"2025-11-17T15:02:45.067Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"exclusiveGateway","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","applicationActivityName":"Decide","applicationActivityModelId":"_Q6ffEI_QEfCCSrkQV0fGYA","applicationActivityInstanceId":"t:002gy.2y","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"beforeExecution"},{"name":"methodName","value":"beforeExecution"},{"name":"contextId","value":"405fc22c_dc73_48b6_b4b5_1e6d12f714c8"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"2a7683f7_3680_4f52_9c6d_020355daa45b"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"eef5ab33_72ae_49ac_9e7a_0f020130525e"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"251","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_COMPLETED","message":"Task completed.","severity":"Audit","creationTime":"2025-11-17T15:02:45.052Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"userTask","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","extendedMessage":"40707","applicationActivityName":"UserTask","applicationActivityModelId":"_6FKNcI_MEfCCSrkQV0fGYA","applicationActivityInstanceId":"t:002gy.2w","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"afterExecution"},{"name":"methodName","value":"afterExecution"},{"name":"contextId","value":"405fc22c_dc73_48b6_b4b5_1e6d12f714c8"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"8cf0fbcb_76e3_451c_a98e_76dbd938f0b4"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"eef5ab33_72ae_49ac_9e7a_0f020130525e"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"246","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_CREATED","message":"Task created.","severity":"Audit","creationTime":"2025-11-17T15:02:04.337Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"userTask","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","applicationActivityName":"UserTask","applicationActivityModelId":"_6FKNcI_MEfCCSrkQV0fGYA","applicationActivityInstanceId":"t:002gy.2w","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"beforeExecution"},{"name":"methodName","value":"beforeExecution"},{"name":"contextId","value":"bcb72a53_cfb1_403b_a5bb_c1a73cfe5200"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"1543c5d8_fff4_40eb_8567_270826fd3395"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"f77477f5_ba6e_43fb_9aa9_6a1cb4197f4d"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"245","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_COMPLETED","message":"Task completed.","severity":"Audit","creationTime":"2025-11-17T15:02:04.331Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"startEvent","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","extendedMessage":"1","applicationActivityName":"StartEvent","applicationActivityModelId":"_1Ie4EY_MEfCCSrkQV0fGYA","applicationActivityInstanceId":"t:002gy.2u","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"afterExecution"},{"name":"methodName","value":"afterExecution"},{"name":"contextId","value":"bcb72a53_cfb1_403b_a5bb_c1a73cfe5200"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"7f55cc5e_2824_4198_b2e5_a824137b7c94"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"f77477f5_ba6e_43fb_9aa9_6a1cb4197f4d"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"244","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_TASKS_CREATED","message":"Task created.","severity":"Audit","creationTime":"2025-11-17T15:02:04.327Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","managedObjectType":"startEvent","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","applicationActivityName":"StartEvent","applicationActivityModelId":"_1Ie4EY_MEfCCSrkQV0fGYA","applicationActivityInstanceId":"t:002gy.2u","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"beforeExecution"},{"name":"methodName","value":"beforeExecution"},{"name":"contextId","value":"bcb72a53_cfb1_403b_a5bb_c1a73cfe5200"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"5cfae719_e79a_4ead_a374_f92dcf20a668"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"f77477f5_ba6e_43fb_9aa9_6a1cb4197f4d"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]},{"eventId":"243","messageCategory":"ProcessInstance","messageId":"BX_INSTANCE_PROCESS_STARTED","message":"Process Instance started.","severity":"Audit","creationTime":"2025-11-17T15:02:04.319Z","managedObjectId":"p:0a20y","principalId":"tibco-admin","managedObjectName":"BPMProcessProcess","managedObjectVersion":"1.0.0.20251024140759075","parentObjectId":"p:0a21x","applicationName":"ContainerEngineApp","processPriority":"NORMAL","moduleName":"BPMProcess","additionalAttributes":[{"name":"hostName","value":"bpm-host"},{"name":"processInstanceId","value":"34"},{"name":"componentId","value":"BX"},{"name":"componentClassName","value":"com.tibco.bx.n2.ec.BxAuditTrail"},{"name":"procId","value":"33"},{"name":"procInstanceId","value":"34"},{"name":"methodId","value":"processInstanceStateChange"},{"name":"methodName","value":"processInstanceStateChange"},{"name":"contextId","value":"bcb72a53_cfb1_403b_a5bb_c1a73cfe5200"},{"name":"simpleClassName","value":"BxAuditTrail"},{"name":"eventType","value":"MESSAGE"},{"name":"uuid","value":"dddf3f6f_d951_44c8_913a_5633f20406e8"},{"name":"threadName","value":"ce_0"},{"name":"threadId","value":"817"},{"name":"parentContextId","value":"f77477f5_ba6e_43fb_9aa9_6a1cb4197f4d"},{"name":"correlationId","value":"36b4852b_7f81_4499_9cf6_a8a565e06a36"},{"name":"hostAddress","value":"172.20.0.5"}]}]
                        });
                    }, 3000);

                });

                mockCall.then((response: any) => {
                    this.auditTrailData = response.data;
                });
        }, error => {
            console.error('Error fetching audit process model:', error);
        });
    }
    
    
    connectedCallback(): void {
        super.connectedCallback();
        this.loadDiagramCSS();
    }

    private loadDiagramCSS(): void {
        const materialIconsStyleTag : HTMLLinkElement = document.createElement('link');
        materialIconsStyleTag.href  = "../../../styles/iconfont/material-icons.css";
        materialIconsStyleTag.rel = "stylesheet";
        document.head.appendChild(materialIconsStyleTag);
    }

    
    private registerSvgHandlers(): void {
        this.svgMouseOverHandler = (evt: any) => this.handleSvgMouseOver(evt);
        this.svgMouseOutHandler = (evt: any) => this.handleSvgMouseOut(evt);
        this.objectMouseClickHandler = (evt: any) => this.handleObjectMouseClick(evt);

        (window as any).objectMouseOver = this.svgMouseOverHandler;
        (window as any).objectMouseOut = this.svgMouseOutHandler;
        (window as any).objectMouseClick = this.objectMouseClickHandler;
    }

    private handleSvgMouseOver(evt: any): void {
        // Handle SVG mouse over events
        //console.log('SVG Element Mouse Over - ID:', evt.currentTarget?.id || evt.target?.id);
    }

    private handleSvgMouseOut(evt: any): void {
        // Handle SVG mouse out events
        //console.log('SVG Element Mouse Out - ID:', evt.currentTarget?.id || evt.target?.id);
    }

    private handleObjectMouseClick(evt: any): void {
        const currentProcessingElement = evt.currentTarget;
        const type = currentProcessingElement.getAttribute('data-type');

        if (type === 'EmbeddedSubProcess') {
            // Handle Embedded Sub-Process click if needed
        } else if (currentProcessingElement?.parentNode?.classList?.contains('click-wrapper')) {
            // Removed Existing Wrapper
        } else {
            // Add Click Wrapper and Emit Event
            emit(this, 'bpm-work-item-selected', { 
                detail: { workItem: currentProcessingElement }
            });
        }

        evt.stopPropagation();
        evt.preventDefault();
    }


    private _onDiagramSelectionChanged(event: any) {
        console.log('Diagram Selection Changed:', event);
    }
    
    private _onBpmDiagramReady(event: any) {
        console.log('Diagram Load and Render Complete Event:', event);
    }

    override updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);

        if(_changedProperties.has('processInstance') && this.processInstance) {
            if(this.processInstance === 'p:0a20b'){
                this.processInstanceDiagramModelUrl = 'assets/parallel_flow.json';
            }
            if(this.processInstance === 'subprocess'){
                this.processInstanceDiagramModelUrl = 'assets/subprocess.json';
            }

            this.fetchAuditData();
        }

    }    

}

declare global {
  interface HTMLElementTagNameMap {
    "audit-trail": AuditTrail;
  }
}
