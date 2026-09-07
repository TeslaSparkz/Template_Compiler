import fs from 'fs';
const dataBind = template => {
    let property = template.match(/{{\s*([^}]+)\s*}}/);
    let scriptContent = '';
    if (property) {
        let proxyContent = fs.readFileSync('./lib/proxy.js', 'utf8');
        scriptContent += proxyContent;
    }
    return scriptContent;
}
export default dataBind;