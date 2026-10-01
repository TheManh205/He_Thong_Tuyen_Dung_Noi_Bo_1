import { useEffect, useRef } from 'react';

/**
 * Hook tự động lưu form data (auto-save draft) vào LocalStorage
 * @param storageKey Key để lưu trong LocalStorage
 * @param data Dữ liệu form hiện tại cần lưu
 * @param delay Thời gian debounce (ms) - mặc định 3000ms (3s)
 */
export const useAutoSaveDraft = <T>(storageKey: string, data: T, delay: number = 3000) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(data));
      console.log(`[AutoSave] Dữ liệu đã được lưu nháp vào: ${storageKey}`);
    }, delay);

    return () => clearTimeout(handler);
  }, [data, storageKey, delay]);
};

/**
 * Hàm hỗ trợ lấy dữ liệu nháp từ LocalStorage
 */
export const getDraftData = <T>(storageKey: string): T | null => {
  try {
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const clearDraftData = (storageKey: string) => {
  localStorage.removeItem(storageKey);
};
