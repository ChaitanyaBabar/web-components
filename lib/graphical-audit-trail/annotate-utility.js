import { createContext } from '@lit/context';
export const AnnotateUtilityContext = createContext('annotation-utility-context');
/**
 * @since 1.0.0
 * @status stable
 *
 * Service for handling annotation of DOM elements with visual indicators.
 * @csspart base - The component's internal wrapper.
 */
export class AnnotationUtilityImpl {
    constructor() {
        this._statesToAnnotate = ['BX_INSTANCE_TASKS_COMPLETED'];
    }
    /**
     * Starts the annotation parsing process for the given element
     * @param element - The DOM element to parse for annotations
     * @param annotationList - List of annotations to apply
     */
    startAnnotationParsing(element, annotationList) {
        if (element) {
            let currentProcessingElement = element;
            if (element.classList && !element.classList.contains('annotated')) {
                element.classList.add('annotated');
            }
            // Check if the current element needs annotation
            let processedResult = this.processElementForAnnotation(element, annotationList);
            if (processedResult.annotateThisElement) {
                this.createAnnotationWrapper(currentProcessingElement, processedResult.annotatedElement);
            }
            // Recursively parse the child elements
            if (processedResult.toTraverseDOM && element.children && element.children.length !== 0) {
                for (let i = 0; i < element.children.length; i++) {
                    this.startAnnotationParsing(element.children[i], annotationList);
                }
            }
        }
    }
    /**
     * Processes an element to determine if it needs annotation
     * @param element - The DOM element to process
     * @param annotationList - List of annotations to check against
     * @returns Processing result with annotation details
     */
    processElementForAnnotation(element, annotationList) {
        let processedResult = {
            toTraverseDOM: true,
            annotateThisElement: false,
            annotatedElement: null
        };
        let elementId = element && element.getAttribute('data-element-id') ? element.getAttribute('data-element-id') : null;
        if (elementId && annotationList && annotationList.length > 0) {
            annotationList.some((annotation) => {
                let modelId = annotation.applicationActivityModelId;
                if (modelId && elementId && modelId === elementId) {
                    processedResult.annotateThisElement = this._statesToAnnotate.some(state => state === annotation.messageId);
                    processedResult.toTraverseDOM = false;
                    processedResult.annotatedElement = annotation;
                    return true;
                }
                return false;
            });
        }
        return processedResult;
    }
    /**
     * Creates annotation wrapper with visual indicators
     * @param currentProcessingElement - The element to wrap
     * @param annotatedElement - The annotation data
     */
    createAnnotationWrapper(currentProcessingElement, annotatedElement) {
        // Create wrapper g element
        const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        wrapper.classList.add('todo-icon-wrapper');
        wrapper.setAttribute('layout', 'row');
        wrapper.setAttribute('layout-align', 'center center');
        wrapper.setAttribute('flex', '');
        // Get the parent of the host element
        const parent = currentProcessingElement.parentNode;
        // Insert the wrapper before the host element
        parent.insertBefore(wrapper, currentProcessingElement);
        // Move the host element inside the wrapper
        wrapper.appendChild(currentProcessingElement);
        // Get dimensions and create highlight rectangle
        let dimensions = currentProcessingElement.getBBox();
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', (dimensions.x - 4).toString());
        rect.setAttribute('y', (dimensions.y - 4).toString());
        rect.setAttribute('width', (dimensions.width + 8).toString());
        rect.setAttribute('height', (dimensions.height + 8).toString());
        rect.setAttribute('rx', '3');
        rect.setAttribute('ry', '3');
        rect.setAttribute('fill', 'transparent');
        rect.setAttribute('stroke', 'green');
        rect.setAttribute('stroke-width', '2');
        // Add click event listener
        rect.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            console.log('Clicked on annotated element:', annotatedElement);
            // Dispatch custom event for annotation click
            const customEvent = new CustomEvent('bpm-annotation-clicked', {
                detail: {
                    annotation: annotatedElement,
                    element: currentProcessingElement
                },
                bubbles: true,
                composed: true
            });
            rect.dispatchEvent(customEvent);
        });
        wrapper.insertBefore(rect, currentProcessingElement);
        // Create and insert annotation icon
        this.createAnnotationIcon(wrapper, currentProcessingElement, annotatedElement);
    }
    /**
     * Creates annotation icon component
     * @param wrapper - The wrapper element
     * @param currentProcessingElement - The processing element
     * @param annotatedElement - The annotation data
     */
    createAnnotationIcon(wrapper, currentProcessingElement, annotatedElement) {
        // Create the audit annotation icon web component
        const iconComponent = document.createElement('bpme-audit-annotation-icon');
        // Set properties
        iconComponent.item = {
            todoIconName: 'task-complete',
            todoIconClass: 'annotation-complete',
            msg: annotatedElement.messageId || 'Task completed'
        };
        // Style the component
        iconComponent.style.position = 'relative';
        // Insert the icon component
        wrapper.insertBefore(iconComponent, currentProcessingElement);
    }
    /**
     * Removes all annotations from the specified element
     * @param element - The element to remove annotations from
     */
    removeAnnotations(element) {
        if (!element)
            return;
        const annotatedElements = element.querySelectorAll('.annotated');
        annotatedElements.forEach((annotatedElement) => {
            annotatedElement.classList.remove('annotated');
        });
        const wrappers = element.querySelectorAll('.todo-icon-wrapper');
        wrappers.forEach((wrapper) => {
            const parent = wrapper.parentNode;
            const children = Array.from(wrapper.children);
            children.forEach((child) => {
                if (!child.tagName || child.tagName.toLowerCase() !== 'rect') {
                    parent.insertBefore(child, wrapper);
                }
            });
            parent.removeChild(wrapper);
        });
    }
}
