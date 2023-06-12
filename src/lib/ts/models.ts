import {EchoBackend} from "./api";
import {EchoStores} from "./stores";
import {get} from "svelte/store";
import Pizzicato from "pizzicato";

export enum EchoAudioSourceType {
    File = "Audio File",
}

export const EchoAudioSourceMapper = new Map<EchoAudioSourceType, () => EchoAudioSource>()
    .set(EchoAudioSourceType.File, () => new EchoFileAudioSource());

export interface EchoAudioSource {
    type: EchoAudioSourceType;

    play(): Promise<void>;
}

export class EchoFileAudioSource implements EchoAudioSource {
    file: string;
    type: EchoAudioSourceType = EchoAudioSourceType.File;

    async play(): Promise<void> {
        // let stream = await EchoBackend.getAudio(get(EchoStores.openedProject), this.file);
        
        let sound = new Pizzicato.Sound({
            source: "script",
            options: {
                audioFunction: function (e) {
                    let output = e.outputBuffer.getChannelData(0);
                    for (var i = 0; i < e.outputBuffer.length; i++)
                        output[i] = Math.random();
                }
            }
        });
        sound.play();
    }
}

export class EchoSoundCue {
    identifier: string;
    source: EchoAudioSource;
    displayName: string;
    volume: number;
    speed: number;

    constructor(json: any) {
        // temporary to work with legacy api
        this.identifier = json.identifier;
        this.source = new EchoFileAudioSource();
        this.source.file = json.file_name;
        this.displayName = this.source.file;
        this.volume = json.volume;
        this.speed = json.speed;
    }
}

export class EchoProject {
    title: string;
    description: string;
    project_id: string;
    scenes: [];
    sound_cues: EchoSoundCue[];

    constructor(json: any) {
        this.title = json.title;
        this.description = json.description;
        this.project_id = json.project_id;
        this.scenes = json.scenes.map(sceneJson => new EchoScene(sceneJson));
        this.sound_cues = json.sound_cues.map(scJson => new EchoSoundCue(scJson));
    }
}

export class EchoEvent {
    cues: string[];
    notes: string[];
    time: EchoTime;

    constructor(json: any) {
        this.cues = json.cues;
        this.notes = json.notes;
        this.time = new EchoTime(json.time);
    }
}

export class EchoScene {
    name: string;
    events: EchoEvent[]

    constructor(json: any) {
        this.name = json.name;
        this.events = json.events.map(eventJson => new EchoEvent(eventJson));
    }
}

export class EchoTime {
    hours: number;
    minutes: number;
    seconds: number

    constructor(json: any) {
        this.hours = json.hours;
        this.minutes = json.minutes;
        this.seconds = json.seconds;
    }
}

