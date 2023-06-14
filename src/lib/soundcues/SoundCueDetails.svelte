<script lang="ts">
    import type {EchoSoundCue} from "../ts/models";
    import SoundCueProp from "./SoundCueProp.svelte";
    import SelectDropdown from "../comps/SelectDropdown.svelte";
    import {EchoAudioSourceMapper, EchoAudioSourceType} from "../ts/models";
    import FilePicker from "../comps/FilePicker.svelte";
    import SoundCueWaveform from "./SoundCueWaveform.svelte";
    import Toggle from "../comps/Toggle.svelte";

    let cue: EchoSoundCue;
    let waveform: SoundCueWaveform;
    let enableVolumeOverlay: boolean = false;

    export function updatedCue(newCue: EchoSoundCue) {
        cue = newCue;
        updateWaveform(newCue, enableVolumeOverlay);
    }
    
    function updateWaveform(newCue: EchoSoundCue, enableEnvelope: boolean) {
        if (!waveform) return;
        waveform.setupWaveform(newCue, enableEnvelope);
    }
    
    $: {
        updateWaveform(cue, enableVolumeOverlay);
    }

</script>

{#if cue}
    <div class="SoundCueDetails">
        <SoundCueWaveform bind:this={waveform} cue={cue}/>
        <div id="editor">
            <div id="properties" class="middleground">
                <h3>Properties</h3>
                <SoundCueProp propName="Name">
                    <input type="text" bind:value={cue.displayName}/>
                </SoundCueProp>
                <SoundCueProp propName="Audio Source">
                    <div id="audio-source">
                        <SelectDropdown options={Array.from(EchoAudioSourceMapper.keys())} bind:selected={cue.source.type}/>
                        <div id="audio-source-details">
                            {#if cue.source.type === EchoAudioSourceType.File}
                                <FilePicker initialValue={cue.source.file}/>
                            {/if}
                        </div>
                    </div>
                </SoundCueProp>
            </div>
            <div id="property-details" class="middleground">
                <h3>Advanced Settings</h3>
                <SoundCueProp propName="Overlays">
                    <div id="overlays">
                        <Toggle bind:enabled={enableVolumeOverlay}>
                            <span>Volume</span>
                        </Toggle>
                    </div>
                </SoundCueProp>
            </div>
        </div>
    </div>
{:else}
    <div>Select a Cue to Get Started</div>
{/if}

<style lang="scss">
  .SoundCueDetails {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #editor {
    height: 70%;
    display: flex;
    gap: var(--gap-size);

    #properties {
      flex: 2;
      height: 100%;
      padding: 0 16px;

      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    #property-details {
      flex: 5;
      height: 100%;
      padding: 0 16px;
      
      display: flex;
      flex-direction: column;
      gap: 16px;
      
      #overlays {
        display: flex;
        flex-direction: row;
        gap: 8px;
      }
    }

    h3 {
      margin: 16px 0 0;
      font-weight: 600;
      font-size: 1.4vw;
    }
  }

  @mixin property() {
    background-color: var(--foreground-color);
    outline: none;
    border: solid transparent 2px;
    width: 100%;
    height: 4vh;
    border-radius: 8px;

    padding: 2px 6px;
    box-sizing: border-box;

    color: var(--contrast-color);
    font-family: var(--font-fam);

    transition: border 100ms ease-in-out;

    &:hover {
      border: solid var(--accent-color) 2px;
    }
  }

  :global(.SoundCueProp) {
    input {
      @include property;
    }

    :global(.FilePicker) {
      height: 4vh;

      :global(button) {
        @include property;
      }
    }
  }

  #audio-source {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 8px;

    #audio-source-details {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
</style>
