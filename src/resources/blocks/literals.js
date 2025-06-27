import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'literals_';
const categoryColor = '#59C08E';

function register() {
    // true
    registerBlock(`${categoryPrefix}true`, {
        message0: 'true',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, () => {
        return [`true`, javascriptGenerator.ORDER_ATOMIC];
    })

    // false
    registerBlock(`${categoryPrefix}false`, {
        message0: 'false',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, () => {
        return [`false`, javascriptGenerator.ORDER_ATOMIC];
    })

    // number
    registerBlock(`${categoryPrefix}number`, {
        message0: '(%1)',
        args0: [
            {
                "type": "field_number",
                "name": "NUMBER",
                "value": 0,
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NUMBER = block.getFieldValue('NUMBER')

        return [NUMBER, javascriptGenerator.ORDER_ATOMIC];
    })

    // null
    registerBlock(`${categoryPrefix}null`, {
        message0: 'null',
        args0: [],
        output: "Null",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return ['null', javascriptGenerator.ORDER_ATOMIC];
    })

    // string
    registerBlock(`${categoryPrefix}string`, {
        message0: "'%1'",
        args0: [
            {
                "type": "field_input",
                "name": "STRING",
                "text": "string",
                "spellcheck": false
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const STRING = block.getFieldValue('STRING')

        return [JSON.stringify(STRING), javascriptGenerator.ORDER_ATOMIC]; // who decided it was a good idea to do this? they could easily insert an it's, and then it instantly breaks
    })

    // color
    registerBlock(`${categoryPrefix}color`, {
        message0: "%1",
        args0: [
            {
                "type": "field_colour_hsv_sliders",
                "name": "COLOR",
                "colour": "#ff0000"
            }
        ],
        output: "Color",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const COLOR = block.getFieldValue('COLOR')

        return ["'" + COLOR + "'", javascriptGenerator.ORDER_ATOMIC];
    })

    // array
    registerBlock(`${categoryPrefix}array`, {
        message0: "blank array",
        args0: [],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return ["[]", javascriptGenerator.ORDER_ATOMIC];
    })
    registerBlock(`${categoryPrefix}arraylength`, {
        message0: "array of length %1",
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        return [`Array(${X || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // object
    registerBlock(`${categoryPrefix}object`, {
        message0: "blank object",
        args0: [],
        output: "JSONObject",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return ["{}", javascriptGenerator.ORDER_ATOMIC];
    })
}

export default register;
