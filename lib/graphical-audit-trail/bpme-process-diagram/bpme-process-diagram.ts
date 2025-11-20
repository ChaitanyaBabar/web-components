import { html, LitElement, PropertyValues, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";


@customElement('bpme-process-diagram')
export class BPMEProcessDiagram extends LitElement {

    constructor(){
        super();
    }

    

    connectedCallback(): void {
        super.connectedCallback();
        console.log(':: BPMEProcessDiagram -> connectedCallback ::');
    }


    protected override render() {
        return html`
            <div>BPME Process Diagram Component</div>
        `;
    }

}


declare global {
  interface HTMLElementTagNameMap {
    "bpme-process-diagram": BPMEProcessDiagram;
  }
}