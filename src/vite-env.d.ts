/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_API_URL: string;
  readonly VITE_DEFAULT_SIGN_IN_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
