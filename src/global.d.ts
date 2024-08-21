export {};

declare global {
  interface Window {
    facebookEventID: string;
    facebookFbp: string | null | undefined;
    facebookFbc: string | null | undefined;
  }
}
