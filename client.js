const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(3008, () => {
  console.log('Connected to server');
  rl.setPrompt('Enter message: ');
  rl.prompt();

  rl.on('line', line => {
    client.write(line);
    rl.prompt();
  });
});

client.on('data', data => {
  console.log('\n' + data.toString().trim());
  rl.prompt();
});

client.on('close', () => {
  console.log('Connection closed');
  process.exit(0);
});
