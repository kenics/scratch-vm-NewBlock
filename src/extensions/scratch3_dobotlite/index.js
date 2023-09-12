const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const { spawn } = require('child_process');
const pythonScriptPath = './my_script.py';
const pythonArgs = ['arg1', 'arg2'];

const pythonProcess = spawn('python', [pythonScriptPath, ...pythonArgs]);

class Scratch3DobotLite {
    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'dobotlite',
            name: 'Dobot Lite',
            blocks: [
                {
                    opcode: 'writeLog',
                    blockType: BlockType.COMMAND,
                    text: 'log [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "hello"
                        }
                    }
                }
            ],
            menus: {
            }
        };
    }

    writeLog (args) {
        const text = Cast.toString(args.TEXT);
        log.log(text);
    }

    

    pythonProcess.stdout.on('data', (data) => {
      log.log('Python Script Output:' + {data});
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        log.log('Python Script Execution Successful');
      } else {
        log.log(`Python Script Execution Failed with Code: ${code}`);
      }
    });
}


module.exports = Scratch3DobotLite;