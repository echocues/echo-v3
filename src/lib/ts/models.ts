export class EchoSoundCue {
    identifier: string;
    fileName: string;
    volume: number;
    speed: number;

    constructor(json: any) {
        this.identifier = json.identifier;
        this.fileName = json.file_name;
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

