export enum Languages {
    EN = "en",
    PT = "pt",
}

export const localeFiles = {
    [Languages.PT]: () => import("./pt"),
    [Languages.EN]: () => import("./en"),
}