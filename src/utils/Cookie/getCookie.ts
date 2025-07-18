"use client";
import Cookies from "js-cookie";

/**
 * جلب قيمة كوكـي باستخدام js-cookie
 * @param name اسم الكوكي
 * @returns القيمة أو null إن لم توجد
 */
export const getCookie = (name: string): string | null => {
    return Cookies.get(name) || null;
};
