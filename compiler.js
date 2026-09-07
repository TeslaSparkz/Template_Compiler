import fs from 'fs';
import handleEvents from './events.js';
import injectLibs from './libs.js';
import dataBind from './bindings.js';
import resolveExpr from './resolveExpr.js';
import getExport from './getExport.js';


const filePath = 'example.vue';
const fileContent = fs.readFileSync(filePath, 'utf8');

let tempind = fileContent.indexOf('<template>');
let tempend = fileContent.indexOf('</template>');

let templateContent = '';
if (tempind !== -1 && tempend !== -1) {
  templateContent = fileContent.substring(tempind + 10, tempend);
}



let scriptInd = fileContent.indexOf('<script>');
let scriptEnd = fileContent.indexOf('</script>');


let scriptContent = '';
if (scriptInd !== -1 && scriptEnd !== -1) {
  scriptContent = fileContent.substring(scriptInd + 8, scriptEnd);
}

let scriptExport = getExport(scriptContent);

let scriptBody = scriptContent.substring(0, scriptContent.indexOf('export default')).trim();


let eventHandlers = handleEvents(templateContent, scriptBody);

templateContent = resolveExpr(templateContent, scriptBody);
let binds = dataBind(templateContent);
templateContent = templateContent.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, expression) => {
  return `<text expr="${expression.replace(/"/g, '&quot;')}"></text>`;
});


let styleInd = fileContent.indexOf('<style>');
let styleEnd = fileContent.indexOf('</style>');
let styleContent = '';
if (styleInd !== -1 && styleEnd !== -1) {
  styleContent = fileContent.substring(styleInd + 7, styleEnd);
}

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    ${styleContent}
    </style>
</head>
  ${injectLibs()}
<body>
    ${templateContent}
   <script>
   ${scriptBody}
   let exports =  ${scriptExport} 
   ${binds}
   ${eventHandlers}
   </script>
</body>
</html>`

console.log('Template tag found:', tempind);
console.log('End of template tag found:', tempend);
fs.writeFileSync('templateContent.html', html, 'utf8');