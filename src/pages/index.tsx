import React, { useState } from 'react';
import { convertTextToSpeechAndEncode } from '../utilities/audioConverter'; // 正しいパスを確認してください

const HomePage = () => {
  const [text, setText] = useState('');

  const handleConvertButtonClick = async () => {
    if (!text) {
      alert('テキストを入力してください。');
      return;
    }

    await convertTextToSpeechAndEncode(text);
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
    </div>
  );
};

export default HomePage;
