/// <reference types="vite/client" />

declare global {
  export interface Document {
    startViewTransition(callback: () => void): Promise<void>;
  }
}

export {}
