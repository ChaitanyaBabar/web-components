import {createContext} from '@lit/context';

export const AuditTrailServiceContext = createContext<AuditTrailService>('audit-trail-service-context');



export interface AuditTrailService {
    getFlowElements(process: any): any[];
}

/**
 * Service implementation for audit trail functionalities.
 * @since 1.0.0
 * @status stable
 */
export class AuditTrailServiceImpl implements AuditTrailService {
    
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
    
}