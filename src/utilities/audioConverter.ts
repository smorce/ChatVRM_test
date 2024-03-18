export async function convertTextToSpeechAndFetchBlob(message: string): Promise<Blob> {
  const body = {
    // リクエストボディのパラメータ
  };

  const PUBLIC_URL = "https://fd21-34-138-166-34.ngrok-free.app";
  const url = new URL(`${PUBLIC_URL}/voice`);
  url.searchParams.append('text', message);

  const response = await fetch(url.toString(), {    // toString() はなくても良い
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
        'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    throw new Error('APIからの応答が正常ではありません。');
  }

  return response.blob();
}
