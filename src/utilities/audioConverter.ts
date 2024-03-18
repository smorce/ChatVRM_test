export async function convertTextToSpeechAndEncode(message: string): Promise<void> {
  document.getElementById('convertBtn')!.addEventListener('click', async () => {
    const textElement = document.getElementById('textToConvert') as HTMLTextAreaElement;
    const message = textElement.value;
    if (!message) {
        alert('テキストを入力してください。');
        return;
    }
  
    // リクエストボディのパラメータ設定
    const body = {
        speaker_id: 0, // 仮のパラメータ、必要に応じて適切な値に設定してください
        sdp_ratio: 0.6,
        noise: 0.6,
        noisew: 0.8,
        length: 0.8,
        language: 'JP',
        auto_split: 'true',
        split_interval: 1,
        assist_text: null,
        assist_text_weight: 1.0,
        style: 'Neutral',
        style_weight: 5.0,
        reference_audio_path: null,
        given_tone: false
    };
  
    const PUBLIC_URL = "https://1b98-34-73-200-252.ngrok-free.app";
    const url = new URL(`${PUBLIC_URL}/voice`);
    url.searchParams.append('text', message); // `message`をクエリパラメータに追加
  
    try {
      const response = await fetch(
        url.toString(),
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
              'Content-Type': 'application/json'
          },
        }
      );

      console.log(`koeiromap: Response status: ${response.status}`);
      console.log(`Response: ${response}`);
      const blob = await response.blob();
  
      // BlobをBase64エンコーディングされたテキストに変換
      const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };
  
      // Blobからオーディオを生成し、再生する
      const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
      const audioUrl = URL.createObjectURL(blob);
      audioPlayer.src = audioUrl;
      audioPlayer.play()
        .then(() => console.log("音声再生を開始しました。"))
        .catch(e => console.error("音声再生に失敗しました。", e));
  
      // BlobをBase64エンコーディングされたテキストに変換し、コンソールに表示
      blobToBase64(blob).then(base64 => {
        console.log("Base64エンコーディングされた音声データ:", base64);
      }).catch(error => {
        console.error("BlobをBase64に変換中にエラーが発生しました:", error);
      });
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  });
}