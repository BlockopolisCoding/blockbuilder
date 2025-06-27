import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'events_';
const categoryColor = '#FFBF00';

function register() {
    // setInterval
    registerBlock(`${categoryPrefix}interval`, {
        message0: 'every %1 seconds do %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "TIME",
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
        inputsInline: true,
        colour: categoryColor,
    }, () => {
        const TIME = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `setInterval(async () => { ${BLOCKS} }, (${TIME} * 1000));`;
        return `${code}\n`;
    })
    // setTimeout
    registerBlock(`${categoryPrefix}timeout`, {
        message0: 'in %1 seconds do %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "TIME",
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
        colour: categoryColor,
    }, () => {
        const TIME = javascriptGenerator.valueToCode();
        const BLOCKS = javascriptGenerator.statementToCode();
        const code = `setTimeout(async () => { ${BLOCKS} }, (${TIME} * 1000));`;
        return `${code}\n`;
    })

    // when flag

    registerBlock(`${categoryPrefix}flagclicked`, {
        message0: 'when flag clicked (before green flag event) %1 %2 ',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, () => {
        const BLOCKS = javascriptGenerator.statementToCode();
        let code = `Scratch.vm.runtime.on('PROJECT_START', async()=>{${BLOCKS}});`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}projectstopped`, {
        message0: 'when project stopped %1 %2 ',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, () => {
        const BLOCKS = javascriptGenerator.statementToCode();
        let code = `Scratch.vm.runtime.on('PROJECT_STOP_ALL', async()=>{${BLOCKS}});`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}beforeexecute`, {
        message0: 'before execute %1 %2 ',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, () => {
        const BLOCKS = javascriptGenerator.statementToCode();
        let code = `Scratch.vm.runtime.on('BEFORE_EXECUTE', async()=>{${BLOCKS}});`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}afterexecute`, {
        message0: 'after execute %1 %2 ',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, () => {
        const BLOCKS = javascriptGenerator.statementToCode();
        let code = `Scratch.vm.runtime.on('AFTER_EXECUTE', async()=>{${BLOCKS}});`;
        return `${code}\n`;
    })
}

export default register;
