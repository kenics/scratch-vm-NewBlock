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
  // Python�X�N���v�g�����s���邽�߂̃I�v�V������ݒ�
  const options = {
    scriptPath: './', // Python�X�N���v�g�̃p�X���w��
    args: ['arg1', 'arg2'], // �X�N���v�g�ɓn���������w�� (�C��)
  };

  // Python�X�N���v�g�����s
  const results = await new Promise((resolve, reject) => {
    PythonShell.run('sample.py', options, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

  // ���X�|���X��Ԃ� (��: Python�X�N���v�g�̎��s���ʂ�props�Ƃ��ēn��)
  return {
    props: {
      pythonResults: results,
    },
  };
}


module.exports = Scratch3DobotLite;