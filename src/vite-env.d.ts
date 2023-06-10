/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_FIREBASE_APIKEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECTID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDERID: string;
  readonly VITE_FIREBASE_APPID: string;
  readonly VITE_FIREBASE_MEASUREMENTID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
