import fetch from 'node-fetch';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!text) throw 'uhm.. what do you want to say?';
    await m.react('🤖');
    let username = m.sender.split('@')[0];
    const prompt = encodeURIComponent(text);
    let apiurl = `https://gpt4.guruapi.tech/bing?username=${username}&query=${prompt}`;

    const result = await fetch(apiurl);
    const response = await result.json();
    
    if (!response.result) throw 'No result found';

    const replyText = response.result;
    await conn.sendButton(
      m.chat, 
      replyText, 
      author, 
      'https://api.shannmoderz.xyz/server/file/XyjKP6IA0VnyFZF.jpg', 
      [['Go with Gpt', `.gpt ${text}`]], 
      null, 
      [['Follow Me', `https://github`]], 
      m
    );
  } catch (error) {
    console.error(error);
    m.reply('Oops! Something went wrong. Marisel is trying hard to fix it A.');
  }
};

handler.help = ['bing <text>'];
handler.tags = ['tools'];
handler.command = /^(bing)$/i;

export default handler;

