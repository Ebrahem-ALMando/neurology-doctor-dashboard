import { cookies } from "next/headers";

export const getTokenWithServer = (): string | null => {
    const cookieStore:cookies = cookies();
    return cookieStore.get("token")?.value || null;
};
