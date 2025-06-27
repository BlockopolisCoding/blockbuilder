import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'conversions_';
const categoryColor = '#8BC059';

let block;
block.getFieldValue = function () {
    return undefined;
};

function register() {
    // tonumber
    registerBlock(`${categoryPrefix}tonumber`, {
        message0: "%1 to number",
        args0: [
            {
                "type": "input_value",
                "name": "VAL"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const VAL = javascriptGenerator.valueToCode();

        return [`Number(${VAL})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // tostring
    registerBlock(`${categoryPrefix}tostring`, {
        message0: "%1 to string",
        args0: [
            {
                "type": "input_value",
                "name": "VAL"
            },
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const VAL = javascriptGenerator.valueToCode();

        return [`String(${VAL})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // convert time lengths
    registerBlock(`${categoryPrefix}time`, {
        message0: "%1 %2 to %3",
        args0: [
            {
                "type": "input_value",
                "name": "VAL",
                "check": "Number"
            },
            {
                "type": "field_dropdown",
                "name": "MENU1",
                "options": [
                    [ "milliseconds", "1" ],
                    [ "seconds", "1000" ],
                    [ "minutes", "60000" ],
                    [ "hours", "3600000" ],
                    [ "days", "86400000" ],
                ]
            },
            {
                "type": "field_dropdown",
                "name": "MENU2",
                "options": [
                    [ "milliseconds", "1" ],
                    [ "seconds", "1000" ],
                    [ "minutes", "60000" ],
                    [ "hours", "3600000" ],
                    [ "days", "86400000" ],
                ]
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const VAL = javascriptGenerator.valueToCode();
        const MENU1 = block.getFieldValue();
        const MENU2 = block.getFieldValue();

        return [`(${VAL} * ${MENU1} / ${MENU2})`, javascriptGenerator.ORDER_ATOMIC];
    })
}

export default register;
