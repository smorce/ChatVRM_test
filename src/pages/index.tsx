import { useState } from 'react';

const HomePage = () => {
  const [text, setText] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  const convertTextToSpeech = () => {
    // ここにテキストを音声に変換するロジックを実装します。
    // 変換が完了したら、setAudioSrcを使用してaudioSrcの状態を更新します。
    console.log('変換するテキスト:', text);
    // 例: setAudioSrc('変換後の音声ファイルのURL');
  };

  return (
    <div>
      <h1>テキストから音声への変換</h1>
      <textarea
        id="textToConvert"
        placeholder="変換するテキストを入力してください"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button id="convertBtn" onClick={convertTextToSpeech}>変換</button>
      {audioSrc && <audio id="audioPlayer" controls src={audioSrc}></audio>}
    </div>
  );
};

export default HomePage;
