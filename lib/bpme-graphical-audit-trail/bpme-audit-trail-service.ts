import {createContext} from '@lit/context';

export const BPMEAuditTrailServiceContext = createContext<BPMEAuditTrailService>('bpme-audit-trail-service-context');



export interface BPMEAuditTrailService {
    getFlowElements(process: any): any[];
    actualTodos(flowElements: any[], auditTrailData: any[]): any[];
}

/**
 * Service implementation for audit trail functionalities.
 * @since 1.0.0
 * @status stable
 */
export class BPMEAuditTrailServiceImpl implements BPMEAuditTrailService {
    
    getFlowElements(process: any): any[] {
        var flowElements: any[] = [];
        this.getAllFlowElements(process, flowElements);
        return flowElements;
    }


    private getAllFlowElements(container: any, flowElements: any[]) {
        // flow element's
        if (container.hasOwnProperty('flowElements')) {
            for (var i = 0; i < container.flowElements.length; i++) {
                if (container.flowElements[i].$instanceOf('bp:FlowElement')) {
                    flowElements.push(container.flowElements[i]);
                }
                if (container.flowElements[i].$instanceOf('bp:FlowElementsContainer')) {
                    this.getAllFlowElements(container.flowElements[i], flowElements);
                }
            }
        }
    }


    actualTodos(flowElements: any[], auditTrailData: any[]) {
        const overlays: any[] = [];

        // Instead of iterating on auditTrailData, iterate on flowElements to maintain order in overlays
        flowElements.forEach(flowElement => {
            const modelId = flowElement.id;

            // for given modelId, there can be multiple audit items, so consider them.

            // also add another filter condition that its messageId 'BX_INSTANCE_TASKS_COMPLETED'
            const auditItems = auditTrailData.filter(audit => audit.applicationActivityModelId === modelId && audit.messageId === 'BX_INSTANCE_TASKS_COMPLETED');
            if (auditItems.length > 0) {  
                auditItems.forEach(auditItem => {
                    overlays.push({
                        flowElement: flowElement,
                        auditItem: auditItem
                    });    
                });
            }
        });
        return overlays;
    }
    
}