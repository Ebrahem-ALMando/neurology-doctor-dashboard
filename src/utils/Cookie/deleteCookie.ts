"use client";
import Cookies from "js-cookie";

/**
 * حذف كوكـي باستخدام js-cookie
 * @param name اسم الكوكي
 */
export const deleteCookie = (name: string) => {
    Cookies.remove(name, { path: "/" });
};
