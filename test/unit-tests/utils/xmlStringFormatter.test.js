import 'babel-polyfill'
import stringIndent from 'utils/xmlStringFormatter'

test( 'converts unindented xml string to indented string', () => {
    const formattedXMLString = stringIndent('<a><b><c><d><e><f></f></e></d></c></b></a>')
    const expectedResult = "<a>\n\t<b>\n\t\t<c>\n\t\t\t<d>\n\t\t\t\t<e>\n\t\t\t\t\t<f>\n\t\t\t\t\t</f>\n\t\t\t\t</e>\n\t\t\t</d>\n\t\t</c>\n\t</b>\n</a>"
    expect(formattedXMLString).toBe(expectedResult)
})

test( 'Throws an error if xml is not valid', () => {
    try{
        stringIndent('<a><b><c><d><e><f><j></f></j></e></d></c></b></a>')
    }catch(e){
        expect(e).toBe('Invalid XML')
    }    
})
