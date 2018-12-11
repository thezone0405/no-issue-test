import 'babel-polyfill'
import integerToXML from 'utils/integerToXML'

test( 'convert integers to nested and indented xml tags', () => {
    const formattedIntegerToXMLString = integerToXML(6)
    const expectedResult = "<1>\n\t<2>\n\t\t<3>\n\t\t\t<4>\n\t\t\t\t<5>\n\t\t\t\t\t<6>\n\t\t\t\t\t</6>\n\t\t\t\t</5>\n\t\t\t</4>\n\t\t</3>\n\t</2>\n</1>"
    expect(formattedIntegerToXMLString).toBe(expectedResult)
})
