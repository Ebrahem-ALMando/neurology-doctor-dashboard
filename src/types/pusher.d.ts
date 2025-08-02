declare global {
  interface Window {
    Pusher: any;
  }
}

declare module 'laravel-echo' {
  export default class Echo {
    constructor(options: any);
    private(channel: string): any;
    leave(channel: string): void;
    connector: {
      options: {
        auth?: {
          headers?: Record<string, string>;
        };
      };
    };
  }
}

declare module 'pusher-js' {
  export default class Pusher {
    constructor(key: string, options?: any);
  }
}

export {}; 