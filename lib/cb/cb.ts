import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";


@customElement("cb-element")
class CB extends LitElement {

    static styles = css`
        div {
            color: red;
        }
    `;



    override render() {
        return html`<div>CB Element !!!</div>`;
    }
    


}