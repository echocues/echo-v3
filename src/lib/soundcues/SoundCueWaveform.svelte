<script lang="ts">
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    import WaveSurfer from "wavesurfer.js";
    import EnvelopePlugin from "wavesurfer.js/dist/plugins/envelope";
    import { EchoBackend } from "../ts/api";
    import { EchoStores } from "../ts/stores";
    import type { EchoSoundCue } from "../ts/models";

	let waveform: HTMLElement;
	let waveSurfer: WaveSurfer;

	let resetCursor: () => void;
	let onready: () => void;

	let isPlaying: boolean;
	let isReady: boolean;

	export let cue: EchoSoundCue;
    export function setupWaveform(newCue: EchoSoundCue) {
		// unsubscribe to previous event 
		if (resetCursor) resetCursor();
		if (onready) onready();
		
		// reset variables
		isReady = false;
		isPlaying = false;

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
		onready = waveSurfer.on("ready", () => isReady = true);

		const envelope = waveSurfer.registerPlugin(EnvelopePlugin.create({
			lineColor: lineColor,
			lineWidth: "3", 
            volume: newCue.volume,
        }))
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

	onMount(() => setupWaveform(cue));
</script>

<div id="sound-visual">
	<div id="waveform" bind:this={waveform}></div>
	<button class="play-ctrl" on:click={playOrPause}>
		{#if isPlaying}
		{:else}
		{/if}
	</button>
</div>

<style lang="scss">
  #sound-visual {
    width: 100%;
    height: 30%;
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

	.play-ctrl {
	}
  }
</style>
