<script lang="ts">
	import Dropzone from "svelte-file-dropzone/Dropzone.svelte";

    export let initialValue: string = undefined;
    let input: HTMLElement;
	let files = {
		accepted: [],
		rejected: [],
	}

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...files.accepted, ...acceptedFiles];
		files.rejected = [...files.rejected, ...fileRejections];
		console.log(files)
	}
</script>

<Dropzone containerClasses="FilePicker" accept={["audio/*"]} inputElement={input} multiple={false} on:drop={handleFilesSelect}>
  	<input type="file" bind:this={input}/>
    {#if files && files.accepted && files.accepted[0]}
        <span>{files.accepted[0].name}</span>
    {:else if initialValue}
        <span>{initialValue}</span>
    {:else}
        <span>No file selected</span>
    {/if}
</Dropzone>

<style lang="scss">
    :global(.FilePicker) {
      width: 100%;
      height: 16vh !important;
      border: dashed var(--foreground-color) 2px !important;
      border-radius: 8px !important;
	  background-color: transparent !important;
      
      align-items: center;
      justify-content: center;  

	  &:hover {
		cursor: pointer;
	  }
	
	  input {
		display: none;
	  }
    }
</style>

