import getExport from "./getExport.js";
const handleEvents = (template, script) => {
    const eventRegex = /a-(\w+)="([^"]+)"/g;
    let match;
    let scriptContent = '';

    const exports = getExport(script);

    while ((match = eventRegex.exec(template)) !== null) {
        const eventName = match[1];
        const handlerName = match[2];
        scriptContent += `document.querySelector('[a-${eventName}="${handlerName}"]').addEventListener('${eventName}', exports.${handlerName}.bind(null, handler));\n`;
    }
    return scriptContent;
}

export default handleEvents;