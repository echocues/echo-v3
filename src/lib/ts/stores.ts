import {writable} from "svelte/store";
import {EchoProject} from "./models";

export namespace EchoStores {
    export let openedProject = writable<EchoProject>(undefined);
}