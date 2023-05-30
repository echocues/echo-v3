<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import Konva from "konva";
    import type {EchoSoundCue} from "../ts/models";
    import SoundCueProp from "./SoundCueProp.svelte";
    import SelectDropdown from "../comps/SelectDropdown.svelte";

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
        console.log(cue);

        if (stage !== undefined && waveform !== undefined) {
            stage.width(waveform.clientWidth);
            stage.height(waveform.clientHeight);
            stage.removeChildren();
            createLayers().forEach(layer => stage.add(layer));
        }
    }

    function createLayers(): Konva.Layer[] {
        let layer = new Konva.Layer();
        let text = new Konva.Text({
            text: cue.fileName,
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
                <input type="text" bind:value={cue.fileName}/>
            </SoundCueProp>
            <SoundCueProp propName="Audio Source">
                <SelectDropdown options={["Audio Source", "Recording", "Synthesize"]}/>
            </SoundCueProp>
        </div>
        <div id="property-details" class="middleground">
            <h3>Property Details</h3>
            <span>This property has no extensive details</span>
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

  :global(.SoundCueProp) {
    input {
      background-color: var(--foreground-color);
      outline: none;
      border: none;
      width: 100%;
      height: 4vh;
      border-radius: 8px;

      padding: 4px 8px;
      box-sizing: border-box;

      color: var(--contrast-color);
      font-family: var(--font-fam);
    }
  }
</style>