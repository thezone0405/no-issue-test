const integerToXML = (maxLength, openTagStr='', closeTagStr='') => {
    if(!maxLength){
        return openTagStr+closeTagStr
    }
    const lineBreak = openTagStr.match(/\n/g)
    let currentNumber = 1
    if(lineBreak){
        currentNumber = lineBreak.length + 1
    }
    const openTabs = (maxLength-1)?('\t').repeat(currentNumber):''
    const closeTabs = (maxLength-1)?('\t').repeat(maxLength-1):''
    const closeNewline = (maxLength-1)?'\n':''
    openTagStr += `<${currentNumber}>\n${openTabs}`
    closeTagStr += `${closeTabs}</${maxLength}>${closeNewline}`
    maxLength--
    return integerToXML(maxLength, openTagStr, closeTagStr)
}

export default integerToXML