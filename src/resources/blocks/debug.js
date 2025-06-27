import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'debug_';
const categoryColor = '#666666';

function register() {
    // console.log
    registerBlock(`${categoryPrefix}log`, {
        message0: 'log %1',
        args0: [
            {
                "type": "input_value",
                "name": "LOG"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const LOG = javascriptGenerator.valueToCode();
        const code = `console.log(${LOG});`;
        return `${code}\n`;
    })

    // console.warn
    registerBlock(`${categoryPrefix}warn`, {
        message0: 'warn %1',
        args0: [
            {
                "type": "input_value",
                "name": "LOG"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const LOG = javascriptGenerator.valueToCode();
        const code = `console.warn(${LOG});`;
        return `${code}\n`;
    })

    // console.error
    registerBlock(`${categoryPrefix}error`, {
        message0: 'error %1',
        args0: [
            {
                "type": "input_value",
                "name": "LOG"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        const LOG = javascriptGenerator.valueToCode();
        const code = `console.error(${LOG});`;
        return `${code}\n`;
    })

    // raw block
    registerBlock(`${categoryPrefix}rawblock`, {
        message0: 'raw %1',
        args0: [
            {
                "type": "field_input",
                "name": "RAW",
                "spellcheck": false
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const RAW = block.getFieldValue()
        const code = `${RAW};`;
        return `${code}\n`;
    })

    // raw reporter
    registerBlock(`${categoryPrefix}raw`, {
        message0: 'raw %1',
        args0: [
            {
                "type": "field_input",
                "name": "RAW",
                "spellcheck": false
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const RAW = block.getFieldValue()
        return [RAW, javascriptGenerator.ORDER_ATOMIC];
    })

    // comment
    registerBlock(`${categoryPrefix}comment`, {
        message0: '// %1',
        args0: [
            {
                "type": "field_input",
                "name": "COMMENT",
                "spellcheck": false
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const COMMENT = block.getFieldValue()
        const code = `// ${COMMENT}`;
        return `${code}\n`;
    })

    // comment
    registerBlock(`${categoryPrefix}commentstack`, {
        message0: '/* %1 %2 */',
        args0: [
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
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `/*
${BLOCKS}*/;`;
        return `${code}\n`;
    })

    // code ran?
    registerBlock(`${categoryPrefix}catch`, {
        message0: 'code finished successfully? (runs code) %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FUNC"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor,
    }, () => {
        const FUNC = javascriptGenerator.statementToCode();
        return [`await (async () => { try { ${FUNC} return true; } catch { return false; } })()`, javascriptGenerator.ORDER_ATOMIC];
    })
}

export default register;
