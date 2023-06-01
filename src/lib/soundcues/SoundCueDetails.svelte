<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import Konva from "konva";
    import type {EchoSoundCue} from "../ts/models";
    import SoundCueProp from "./SoundCueProp.svelte";
    import SelectDropdown from "../comps/SelectDropdown.svelte";
    import {EchoAudioSourceMapper, EchoAudioSourceType, EchoFileAudioSource} from "../ts/models";
    import FilePicker from "../comps/FilePicker.svelte";

    export let cue: EchoSoundCue;
    let waveform: HTMLElement;
    let stage: Konva.Stage;

    onMount(() => {
        let width = waveform.clientWidth;
        let height = waveform.clientHeight;
        stage = new Konva.Stage({
            container: "waveform",
            width: width,
            height: height
        });

        window.addEventListener("resize", updateWaveform);
    });

    function updateWaveform() {
        if (stage && waveform) {
            stage.width(waveform.clientWidth);
            stage.height(waveform.clientHeight);
            stage.removeChildren();
            createLayers().forEach(layer => stage.add(layer));
        }
    }

    function createLayers(): Konva.Layer[] {
        let layer = new Konva.Layer();
        let text = new Konva.Text({
            text: cue.displayName,
            fill: "#ffffff",
            x: 0,
            y: 0,
            fontSize: 16,
            fontFamily: getComputedStyle(document.body).getPropertyValue('--font-fam'),
        })

        layer.add(text);

        return [
            layer,
        ];
    }

    afterUpdate(updateWaveform);
</script>

<div class="SoundCueDetails">
    <div id="waveform" bind:this={waveform}></div>
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
                            <FilePicker/>
                        {/if}
                    </div>
                </div>
            </SoundCueProp>

            <button on:click={() => console.log(cue)}>
                Debug Print
            </button>
        </div>
        <div id="property-details" class="middleground">
            <h3>Advanced Settings</h3>
        </div>
    </div>
</div>

<style lang="scss">
  .SoundCueDetails {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #waveform {
    width: 100%;
    height: 30%;
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

      span {
        font-weight: 300;
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

    button {
      @include property;
    }
    
    :global(.FilePicker) {
      height: 4vh;
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
      
      span {
        font-size: 0.8vw;
      }
      
      button {
        width: 30%;
      }
    }
  }
</style>
