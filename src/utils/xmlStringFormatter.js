const strFormat = (xmlStr,openStr='',closeStr='') => {
    const openTag = xmlStr.match('<(.*?)>')  
    if(!openTag){
        return openStr+closeStr
    }
    const closeTag = xmlStr.match('<\/'+openTag[1]+'>')
    if(!closeTag){
        throw "Invalid XML"
    }
    
    xmlStr = xmlStr.substring(openTag[0].length, xmlStr.length - closeTag[0].length)
    const newLine = (xmlStr.trim())? '\n':''		
    const lineBreak = openStr.match(/\n/g)
    let openTabs = (lineBreak)?('\t').repeat(lineBreak.length+1):'\t'
    openTabs = (!xmlStr.trim())?'': openTabs
    const closeTabs = (lineBreak)?('\t').repeat(lineBreak.length):''
    openStr +=  openTag[0]+newLine+openTabs
    closeStr = `\n${closeTabs}${closeTag[0]}` + closeStr
    return strFormat(xmlStr,openStr, closeStr)
}

export default strFormat