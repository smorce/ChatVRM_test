import React, { useState } from 'react';
import { convertTextToSpeechAndFetchBlob } from '../utilities/audioConverter';

const HomePage = () => {
  const [text, setText] = useState('');

  const handleConvertButtonClick = async () => {
    if (!text) {
      alert('テキストを入力してください。');
      return;
    }

    try {
      const blob = await convertTextToSpeechAndFetchBlob(text);
      const audioUrl = URL.createObjectURL(blob);
      const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
      audioPlayer.src = audioUrl;
      audioPlayer.play()
        .then(() => console.log("音声再生を開始しました。"))
        .catch(e => console.error("音声再生に失敗しました。", e));
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
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
      <button id="convertBtn" onClick={handleConvertButtonClick}>変換</button>
      <audio id="audioPlayer" controls></audio>
    </div>
  );
};

export default HomePage;
