/// <reference types="vite/client" />

declare global {
  export interface Document {
    startViewTransition(callback: () => void): void;
  }
}

export {}
