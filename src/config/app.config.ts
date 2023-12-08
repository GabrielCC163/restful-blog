export enum ApplicationEnvEnum {
  LOCAL = 'LOCAL',
  PRODUCTION = 'PRODUCTION',
}

export interface AppConfig {
  app_name: string;
  node_env: string;
  base_url: string;
  app_env?: ApplicationEnvEnum;
  auth_secret: string;
  database: {
    user: string;
    password: string;
    name: string;
    host: string;
    port: number;
  };
}

export const getConfig = (): AppConfig => {
  const env = process.env;

  return {
    app_name: env.APP_NAME,
    node_env: env.NODE_ENV,
    base_url: env.BASE_URL,
    app_env: ApplicationEnvEnum[env.APP_ENV] || ApplicationEnvEnum.LOCAL,
    auth_secret: env.AUTH_SECRET,
    database: {
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      name: env.DB_NAME,
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
    },
  };
};
