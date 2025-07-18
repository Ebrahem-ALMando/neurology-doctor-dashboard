"use client";
import Cookies from "js-cookie";

/**
 * تعيين قيمة في الكوكيز باستخدام js-cookie
 * @param name اسم الكوكي
 * @param value القيمة
 * @param days عدد الأيام التي تبقى فيها الكوكي فعالة
 */
export const setCookie = (name: string, value: string, days = 90) => {
    Cookies.set(name, value, {
        expires: days,
        secure: true,
        sameSite: "Strict",
        path: "/",
    });
};
