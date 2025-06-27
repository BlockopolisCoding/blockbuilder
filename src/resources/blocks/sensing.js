import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core'

const categoryPrefix = 'sensing_';
const categoryColor = '#5CB1D6';

function register() {
    // when key pressed
    registerBlock(`${categoryPrefix}keypress`, {
        message0: 'when key %1 is pressed %2 %3',
        args0: [
            {
                "type": "field_input",
                "name": "KEY",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
        extensions: [
          'single_character_validation',
        ],
    }, (block) => {
        const KEY = block.getFieldValue('KEY')
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `document.addEventListener("keypress", event => {
            if (event.key == '${KEY}') { ${BLOCKS} }
        });`;
        return `${code}\n`;
    })

    // alert
    registerBlock(`${categoryPrefix}alert`, {
        message0: 'alert %1',
        args0: [
            {
                "type": "input_value",
                "name": "ALERT"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ALERT = javascriptGenerator.valueToCode(block, 'ALERT', javascriptGenerator.ORDER_ATOMIC);
        const code = `alert(${ALERT || '""'})`;
        return `${code}\n`;
    })
    
    // confirm
    registerBlock(`${categoryPrefix}confirm`, {
        message0: 'confirm %1',
        args0: [
            {
                "type": "input_value",
                "name": "ALERT"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ALERT = javascriptGenerator.valueToCode(block, 'ALERT', javascriptGenerator.ORDER_ATOMIC);
        return [`confirm(${ALERT || '""'})`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    // prompt
    registerBlock(`${categoryPrefix}prompt`, {
        message0: 'prompt %1',
        args0: [
            {
                "type": "input_value",
                "name": "ALERT"
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ALERT = javascriptGenerator.valueToCode(block, 'ALERT', javascriptGenerator.ORDER_ATOMIC);
        return [`prompt(${ALERT || '""'})`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    // time
    registerBlock(`${categoryPrefix}time`, {
        message0: 'time (ms) since 1970',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`Date.now()`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    // year
    registerBlock(`${categoryPrefix}year`, {
        message0: 'current year',
        args0: [],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`(new Date(Date.now()).getFullYear())`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    // leap year or not
    registerBlock(`${categoryPrefix}leapyear`, {
        message0: 'is leap year?',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`((new Date(new Date(Date.now()).getYear(), 1, 29)).getDate() === 29)`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}usingpenguinmodorforks`, {
        message0: 'is using PenguinMod or forks?',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`(!!Scratch.extensions.isPenguinMod)`, javascriptGenerator.ORDER_ATOMIC];
    })
}

Blockly.Extensions.register('single_character_validation', function() {
    this.getField('KEY').setValidator(function(newValue) {
        return newValue.substring(Math.max(newValue.length - 1, 0),newValue.length);
    });
});

export default register;
