export class SoundCue {
    identifier: string;
    fileName: string;
    volume: number;
    speed: number;

    constructor(identifier: string, fileName: string, volume: number, speed: number) {
        this.identifier = identifier;
        this.fileName = fileName;
        this.volume = volume;
        this.speed = speed;
    }
}