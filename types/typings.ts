/// <reference types="vite/client" />

declare global {
  export interface Document {
    startViewTransition: (cb: () => void) => {
      ready: Promise<unknown>;
    };
  }
}

export {}
