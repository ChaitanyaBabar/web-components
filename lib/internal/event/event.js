export function emit(el, name, options) {
    const event = new CustomEvent(name, {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {},
        ...options
    });
    el.dispatchEvent(event);
    console.log(`Event emitted: ${name}`, event);
    return event;
}
