import net from 'node:net';
import { stdout } from 'node:process';
import { Writable, PassThrough } from 'node:stream';
import * as readline from 'node:readline';
import colors from 'colors';

const logger = (message) => {
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(colors.yellow(message));
};

const output = Writable({
  write(chunk, encoding, callback) {
    const { id, message } = JSON.parse(chunk);

    if (message) {
      logger(message);
    } else {
      stdout.write(`username: [${id.slice(0, 8)}] `.bold.bgBlue);
    }
    callback();
  },
});

const enhaceoutput = new PassThrough();

enhaceoutput.on('data', () => {
  logger('type: ');
});

process.stdin.pipe(enhaceoutput).pipe(net.connect(9000)).pipe(output);
