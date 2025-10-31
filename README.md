# chat-tcp

Um chat simples baseado em TCP escrito em Node.js. O projeto contém um servidor que aceita conexões TCP e retransmite (broadcast) mensagens de cada cliente para os demais, e um cliente de exemplo que se conecta ao servidor e envia/recebe mensagens via terminal.

Arquivos principais
- `server.js` — servidor TCP que gerencia conexões de clientes e faz broadcast das mensagens.
- `client.js` — cliente de exemplo que usa `readline` para enviar mensagens ao servidor a partir do terminal.

Como funciona
- `server.js`
  - Usa o módulo `net` do Node para criar um servidor TCP.
  - A cada nova conexão, o servidor atribui um `clientId` incremental e armazena o socket em um objeto `clients`.
  - Quando um cliente envia dados, o servidor percorre todos os clientes conectados e:
    - Exibe localmente a mensagem recebida do cliente que a enviou.
    - Envia (broadcast) a mensagem para todos os outros clientes no formato: `user <id>:  <mensagem>`.
  - Quando um cliente desconecta, ele é removido do objeto `clients`.
- `client.js`
  - Cria um socket TCP e conecta na porta `3008`.
  - Usa `readline` para ler linhas do stdin e enviar para o servidor.
  - Quando recebe dados do servidor, imprime no terminal e reexibe o prompt.
