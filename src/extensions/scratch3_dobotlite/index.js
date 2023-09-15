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
    // コンストラクタで初期化などを行うことができます。
  }

  // HTTPリクエストを送信するメソッド
  sendHttpRequest(callback) {
    const options = {
      hostname: 'localhost', // リクエストを送信するホスト名
      port: 3000, // ポート番号（80はHTTPのデフォルト）
      path: '/hello', // リクエストするパス
      method: 'GET' // HTTPメソッド（GET、POSTなど）
    };

    // HTTPリクエストを作成
    const req = http.request(options, (res) => {
      // レスポンスデータを受信するコールバック
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // レスポンスデータの受信が完了したときに実行
        callback(data); // レスポンスデータをコールバック関数に渡す
      });
    });

    // リクエストを送信
    req.end();
  }
  
  // レスポンスを取得するメソッド
  getHttpResponse() {
    this.sendHttpRequest((response) => {
      // レスポンスデータを利用するコードをここに追加
      console.log(response); // レスポンスデータをコンソールに出力など
    });
  }
}

// クラスのインスタンスを作成
const httpClient = new MyHTTPClient();


module.exports = Scratch3DobotLite;