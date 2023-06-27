<script lang="ts">
    import ProjectDetails from "./lib/ProjectDetails.svelte";
    import Home from "./lib/homepage/Home.svelte";
    import ProjectsList from "./lib/projects/ProjectsList.svelte";
    import Router from "svelte-spa-router";
    
    const routes = {
        "/": Home,
		"/app/projects": ProjectsList,
        "/app/project/:id": ProjectDetails,
    }
</script>

<main>
    <Router {routes}/>
</main>
