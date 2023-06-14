<script lang="ts">
    import {get} from "svelte/store";
    import {onMount} from "svelte";
    import WaveSurfer from "wavesurfer.js";
    import EnvelopePlugin from "wavesurfer.js/dist/plugins/envelope";
    import {EchoBackend} from "../ts/api";
    import {EchoStores} from "../ts/stores";
    import type {EchoSoundCue} from "../ts/models";

    let waveform: HTMLElement;
    let waveSurfer: WaveSurfer;

    let resetCursor: () => void;
    let onready: () => void;
    let onprogress: () => void;

    let isPlaying: boolean;
    let isReady: boolean;
    
    let duration: string;
    let currentTime: string;
    
    export let cue: EchoSoundCue;

    export function setupWaveform(newCue: EchoSoundCue, showEnvelope: boolean) {
        // unsubscribe to previous event 
        if (resetCursor) resetCursor();
        if (onready) onready();
        if (onprogress) onprogress();

        // reset variables
        isReady = false;
        isPlaying = false;
        currentTime = "0.0";

        // destroy previous waveform
        waveform.innerHTML = "";

        const waveColor = getComputedStyle(waveform).getPropertyValue("--wave-color");
        const completedColor = getComputedStyle(waveform).getPropertyValue("--wave-color-complete");
        const lineColor = getComputedStyle(waveform).getPropertyValue("--foreground-color");

        waveSurfer = WaveSurfer.create({
            container: waveform,
            waveColor: waveColor,
            progressColor: completedColor,
            height: "auto",
            url: EchoBackend.getAudioUrl(get(EchoStores.openedProject), newCue.source.file),
            barWidth: 2,
            barGap: 2,
            barRadius: 8,
        });

        resetCursor = waveSurfer.on("finish", () => {
            waveSurfer.setTime(0);
            isPlaying = false;
        });
        onready = waveSurfer.on("ready", () => {
            duration = waveSurfer.getDuration().toFixed(2) + "s";
            isReady = true;
        });
        onprogress = waveSurfer.on("timeupdate", (time: number) => {
           currentTime = time.toFixed(2); 
        });
        
        if (showEnvelope) {
            const envelope = waveSurfer.registerPlugin(EnvelopePlugin.create({
                lineColor: lineColor,
                lineWidth: "3",
                volume: newCue.volume,
            }));
        }
    }

    function playOrPause() {
        if (!waveSurfer) return;
        if (isPlaying) {
            waveSurfer.pause();
            isPlaying = false;
        } else if (isReady) {
            waveSurfer.play();
            isPlaying = true;
        }
    }

    onMount(() => setupWaveform(cue, false));
</script>

<div id="sound-visual">
    <div id="waveform" bind:this={waveform}></div>
    {#if isReady}
        <div id="play-ctrl">
            <span>{currentTime}/{duration}</span>
            <button id="play-btn" on:click={playOrPause}>
                {#if isPlaying}
                    <svg fill="currentColor" width="800px" height="800px" viewBox="0 0 32 32" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"></path>
                    </svg>
                {:else}
                    <svg fill="currentColor" width="800px" height="800px" viewBox="0 0 32 32" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"></path>
                    </svg>
                {/if}
            </button>
        </div>
    {/if}
</div>

<style lang="scss">
  #sound-visual {
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;

    #waveform {
      width: 100%;
      height: 90%;
      background-color: var(--background-color);

      --wave-color: var(--accent-color);
      --wave-color-complete: var(--accent-color-dark);
    }

    #play-ctrl {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      
      span {
        line-height: 100%;
      }
      
      #play-btn {
        padding: 0;
        max-height: 3vh;

        svg {
          color: var(--contrast-color);
          height: 3vh;
          width: auto;
        }
      }
    }
  }
</style>
