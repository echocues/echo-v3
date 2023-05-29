<script>
    import TitleBar from "../comps/TitleBar.svelte";
    import {BackEnd} from "../ts/api.ts";
    import ProjectCard from "./ProjectCard.svelte";
</script>

<main id="project-list">
    <TitleBar title="Projects" subTitle="Echo"/>
    <div class="middleground">
        {#await BackEnd.getProjects("AYJ")}
            Loading
        {:then result}
            {#each result as project}
                <ProjectCard project={project}/>
            {/each}
        {:catch error}
            
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
    display: grid;
    grid-template-columns: repeat(auto-fit, 24vw);
    padding: 8px;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>