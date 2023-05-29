import {EchoProject} from "./models";

export namespace EchoBackend {
    const url: string = "https://echoapi.w1nterish3re.repl.co";
    
    export async function getProjects(username: string): Promise<EchoProject[]> {
        let response = await fetch(`${url}/project/user/${username}`);
        
        if (!response.ok) {
            console.error(`Failed to get projects of user: ${username}`)
            return [];
        }
        
        let json = await response.json();
        return json.map(projectJson => new EchoProject(projectJson)); 
    }

	export async function getProject(project_id: string): Promise<EchoProject> {
		let response = await fetch(`${url}/project/${project_id}`);

		if (!response.ok) {
			console.log(`Failed to get project with id: ${project_id}`);
			return undefined;
		}

		let json = await response.json();
		return new EchoProject(json);
	}
}
