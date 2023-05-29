<script lang="ts">
    import type {EchoProject} from "../ts/models";
    import {EchoStores} from "../ts/stores";

    export let project: EchoProject;
    
    function openProject() {
        EchoStores.openedProject.set(project);
    }
</script>

<a class="project-card" on:click={openProject} href="#/project">
    <h3>{project.title}</h3>
    <p>{project.description}</p>
</a>

<style lang="scss">
  .project-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    border: solid var(--foreground-color) 2px;
    border-radius: 8px;
    box-sizing: border-box;
    
    margin: 8px;
    padding: 24px 16px;
    height: 24vh;
    
    transition: background-color 150ms ease-in-out, border 150ms ease-in-out;
    
    &:hover {
      border: solid var(--accent-color) 2px;
      background-color: var(--foreground-color);
      cursor: pointer;
    }
  }
  
  a {
    text-decoration: none;
    color: var(--contrast-color);
  }

  h3 {
    font-weight: 600;
    margin: 0;
    line-height: 100%;
  }
  
  p {
    margin: 0;
    line-height: 100%;
    font-size: 0.8vw;
  }
</style>