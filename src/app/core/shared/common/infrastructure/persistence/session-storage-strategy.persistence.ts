import { Injectable } from "@angular/core";
import { StorageStrategy } from "../../domain/repositories/storage-strategy.repository";

@Injectable({
    providedIn:'root'
})
export class SessionStorageStrategy implements StorageStrategy{
     get<T>(key: string): T | null  {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set(key: string, value: unknown): boolean {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}