<script lang="ts">
    import {EchoSoundCue} from "../ts/models";
    import TitleBar from "../comps/TitleBar.svelte";
    import SoundCueEditor from "./SoundCueDetails.svelte";

    export let soundcues: EchoSoundCue[] = [];
    let selectedSoundCue: EchoSoundCue = undefined;
</script>

<main class="SoundCuesTab">
    <div id="sound-cues">
        <TitleBar/>
        <div id="sound-cues-list" class="middleground">
            {#each soundcues as cue}
                <button on:click={() => selectedSoundCue = cue}>
                    <span>
                        {cue.displayName}
                    </span>
                </button>
            {/each}
        </div>
    </div>
    <div id="editor">
        {#if selectedSoundCue !== undefined}
            <SoundCueEditor cue={selectedSoundCue}/>
        {/if}
    </div>
</main>

<style lang="scss">
  .SoundCuesTab {
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

          display: flex;
          align-items: center;

          span {
            font-size: .8vw;
            line-height: 100%;
            text-align: start;
          }

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
    }
  }
</style>
