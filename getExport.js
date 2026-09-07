const getExport = (script) => { 

    //gets content of export default
    let scriptExportInd = script.indexOf('export default');
    let scriptExport = '';
    if (scriptExportInd !== -1) {
      //find substring upto ;
      let semicolonInd = script.indexOf(';', scriptExportInd);
      if (semicolonInd !== -1) {
        scriptExport = script.substring(scriptExportInd + 14, semicolonInd).trim();
      }
    }

    return scriptExport;
}
export default getExport;