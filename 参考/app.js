document.getElementById('convertBtn').addEventListener('click', async () => {
    const text = document.getElementById('textToConvert').value;
    if (!text) {
        alert('テキストを入力してください。');
        return;
    }

    // 定義されたパラメータ、text変数を使用して更新
    const params = {
        // text: text, // ユーザー入力テキストを設定
        speaker_id: 0,
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

    // 音声を取得して再生する関数
    async function getAndPlayVoice() {
        const PUBLIC_URL = 'https://f431-34-90-206-27.ngrok-free.app'; // 使用するAPIのURL
        // URLにクエリパラメータを追加
        const url = new URL(`${PUBLIC_URL}/voice`);
        url.searchParams.append('text', text);

        // その他のパラメータはリクエストボディに含める
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        // try {
        //     const response = await fetch(`${PUBLIC_URL}/voice`, {
        //         method: 'POST',
        //         body: JSON.stringify(params), // パラメータをJSON形式に変換
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
            console.log(`Status Code: ${response.status}`);
            
            // 音声を取得して再生する関数内の一部を変更
            if (response.ok) {
                const blob = await response.blob();
                // Blobからオーディオを生成し、再生する
                const url = URL.createObjectURL(blob);
                // 既存の<audio>要素を使用する
                const audioPlayer = document.getElementById('audioPlayer');
                audioPlayer.src = url;
                audioPlayer.play()
                    .then(() => console.log("音声再生を開始しました。"))
                    .catch(e => console.error("音声再生に失敗しました。", e));
            } else {
                console.log("リクエストに失敗しました。");
                // エラーメッセージの詳細を表示
                response.json().then(data => console.log("エラーメッセージ:", JSON.stringify(data)));
            }

        } catch (error) {
            console.error("エラーが発生しました:", error);
        }
    }

    // 関数を呼び出す
    await getAndPlayVoice();
});
