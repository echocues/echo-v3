import {writable} from "svelte/store";

export namespace EchoStores {
    export const openedProject = writable<string>();
} 