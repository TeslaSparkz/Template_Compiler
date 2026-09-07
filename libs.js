import fs from 'fs';
const injectLibs = () => {
    let scriptContent = '';
    const lib = fs.readFileSync('./lib/libsrc.js', 'utf8');
    scriptContent += `<script>${lib}</script>`;
    return scriptContent;

}
export default injectLibs ;