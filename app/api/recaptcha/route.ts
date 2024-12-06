import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    if (!body || !body['g-recaptcha-response']) {
      return NextResponse.json({ message: 'reCAPTCHAレスポンスが見つかりません' }, { status: 400 });
    }

    const recaptchaResponse = body['g-recaptcha-response'];
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { message: 'reCAPTCHAシークレットが設定されていません' },
        { status: 500 },
      );
    }

    const apiUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const postData = new URLSearchParams({
      secret: secret,
      response: recaptchaResponse,
    }).toString();

    const success = await verifyRecaptcha(apiUrl, postData);

    const response = {
      success: success,
      message: success ? 'reCAPTCHAが正常に検証されました' : 'reCAPTCHA検証に失敗しました',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: '内部サーバーエラー', error: (error as Error).message },
      { status: 500 },
    );
  }
}

async function verifyRecaptcha(apiUrl: string, postData: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res: any) => {
        let data = '';
        res.on('data', (chunk: string) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            const responseData = JSON.parse(data);
            resolve(responseData.success);
          } else {
            reject(new Error(`reCAPTCHA検証が失敗しました。ステータスコード: ${res.statusCode}`));
          }
        });
      },
    );

    req.on('error', (e: Error) => {
      reject(new Error(`HTTPSリクエストエラー: ${e.message}`));
    });

    req.write(postData);
    req.end();
  });
}
