import { useTranslation as useI18nTranslation } from "react-i18next";
import type { AppLocales } from "../locales/types";
import type {DashboardPlaceholders} from "../locales/types/dashboard";

type NestedKeys<T, P extends string> = {
    [K in keyof T & string]: T[K] extends string
        ? `${P}.${K}`
        : never;
}[keyof T & string];

export type TranslationKeys =
    | NestedKeys<AppLocales["dashboard"], "dashboard">;

type PlaceholderMap = typeof DashboardPlaceholders;

type PlaceholderParams<K> = K extends keyof PlaceholderMap
    ? PlaceholderMap[K]
    : never;

export function useTranslation() {
    const { t, ...rest } = useI18nTranslation();

    return {
        t: <K extends TranslationKeys>(
            key: K,
            params?: PlaceholderParams<K extends `checkout.${infer X}` ? X : never>
        ) => t(key, params),
        ...rest
    };
}
