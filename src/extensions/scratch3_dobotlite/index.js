const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const http = require('http');

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
        httpClient.getHttpResponse();
    }
}

class MyHTTPClient {
  constructor() {
    // �R���X�g���N�^�ŏ������Ȃǂ��s�����Ƃ��ł��܂��B
  }

  // HTTP���N�G�X�g�𑗐M���郁�\�b�h
  sendHttpRequest(callback) {
    const options = {
      hostname: 'localhost', // ���N�G�X�g�𑗐M����z�X�g��
      port: 3000, // �|�[�g�ԍ��i80��HTTP�̃f�t�H���g�j
      path: '/hello', // ���N�G�X�g����p�X
      method: 'GET' // HTTP���\�b�h�iGET�APOST�Ȃǁj
    };

    // HTTP���N�G�X�g���쐬
    const req = http.request(options, (res) => {
      // ���X�|���X�f�[�^����M����R�[���o�b�N
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // ���X�|���X�f�[�^�̎�M�����������Ƃ��Ɏ��s
        callback(data); // ���X�|���X�f�[�^���R�[���o�b�N�֐��ɓn��
      });
    });

    // ���N�G�X�g�𑗐M
    req.end();
  }
  
  // ���X�|���X���擾���郁�\�b�h
  getHttpResponse() {
    this.sendHttpRequest((response) => {
      // ���X�|���X�f�[�^�𗘗p����R�[�h�������ɒǉ�
      console.log(response); // ���X�|���X�f�[�^���R���\�[���ɏo�͂Ȃ�
    });
  }
}

// �N���X�̃C���X�^���X���쐬
const httpClient = new MyHTTPClient();


module.exports = Scratch3DobotLite;