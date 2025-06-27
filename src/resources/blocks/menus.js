import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'menus_';
const categoryColor = '#CB48E8';

function register() {
    // create ze menu
    registerBlock(`${categoryPrefix}create`, {
        message0: 'create menu %1 id: %2 %3 values: %4 allow inputs: %5',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "VALUES",
                "check": "JSONArray"
            },
            {
                "type": "field_dropdown",
                "name": "REPORTERS",
                "options": [
                    ["true", "true"],
                    ["false", "false"]
                ]
            }
        ],
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue()
        const VALUES = javascriptGenerator.valueToCode()
        const REPORTERS = block.getFieldValue()
        
        const code = `menus["${ID}"] = {
            acceptReporters: ${REPORTERS},
            items: ${VALUES || '[]'}
        }`
        return `${code}\n`;
    })
    
    registerBlock(`${categoryPrefix}created`, {
        message0: 'create dynamic menu %1 id: %2 %3 function: %4 allow inputs: %5',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "VALUES",
                "check": "Function"
            },
            {
                "type": "field_dropdown",
                "name": "REPORTERS",
                "options": [
                    ["true", "true"],
                    ["false", "false"]
                ]
            }
        ],
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue()
        const VALUES = javascriptGenerator.valueToCode()
        const REPORTERS = block.getFieldValue()
        
        const code = `menus["${ID}"] = {
            acceptReporters: ${REPORTERS},
            items: "dynamicmenu-${ID}"
        }
        
        Extension.prototype["dynamicmenu-${ID}"] = ${VALUES}`
        return `${code}\n`;
    })
}

export default register;
