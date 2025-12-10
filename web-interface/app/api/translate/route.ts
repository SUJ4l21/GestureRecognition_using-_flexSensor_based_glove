import { NextResponse } from 'next/server';
import { TranslationServiceClient } from '@google-cloud/translate';
import path from 'path';
import fs from 'fs';

const credentialsPath = path.resolve(process.cwd(), 'gcloud-credentials.json');

// Read project ID from credentials file if env var is not set
function getProjectId(): string {
  if (process.env.GOOGLE_PROJECT_ID) {
    return process.env.GOOGLE_PROJECT_ID;
  }
  
  try {
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    return credentials.project_id || '';
  } catch (error) {
    console.error('Error reading credentials file:', error);
    return '';
  }
}

const projectId = getProjectId();

if (!projectId) {
  console.error('Google Cloud Project ID is not set. Please set GOOGLE_PROJECT_ID environment variable or ensure gcloud-credentials.json contains project_id.');
}

const translationClient = new TranslationServiceClient({
  keyFilename: credentialsPath,
  projectId: projectId,
});

export async function POST(request: Request) {
  try {
    if (!projectId) {
      return NextResponse.json({ 
        error: 'Google Cloud Project ID is not configured. Please set GOOGLE_PROJECT_ID environment variable or ensure gcloud-credentials.json contains project_id.' 
      }, { status: 500 });
    }

    const { text, targetLanguage } = await request.json();
    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Missing "text" or "targetLanguage"' }, { status: 400 });
    }

    const googleRequest = {
      parent: `projects/${projectId}/locations/global`,
      contents: [text],
      mimeType: 'text/plain',
      sourceLanguageCode: 'en',
      targetLanguageCode: targetLanguage,
    };

    const [response] = await translationClient.translateText(googleRequest);
    const translatedText = response.translations?.[0]?.translatedText || '';
    return NextResponse.json({ translatedText });

  } catch (error: any) {
    console.error('Google Translate API Error:', error);
    return NextResponse.json({ error: `Failed to translate text: ${error.message}` }, { status: 500 });
  }
}