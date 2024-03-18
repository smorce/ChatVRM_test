export async function convertTextToSpeechAndFetchBlob(message: string): Promise<Blob> {
  const body = {
    // リクエストボディのパラメータ
  };

  const PUBLIC_URL = "https://1b98-34-73-200-252.ngrok-free.app";
  const url = new URL(`${PUBLIC_URL}/voice`);
  url.searchParams.append('text', message);

  const response = await fetch(url.toString(), {
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
