<script lang="ts">
    import {SoundCue} from "./ts/models";
    import TitleBar from "./TitleBar.svelte";
    import {afterUpdate, onMount} from "svelte";
    import Konva from "konva";

    export let soundcues: SoundCue[] = [
        new SoundCue("test", "FILE 1", 1, 1),
        new SoundCue("test", "FILE 2", 1, 1),
        new SoundCue("test", "FILE 3", 1, 1),
        new SoundCue("test", "file 4", 1, 1),
        new SoundCue("test", "File 5", 1, 1),
    ];

    let selectedSoundCue: SoundCue = undefined;
    let waveform;
    let stage;

    onMount(() => {
        let width = waveform.clientWidth;
        let height = waveform.clientHeight;
        stage = new Konva.Stage({
            container: "waveform",
            width: width,
            height: height
        });
        let layer = new Konva.Layer();

        

        stage.add(layer);
        window.addEventListener("resize", updateWaveformSize);
    });
    function updateWaveformSize() {
        if (stage !== undefined) {
            stage.width(waveform.clientWidth);
            stage.height(waveform.clientHeight);
        }
    }
    afterUpdate(updateWaveformSize);
</script>

<main>
    <div id="sound-cues">
        <TitleBar/>
        <div id="sound-cues-list" class="middleground">
            {#each soundcues as cue}
                <button on:click={() => selectedSoundCue = cue}>
                    {cue.fileName}
                </button>
            {/each}
        </div>
    </div>
    <div id="editor">
        <!--{#if selectedSoundCue !== undefined}-->
            <div id="waveform" bind:this={waveform}></div>
            <div id="parameters" class="middleground">

            </div>
        <!--{/if}-->
    </div>
</main>

<style lang="scss">
  main {
    width: 100%;
    height: 100%;

    display: flex;
    gap: var(--gap-size);

    #sound-cues {
      width: 20%;
      height: 100%;

      gap: var(--gap-size);
      display: flex;
      flex-direction: column;

      #sound-cues-list {
        width: 100%;
        height: 100%;
        padding-top: 0.8vh;
        overflow-y: auto;

        button {
          transition: background-color 150ms ease-in-out;
          padding: 0.4vh 1vw;
          width: 100%;
          height: 6%;

          &:hover {
            background-color: var(--complementary-dark-color);
          }
        }
      }
    }

    #editor {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      gap: var(--gap-size);

      #waveform {
        width: 100%;
        flex: 5;
      }

      #parameters {
        flex: 3;
      }
    }
  }
</style>