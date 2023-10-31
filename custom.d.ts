declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
interface ImportMetaEnv {
  readonly VITE_API_API_KEY: string;
  readonly VITE_API_AUTH_DOMAIN: string;
  readonly VITE_API_DATABASE_URL: string;
  readonly VITE_API_PROJECT_ID: string;
  readonly VITE_API_STORAGE_BUCKET: string;
  readonly VITE_API_MESSAGING_SENDER_ID: string;
  readonly VITE_API_APP_ID: string;
  readonly VITE_API_MEASURENT_ID: string;
  readonly VITE_API_SITE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.png" {
  const value: any;
  export default value;
}
