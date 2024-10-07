import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

import env from './env.js';

const clientId = env('GOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOGLE_AUTH_CLIENT_SECRET');

// Абсолютний шлях до файлу google-oauth.json
const oauthConfigPath = path.resolve('google-oauth.json');

// Читаємо файл google-oauth.json та перетворюємо в json формат
const oauthConfig = JSON.parse(await readFile(oauthConfigPath));

// Беремо з файлу google-oauth.json потрібне значення
const redirectUri = oauthConfig.web.redirect_uris[0];

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri,
});

// Створюємо спеціальне посилання, яке перекидає юзера
export const generateGoogleOAuthUrl = () => {
  const url = googleOAuthClient.generateAuthUrl({
    // Інформація, яка нам потрібна про юзера з гугла
    scope: [
      'https://www.gooleapis.com/auth/userinfo.email',
      'https://www.gooleapis.com/auth/userinfo.profile',
    ],
  });

  return url;
};
