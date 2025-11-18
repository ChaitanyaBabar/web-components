import { Observable, Subject } from 'rxjs';
import {createContext} from '@lit/context';

export const AnnotateServiceContext = createContext<AnnotateService>('annotation-service-context');

export interface AnnotateService {
    triggerAnnotationEvent(data: any): void;
    destroy(): void;
}



/**
 * Service for managing annotation events in audit trail components
 * @since 1.0.0
 * @status stable
 */
export class AnnotateServiceImpl implements AnnotateService {
    private annotationEvent: Subject<any> = new Subject<any>();
    
    /**
     * Observable stream of annotation events
     */
    public readonly $annotationEvent: Observable<any> = this.annotationEvent.asObservable();

    /**
     * Triggers an annotation event with the provided data
     * @param data - The annotation data to broadcast
     */
    triggerAnnotationEvent(data: any): void {
        this.annotationEvent.next(data);
    }

    /**
     * Completes the annotation event stream and cleans up resources
     */
    destroy(): void {
        this.annotationEvent.complete();
    }
}