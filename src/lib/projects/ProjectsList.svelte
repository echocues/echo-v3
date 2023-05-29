<script lang="ts">
    import CircularProgress from "../comps/CircularProgress.svelte";
	import TitleBar from "../comps/TitleBar.svelte";
    import {EchoBackend} from "../ts/api.ts";
    import ProjectCard from "./ProjectCard.svelte";
</script>

<main id="project-list">
    <TitleBar title="Projects" subTitle="Echo">
		<button id="new-project-button">New Project</button>
	</TitleBar>
    <div class="middleground">
        {#await EchoBackend.getProjects("AYJ")}
			<div id="centered-container">
        		<CircularProgress/>	
			</div>
		{:then result}
			<div id="content">
				{#each result as project}
					<ProjectCard project={project}/>
				{/each}
			</div>
        {:catch error}
			{error}
        {/await}
    </div>
</main>

<style lang="scss">
  #project-list {
    width: 100vw;
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    gap: var(--gap-size);
  }

  div {
	width: 100%;
	height: 100%;
  }

  #centered-container {
	widows: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
  }
  
  #content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 24vw);
    padding: 8px;
    box-sizing: border-box;
    overflow-y: auto;
  }

  #new-project-button {
	padding: 6px 14px;
	border-radius: 8px;
	border: solid var(--accent-color) 2px;

	transition: background-color 200ms ease-in-out, border 200ms ease-in-out;

	&:hover {
	  border: solid rgba(0, 0, 0, 0) 2px;
	  background-color: var(--accent-color);
	  color: var(--background-color);
	}
  }
</style>
