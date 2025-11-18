import { Subject } from 'rxjs';
import { createContext } from '@lit/context';
export const AnnotateServiceContext = createContext('annotation-service-context');
/**
 * Service for managing annotation events in audit trail components
 * @since 1.0.0
 * @status stable
 */
export class AnnotateServiceImpl {
    constructor() {
        this.annotationEvent = new Subject();
        /**
         * Observable stream of annotation events
         */
        this.$annotationEvent = this.annotationEvent.asObservable();
    }
    /**
     * Triggers an annotation event with the provided data
     * @param data - The annotation data to broadcast
     */
    triggerAnnotationEvent(data) {
        this.annotationEvent.next(data);
    }
    /**
     * Completes the annotation event stream and cleans up resources
     */
    destroy() {
        this.annotationEvent.complete();
    }
}
