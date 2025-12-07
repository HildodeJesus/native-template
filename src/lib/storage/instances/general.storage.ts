import {createMMKV} from "react-native-mmkv";
import type {GeneralStorageSchema} from "@/types/storage";
import {TypedStorage} from "../typed-storage";

const mmkv = createMMKV({
    id: `general-storage`,
    mode: "multi-process",
    readOnly: false
});

export const generalStorage = new TypedStorage<GeneralStorageSchema>(mmkv);
