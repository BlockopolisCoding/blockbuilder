import { compileVars } from '../compiler/compileVarSection';
import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'control_';
const categoryColor = '#FFAB19';

javascriptGenerator.valueToCode = function () {
    return undefined;
};

javascriptGenerator.ORDER_ATOMIC = undefined;

javascriptGenerator.statementToCode = function () {
    return undefined;
};

function register() {
    // wait in milliseconds
    registerBlock(`${categoryPrefix}wait`, {
        message0: 'wait %1 (ms)',
        args0: [
            {
                "type": "input_value",
                "name": "MS",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const MS = javascriptGenerator.valueToCode();
        const code = `await new Promise(resolve => setTimeout(resolve, ${MS}))`;
        return `${code}\n`;
    })

    // wait until
    registerBlock(`${categoryPrefix}waituntil`, {
        message0: 'wait until %1',
        args0: [
            {
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const CONDITION = javascriptGenerator.valueToCode();
        const code = `await new Promise(resolve => { let x = setInterval(() => { if (${CONDITION}) { clearInterval(x); resolve() } }, 50) })`;
        return `${code}\n`;
    })

    // repeat x amount of times
    registerBlock(`${categoryPrefix}repeat`, {
        message0: 'repeat %1 %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "TIMES",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const TIMES = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const variable = compileVars.new()
        const code = `for (var ${variable} = 0; ${variable} < ${TIMES}; ${variable}++) { ${BLOCKS} }`;
        return `${code}\n`;
    })

    // if <> then {}
    registerBlock(`${categoryPrefix}ifthen`, {
        message0: 'if %1 then %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const CONDITION = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `if (${CONDITION ? `Boolean(${CONDITION})` : 'false'}) { ${BLOCKS} };`;
        return `${code}\n`;
    })

    // if <> then {} else {}
    registerBlock(`${categoryPrefix}ifthenelse`, {
        message0: 'if %1 then %2 %3 else %4 %5',
        args0: [
            {
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS2"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const CONDITION = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const BLOCKS2 = javascriptGenerator.statementToCode();
        const code = `if (${CONDITION ? `Boolean(${CONDITION})` : 'false'}) {
            ${BLOCKS}
        } else {
            ${BLOCKS2}
        };`;
        return `${code}\n`;
    })

    // if <> then () else ()
    registerBlock(`${categoryPrefix}ifthenreturn`, {
        message0: 'if %1 then %2 else %3',
        args0: [
            {
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            },
            {
                "type": "input_value",
                "name": "X",
            },
            {
                "type": "input_value",
                "name": "Y",
            },
        ],
        output: null,
        inputsInline: false,
        colour: categoryColor
    }, () => {
        const CONDITION = javascriptGenerator.valueToCode();
        const X = javascriptGenerator.valueToCode();
        const Y = javascriptGenerator.valueToCode();
        return [`(${CONDITION || false} ? ${X} : ${Y})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // switch statement
    registerBlock(`${categoryPrefix}switch`, {
        message0: 'switch %1 %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "VALUE"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS",
                "check": "Case"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const VALUE = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `switch (${VALUE || "''"}) { ${BLOCKS} };`;
        return `${code}\n`;
    })

    // case
    registerBlock(`${categoryPrefix}case`, {
        message0: 'case %1 %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "VALUE"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        previousStatement: "Case",
        nextStatement: "Case",
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const VALUE = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `case (${VALUE || "''"}): ${BLOCKS}`;
        return `${code}\n`;
    })

    // default
    registerBlock(`${categoryPrefix}default`, {
        message0: 'default %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        previousStatement: "Case",
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `default: ${BLOCKS}`;
        return `${code}\n`;
    })

    // while <> do {}
    registerBlock(`${categoryPrefix}while`, {
        message0: 'while %1 is true do %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const CONDITION = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `while (${CONDITION ? `Boolean(${CONDITION})` : 'false'}) { ${BLOCKS} };`;
        return `${code}\n`;
    })

    // do {}while <> 
    registerBlock(`${categoryPrefix}dowhile`, {
        message0: 'do %3 %2 while %1 is true',
        args0: [
            {
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const CONDITION = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `do { ${BLOCKS} } while (${CONDITION ? `Boolean(${CONDITION})` : 'false'});`;
        return `${code}\n`;
    })

    // repeat {} until <> is true
    registerBlock(`${categoryPrefix}repeatuntil`, {
        message0: 'repeat %3 %2 until %1 is true',
        args0: [
            {
                "type": "input_value",
                "name": "CONDITION",
                "check": "Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const CONDITION = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `while (${CONDITION ? `!Boolean(${CONDITION})` : 'true'}) { ${BLOCKS} };`;
        return `${code}\n`;
    })


    // break
    registerBlock(`${categoryPrefix}break`, {
        message0: 'break out of loop/switch',
        args0: [],
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const code = `break;`;
        return `${code}\n`;
    })

    // continue
    registerBlock(`${categoryPrefix}continue`, {
        message0: 'continue to next loop iteration',
        args0: [],
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const code = `continue;`;
        return `${code}\n`;
    })
}

export default register;
