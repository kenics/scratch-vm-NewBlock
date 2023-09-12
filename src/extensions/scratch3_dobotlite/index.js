const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const {PyhthonShell} = require('python-shell');

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
	log.log(getStaticProps())
    }
}

export async function getStaticProps() {
  // Pythonスクリプトを実行するためのオプションを設定
  const options = {
    scriptPath: './', // Pythonスクリプトのパスを指定
    args: ['arg1', 'arg2'], // スクリプトに渡す引数を指定 (任意)
  };

  // Pythonスクリプトを実行
  const results = await new Promise((resolve, reject) => {
    PythonShell.run('sample.py', options, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  // レスポンスを返す (例: Pythonスクリプトの実行結果をpropsとして渡す)
  return {
    props: {
      pythonResults: results,
    },
  };
}


module.exports = Scratch3DobotLite;