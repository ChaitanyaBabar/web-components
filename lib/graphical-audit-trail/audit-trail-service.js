import { createContext } from '@lit/context';
export const AuditTrailServiceContext = createContext('audit-trail-service-context');
/**
 * Service implementation for audit trail functionalities.
 * @since 1.0.0
 * @status stable
 */
export class AuditTrailServiceImpl {
    getFlowElements(process) {
        var flowElements = [];
        this.getAllFlowElements(process, flowElements);
        return flowElements;
    }
    getAllFlowElements(container, flowElements) {
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
