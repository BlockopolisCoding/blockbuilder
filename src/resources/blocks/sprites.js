import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import { compileVars } from '../compiler/compileVarSection';

const categoryPrefix = 'sprites_';
const categoryColor = '#4C97FF';

function register() {
    registerBlock(`${categoryPrefix}stage`, {
        message0: 'stage sprite',
        args0: [],
        output: "Sprite",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`Scratch.vm.runtime._stageTarget`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}getsprite`, {
        message0: 'get sprite named %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "String"
            },
        ],
        output: "Sprite",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        return [`Scratch.vm.runtime.getSpriteTargetByName("${SPRITE}")`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}getblockuser`, {
        message0: 'sprite/clone which ran this block',
        args0: [],
        output: "Sprite",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`util.target`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}getcloneofwithvar`, {
        message0: 'get clone of %1 with var %2 set to %3',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "VARNAME",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "VARVALUE",
            }
        ],
        output: "Sprite",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        const variable2 = compileVars.next();
        const variable3 = compileVars.next();
        return [`(function(){
        const ${variable} = ${SPRITE || "undefined"}; 
        if(!isSpriteInternal(${variable})) {
        return null
        };
        const ${variable2} = ${variable}.sprite != undefined ? ${variable}.sprite.clones : [];
        const ${variable3} = ${variable2}.length; // hack to save time
        // i stole this from clones plus, its not my code.
        for (let index = 1; index < ${variable3}; index++) {
          const cloneVar = clones[index].lookupVariableByNameAndType(varName, "", true);
          if (
            cloneVar &&
            Scratch.Cast.compare(cloneVar.value, value) === 0
          ) {
            return (clones[index]);
          }
        }
        return null;
        }())`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}issprite`, {
        message0: 'is %1 a sprite',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE"
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        return [`(isSpriteInternal(${SPRITE || "undefined"}))`, javascriptGenerator.ORDER_ATOMIC]
    })
    
    
    registerBlock(`${categoryPrefix}isstage`, {
        message0: 'is %1 stage',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.isStage : false)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}isdisposed`, {
        message0: 'has %1 been deleted',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.isDisposed : true)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}isoriginal`, {
        message0: 'is %1 not a clone',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.isOriginal : true)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}getname`, {
        message0: 'name of %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.getName() : "")})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}getx`, {
        message0: 'x position of %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.x : 0)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}gety`, {
        message0: 'y position of %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.y : 0)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}getdir`, {
        message0: 'direction of %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.direction : 0)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}setx`, {
        message0: 'set x position of %1 to %2',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "NEWVALUE",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'NEWVALUE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        // hack to get rid of the variable defined after by creating a new scope.
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setXY(${NEWVALUE || 0}, ${variable}.y) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}sety`, {
        message0: 'set y position of %1 to %2',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "NEWVALUE",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'NEWVALUE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        // hack to get rid of the variable defined after by creating a new scope.
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setXY(${variable}.x, ${NEWVALUE || 0}) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}setdir`, {
        message0: 'make %1 point in direction %2',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "NEWVALUE",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'NEWVALUE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        // hack to get rid of the variable defined after by creating a new scope.
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setDirection(${NEWVALUE || 0}) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}turncw`, {
        message0: 'turn %1 clockwise by %2 (Scratch) degrees',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "NEWVALUE",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'NEWVALUE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setDirection(${variable}.direction + ${NEWVALUE || 0}) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}turnccw`, {
        message0: 'turn %1 counter-clockwise by %2 (Scratch) degrees',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "NEWVALUE",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'NEWVALUE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setDirection(${variable}.direction - ${NEWVALUE || 0}) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}getxstretch`, {
        message0: 'x stretch of %1 (PenguinMod and forks only)',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.stretch[0] : 0)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}getystretch`, {
        message0: 'y stretch of %1 (PenguinMod and forks only)',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.stretch[1] : 0)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}setxstretch`, {
        message0: 'set x stretch of %1 to %2 (PenguinMod and forks only)',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "NEWVALUE",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'NEWVALUE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setStretch(${NEWVALUE || 0}, ${variable}.stretch[1]) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}setystretch`, {
        message0: 'set y stretch of %1 to %2 (PenguinMod and forks only)',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "NEWVALUE",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'NEWVALUE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setStretch(${variable}.stretch[0], ${NEWVALUE || 0}) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}say`, {
        message0: 'make %1 say %2',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const TEXT = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? Scratch.vm.runtime.emit("SAY", ${variable}, "say", ${TEXT}) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}think`, {
        message0: 'make %1 think %2',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "TEXT",
                "check": "String"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const TEXT = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? Scratch.vm.runtime.emit("SAY", ${variable}, "think", ${TEXT}) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}show`, {
        message0: 'make %1 show',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setVisible(true) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}hide`, {
        message0: 'make %1 show',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setVisible(false) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}isvisible`, {
        message0: '%1 visible?',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.visible : false)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

     registerBlock(`${categoryPrefix}getsize`, {
        message0: 'size of %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"}; return isSpriteInternal(${variable}) ? ${variable}.size : 0)})())`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}setsize`, {
        message0: 'set size of %1 to %2',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "NEWVALUE",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        const NEWVALUE = javascriptGenerator.valueToCode(block, 'NEWVALUE', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        // hack to get rid of the variable defined after by creating a new scope.
        return `{const ${variable} = ${SPRITE || "undefined"}; isSpriteInternal(${variable}) ? ${variable}.setSize(${NEWVALUE || 0}) : 0};\n`;
    })

    registerBlock(`${categoryPrefix}spritetouchingothersprite`, {
        message0: 'is %1 touching %2',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE1",
                "check": "Sprite"
            },
            {
                "type": "input_value",
                "name": "SPRITE2",
                "check": "Sprite"
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE1', javascriptGenerator.ORDER_ATOMIC);
        const OTHER = javascriptGenerator.valueToCode(block, 'SPRITE1', javascriptGenerator.ORDER_ATOMIC);
        const variable = compileVars.next();
        const other = compileVars.next();
        return [`((function(){const ${variable} = (${SPRITE || "undefined"};const ${other} = (${OTHER || "undefined"}; return isSpriteInternal(${variable}) ? Scratch.vm.renderer ? Scratch.vm.renderer.isTouchingDrawables(${variable}.drawableID, [${other}.drawableID]) : false : false)})())`, javascriptGenerator.ORDER_ATOMIC]
    })
}

export default register;
