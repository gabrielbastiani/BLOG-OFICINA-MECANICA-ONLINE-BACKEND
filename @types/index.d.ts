declare namespace Express {
    export interface Request {
        user_id: string;
    }
}

declare namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
    }
  }