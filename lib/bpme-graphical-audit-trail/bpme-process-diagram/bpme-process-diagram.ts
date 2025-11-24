import { html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";

// @ts-ignore
import styles from './bpme-process-diagram.css?raw';
// @ts-ignore
import diagramCss from '../../../styles/diagram-js.css?raw';
// @ts-ignore
import processDiagramCss from '../../../styles/process-diagram-js.css?raw';
// @ts-ignore
import materialIconsCss from '../../../styles/iconfont/material-icons.css?raw';
import { BPMEAuditTrailService, BPMEAuditTrailServiceContext } from "../audit-trail-service";
import { consume } from "@lit/context";
import { OverlayInfoImpl } from "../model/overlay.info";

@customElement('bpme-process-diagram')
export class BPMEProcessDiagram extends LitElement {


    @property({type: Object})
    diagramModel?: any | null;


    @property({type: Object})
    auditTrailData?: any | null;


    @query('#main-svg-container')
    private _mainSvgContainer!: HTMLElement;

    
    @consume({context: BPMEAuditTrailServiceContext })
    private _auditTrailService!: BPMEAuditTrailService;


    private _diagram: any | null = null;
    private _processModel: any | null = null;

    constructor(){
        super();
        console.log(':: BPMEProcessDiagram -> constructor ::');
        this.loadDiagramAssets();
    }

    static override styles = [
        unsafeCSS(styles),
        unsafeCSS(diagramCss),
        unsafeCSS(processDiagramCss),
        unsafeCSS(materialIconsCss)
    ];

    connectedCallback(): void {
        super.connectedCallback();
        console.log(':: BPMEProcessDiagram -> connectedCallback ::');
        this.addEventListeners();
    }

    override updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);

        // Check if Diagram has been loaded.
        const pd = (window as any)['process-diagram'];
        if(_changedProperties.has('diagramModel') && this.diagramModel && pd) {
            /**
             * Deliberately commented loading of process diagram here, as the diagram scripts
             * which are loaded asynchronously may not have been loaded, to expose window['process-diagram']
             * object, which is required to load the diagram.
             * 
             * 
             * TODO :- 
             *      1. Currently I have added an event listener 'bpme-diagram-scripts-loaded' to handle loading of diagram
             *         after the scripts are loaded. But this may not work if the diagramModel property is set after the scripts
             *         are loaded.
             * 
             *      2. Need to implement a better mechanism to ensure that the diagram scripts are loaded before attempting
             *         to load the process diagram.
             */
            this.loadProcessDiagram();
        }

        if(_changedProperties.has('auditTrailData') && this.auditTrailData) {
            this.addAuditTrailOverlays();
        }

    }


    


    override render() {
        return html`
            <div>BPME Process Diagram Component</div>
            <div id="page-main-menu">
            </div>
            <div id="main-svg-container"></div>
        `;
    }


    protected  loadDiagramAssets(): void {
        this.appendDiagramStyles();
        this.appendDiagramScripts();
    }


    protected appendDiagramStyles(): void {
        const materialIconsStyleTag : HTMLLinkElement = document.createElement('link');
        materialIconsStyleTag.href  = "../../../styles/iconfont/material-icons.css";
        materialIconsStyleTag.rel = "stylesheet";
        document.head.appendChild(materialIconsStyleTag);
    }

    protected appendDiagramScripts(): void {
        const pd = (window as any)['process-diagram'];
        if(!pd){
            const load = (src: string) =>
            new Promise<void>((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {

                    this.renderRoot.dispatchEvent(new CustomEvent('bpme-diagram-scripts-loaded', {
                        bubbles: false,
                        composed: true
                    }));


                    resolve();
                };
                script.onerror = () => reject(`Failed to load ${src}`);
                document.head.appendChild(script);
            });
            load("../../../scripts/process-diagram.js");
        }
    }
    


    protected loadProcessDiagram(): void {
        if(this.diagramModel) {
            if((window as any)['process-diagram']){
                const pd = (window as any)['process-diagram'];

                    if (this._diagram) {
                        this._diagram.destroy();
                    }

                const diagram = pd.createDiagram(this._mainSvgContainer, this.diagramModel,
                    function onChange(context: any) {
                        var diagram = context.diagram;
                        var event = context.event;
                        if (diagram) {
                            //                    console.log('Change: ' + event);
                            //                    var json = diagram.getModelJson(2);
                            //                    console.log('#################');
                            //                    console.log('Model: \n' + json);
                            //                    console.log('~~~~~~~~~~~~~~~~~');
                        }
                    }, null, { readOnly: false });

                this._diagram = diagram;    
                this._processModel = diagram.getModel();   

                diagram.invoke(['eventBus', 'elementRegistry', function (eventBus: any, elementRegistry: any) {
                    eventBus.on('selection.changed', function (event: any) {

                       let selectedElements = event.newSelection;
                       const selectedDiagramElement = selectedElements[0];

                       if(selectedDiagramElement) {
                            const svgElement = elementRegistry.getGraphics(selectedDiagramElement.id);

                            // console.log('x');
                            /**
                             * TODO :-  Check the following.
                             * 
                             * From which object the event should be dispatched.  
                             *         1. event.target
                             *         2. this
                             */
                            const customEvent = new CustomEvent('bpm-diagram-selection-changed', {
                                                    detail: { 
                                                        element: event
                                                    },
                                                    bubbles: true,
                                                    composed: true
                                                });
                            svgElement.dispatchEvent(customEvent);
                       }


                    });




                    // Double-click event on element
                    eventBus.on('element.dblclick', function (event : any) {
                        var diagramElement = event.element;
                        console.log('Double-clicked element:', diagramElement);
                        console.log('Element ID:', diagramElement.id);
                        console.log('Element Type:', diagramElement.type);
                        
                        // Get the SVG element
                        var svgElement = elementRegistry.getGraphics(diagramElement.id);
                        console.log('SVG Element:', svgElement);

                        /**
                         * TODO :-  Check the following.
                         * 
                         * From which object the event should be dispatched.  
                         *         1. this.renderRoot
                         *         2. this
                         * 
                         * Also Check if the bpme-subprocess-clicked, should be added
                         * as part of <bpme-process-diagram> component.
                         * 
                         */
                        const customEvent = new CustomEvent('bpme-subprocess-clicked', {
                                                detail: { 
                                                    diagram: diagram,
                                                    diagramElement: diagramElement
                                                },
                                                bubbles: true,
                                                composed: true
                                        });
                        svgElement.dispatchEvent(customEvent);      
                    });                    



                }]);

                /**
                 * TODO :-  Check the following.
                 * 
                 * From which object the event should be dispatched.  
                 *         1. this.renderRoot
                 *         2. this
                 * 
                 */
                const customEvent = new CustomEvent('bpm-diagram-ready', {
                                        detail: { 
                                            diagram: diagram
                                        },
                                        bubbles: true,
                                        composed: true
                                });
                this.dispatchEvent(customEvent);


            }
            
        }
    }
    
    
    protected addAuditTrailOverlays(): void {
        if(this.auditTrailData){
                  

            // get flow elements from the process model
            const flowElements = this._auditTrailService.getFlowElements(this._processModel.rootElements[0]);

            // From audit trail data find matching flow element using function pass flowElements and auditTrailData.
            const overlayTodos = this._auditTrailService.actualTodos(flowElements, this.auditTrailData);


            for (let i = 0; i < overlayTodos.length; i++) {
                const overlay = overlayTodos[i];
                let diagramElement = this._diagram.getDiagramObject(overlay.flowElement);
                let overLayInfo = new OverlayInfoImpl();
                // Add renderRoot for DOM access in overlay callback
                diagramElement.renderRoot = this.renderRoot;
                overLayInfo.msg = overlay.auditItem.message;

                overLayInfo.iconSrc = 'assets/completed.svg';
                overLayInfo.overlayClickCallback = (event : any) => {
                    event.preventDefault();
                    
                    // Dispatch custom event for annotation click
                    const customEvent = new CustomEvent('bpm-annotation-clicked', {
                        detail: { 
                            annotation: overlay.flowElement,
                            element: diagramElement
                        },
                        bubbles: true,
                        composed: true
                    });

                    /**
                     * TODO :-  Check the following.
                     * 
                     * From which object the event should be dispatched.  
                     *         1. event.target
                     *         2. this
                     * 
                     */                    
                    event.target.dispatchEvent(customEvent);
                    console.log('Clicked on annotated element:', customEvent);
                };

                this._diagram.invoke(['eventBus', 'annotationOverlays', function (eventBus: any, annotationOverlays: any) {
                    annotationOverlays.addAnnotation(diagramElement, [overLayInfo]);
                }]);    
            }
        }
    }


    protected addEventListeners(): void {
        if(this.shadowRoot){
            this.shadowRoot.addEventListener('bpme-diagram-scripts-loaded', (event: Event) => {
                this.loadProcessDiagram();
            });
        }
    }


    override disconnectedCallback(): void {
        super.disconnectedCallback();
        // No need to clean up added event listeners as they would be cleaned up automtically by garbage collector
        // when the component is removed from DOM.
    }

}


declare global {
  interface HTMLElementTagNameMap {
    "bpme-process-diagram": BPMEProcessDiagram;
  }
}