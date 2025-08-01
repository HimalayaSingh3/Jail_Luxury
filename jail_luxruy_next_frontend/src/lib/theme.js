import { cookies } from "next/headers";

/**
 * Retrieves the theme mode from cookies during SSR.
 * If no theme is found, defaults to system time-based theme.
 */
export async function getThemeFromCookies() {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("theme")?.value;

  if (savedTheme) {
    return savedTheme; // Use stored theme if available
  }

  // Default based on system time (dark mode from 6 PM - 6 AM)
  const currentHour = new Date().getHours();
  return currentHour >= 18 || currentHour < 6 ? "dark" : "light";
}
