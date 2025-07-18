"use client";
import Cookies from "js-cookie";

export const getTokenWithClient = (): string | null => {
    return Cookies.get("token") || null;
};
