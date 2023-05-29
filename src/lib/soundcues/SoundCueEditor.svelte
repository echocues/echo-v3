<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import Konva from "konva";
    import type {EchoSoundCue} from "../ts/models";
    
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
        if (stage !== undefined) {
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
            x: stage.width() / 2,
            y: stage.height() / 2,
            fontSize: 16,
            fontFamily: "Poppins",
        })

        layer.add(text);
        
        return [
            layer,
        ];
    }
    
    afterUpdate(updateWaveform);
</script>

<div id="waveform" bind:this={waveform}></div>
<div id="parameters" class="middleground">
</div>

<style lang="scss">
  #waveform {
    width: 100%;
    flex: 3;
  }

  #parameters {
    flex: 7;
  }
</style>