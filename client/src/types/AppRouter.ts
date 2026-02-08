// Client-only TypeScript definitions for the server AppRouter
// This file must NOT import any server code or runtime dependencies.

import { z } from 'zod';

// Minimal types for routes used by the client. Extend as needed.

export namespace Auth {
  export type WebRegisterInput = {
    openId: string;
    name?: string | null;
    email?: string | null;
    provider?: string | null;
  };

  export type WebRegisterOutput = { success: true };

  export type MeOutput = any | null; // replace `any` with a stricter user shape if desired

  export type LogoutOutput = { success: true };
}

export namespace Upload {
  export type GetUploadUrlInput = { fileName: string; contentType: string };
  export type GetUploadUrlOutput = { url: string; key: string };
}

export namespace Tracking {
  export type VisitInput = { url: string; visitorId?: string | null };
  export type VisitOutput = { success: true };

  export type StatsInput = { url: string };
  export type StatsOutput = any; // replace with actual stats shape if desired
}

export interface AppRouter {
  auth: {
    webRegister: {
      input: Auth.WebRegisterInput;
      output: Auth.WebRegisterOutput;
    };
    me: {
      input: undefined;
      output: Auth.MeOutput;
    };
    logout: {
      input: undefined;
      output: Auth.LogoutOutput;
    };
  };
  upload: {
    getUploadUrl: {
      input: Upload.GetUploadUrlInput;
      output: Upload.GetUploadUrlOutput;
    };
  };
  tracking: {
    visit: { input: Tracking.VisitInput; output: Tracking.VisitOutput };
    stats: { input: Tracking.StatsInput; output: Tracking.StatsOutput };
  };
  // add other routers as needed (system, etc.)
}

export type inferProcedureInput<T> = T extends { input: infer I } ? I : undefined;
export type inferProcedureOutput<T> = T extends { output: infer O } ? O : unknown;
