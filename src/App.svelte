<script lang="ts">
    import ProjectDetails from "./lib/ProjectDetails.svelte";
    import ProjectsList from "./lib/projects/ProjectsList.svelte";
    import Router from "svelte-spa-router";
    
    const routes = {
        "/": ProjectsList,
        "/project/:id": ProjectDetails,
    }
</script>

<main>
    <Router {routes}/>
</main>
