import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";


@customElement("cb-element")
export class CB extends LitElement {

    static styles = css`
        div {
            color: red;
        }
    `;



    override render() {
        return html`<div>CB Element !!!</div>`;
    }
    


}

declare global {
  interface HTMLElementTagNameMap {
    "cb-element": CB;
    }
}