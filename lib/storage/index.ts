export class LocalStorage {
  private static instance: LocalStorage;
  private storage: Storage | null;

  static KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
  };

  private constructor() {
    // Verificar se estamos no browser
    this.storage = typeof window !== "undefined" ? window.localStorage : null;
  }

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  public setItem(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }

  public getItem(key: string): string | null {
    if (this.storage) {
      return this.storage.getItem(key);
    }
    return null;
  }

  public removeItem(key: string): void {
    if (this.storage) {
      this.storage.removeItem(key);
    }
  }
}
