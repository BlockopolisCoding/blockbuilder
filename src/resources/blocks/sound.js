import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'sound_';
const categoryColor = '#CF63CF';

function register() {
    // start playing a sound (and also it needs to load lol!!)
    registerBlock(`${categoryPrefix}startsound`, {
        message0: 'start sound %1',
        args0: [
            {
                "type": "field_input",
                "name": "SOUND",
                "text": "https://t.ly/2gHlM",
                "spellcheck": false
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const SOUND = block.getFieldValue('SOUND')
        const code = `doSound(\`${SOUND}\`, Scratch.vm.runtime.targets.find(target => target.isStage), Scratch.vm.runtime);`;
        return `${code}\n`;
    })
}

export default register;
