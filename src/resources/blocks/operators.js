import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'operators_';
const categoryColor = '#59C059';

function register() {
    // x = y
    registerBlock(`${categoryPrefix}equals`, {
        message0: '%1 = %2',
        args0: [
            {
                "type": "input_value",
                "name": "X"
            },
            {
                "type": "input_value",
                "name": "Y"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} == ${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x === y
    registerBlock(`${categoryPrefix}strictequals`, {
        message0: '%1 === %2',
        args0: [
            {
                "type": "input_value",
                "name": "X"
            },
            {
                "type": "input_value",
                "name": "Y"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} === ${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}extremelystrictequals`, { // i bet you cant read this
        message0: '%1 is EXACTLY equal to %2 (extremely strict)',
        args0: [
            {
                "type": "input_value",
                "name": "X"
            },
            {
                "type": "input_value",
                "name": "Y"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`Object.is(${X || 0}, ${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x > y
    registerBlock(`${categoryPrefix}more`, {
        message0: '%1 > %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} > ${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x < y
    registerBlock(`${categoryPrefix}less`, {
        message0: '%1 < %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} < ${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}voidstatement`, {
        message0: 'get the value of %1 and discard it',
        args0: [
            {
                "type": "input_value",
                "name": "EVALUATED"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'EVALUATED', javascriptGenerator.ORDER_ATOMIC);
        return `void(${NEWVALUE});`;
    })

    // x and y
    registerBlock(`${categoryPrefix}and`, {
        message0: '%1 and %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Boolean"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || false} && ${Y || false})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x or y
    registerBlock(`${categoryPrefix}or`, {
        message0: '%1 or %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Boolean"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || false} || ${Y || false})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x xor y
    registerBlock(`${categoryPrefix}xor`, {
        message0: '%1 xor %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Boolean"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`Boolean(${X || false} ^ ${Y || false})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // not x
    registerBlock(`${categoryPrefix}not`, {
        message0: 'not %1',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Boolean"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);

        return [`!${X || false}`, javascriptGenerator.ORDER_ATOMIC];
    })

    // join x y
    registerBlock(`${categoryPrefix}join`, {
        message0: 'join %1 %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "checks": "String"
            },
            {
                "type": "input_value",
                "name": "Y",
                "checks": "String"
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${String(X) || ''} + ${String(Y) || ''})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x + y
    registerBlock(`${categoryPrefix}add`, {
        message0: '%1 + %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} + ${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x - y
    registerBlock(`${categoryPrefix}minus`, {
        message0: '%1 - %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} - ${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x * y
    registerBlock(`${categoryPrefix}multiply`, {
        message0: '%1 * %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} * ${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x / y
    registerBlock(`${categoryPrefix}divide`, {
        message0: '%1 ÷ %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} / ${Y || 1})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x ^ y
    registerBlock(`${categoryPrefix}power`, {
        message0: '%1 ^ %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} ** ${Y || 1})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // logx y
    registerBlock(`${categoryPrefix}log`, {
        message0: '%1 log %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(Math.log(${Y || 1}) / Math.log(${X || 10}))`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x / y
    registerBlock(`${categoryPrefix}divide`, {
        message0: '%1 ÷ %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} / ${Y || 1})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // x ^ y
    registerBlock(`${categoryPrefix}power`, {
        message0: '%1 ^ %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} ** ${Y || 1})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // rootx y
    registerBlock(`${categoryPrefix}root`, {
        message0: '%1 root %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${X || 0} ** (1 / ${Y || 1}))`, javascriptGenerator.ORDER_ATOMIC];
    })

    // stuff idk
    registerBlock(`${categoryPrefix}adv`, {
        message0: '%1 %2',
        args0: [
            {
                "type": "field_dropdown",
                "name": "X",
                "options": [
                    [ "sin", "sin" ],
                    [ "cos", "cos" ],
                    [ "tan", "tan" ],
                    [ "asin", "asin" ],
                    [ "acos", "acos" ],
                    [ "atan", "atan" ],
                    [ "ceiling", "ceil" ],
                    [ "round", "round" ],
                    [ "floor", "floor" ],
                    [ "absolute", "abs" ],
                    [ "sign", "sign" ],
                ]
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = block.getFieldValue('X')
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`Math.${X}(${Y || 0})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // get a letter of a string
    registerBlock(`${categoryPrefix}letter`, {
        message0: 'letter %1 of %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "String"
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`(${Y}.split("")[${X}-1])`, javascriptGenerator.ORDER_ATOMIC];
    })

    // random int
    registerBlock(`${categoryPrefix}randomint`, {
        message0: 'random int from %1 to %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`Math.floor(Math.random()*(${Y} - ${X} + 1) + ${X})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // random
    registerBlock(`${categoryPrefix}random`, {
        message0: 'random from %1 to %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "Number"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);

        return [`((Math.random()+${X})*${Y-X})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // string len
    registerBlock(`${categoryPrefix}length`, {
        message0: 'length of %1',
        args0: [
            {
                "type": "input_value",
                "name": "STR",
                "check": "String"
            }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'STR', javascriptGenerator.ORDER_ATOMIC) || '""';

        return [`(${X}.length)`, javascriptGenerator.ORDER_ATOMIC];
    })
}

export default register;
