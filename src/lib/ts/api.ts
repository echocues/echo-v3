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

	export async function getProject(projectId: string): Promise<EchoProject> {
		let response = await fetch(`${url}/project/${projectId}`);

		if (!response.ok) {
			console.log(`Failed to get project with id: ${projectId}`);
			return undefined;
		}

		let json = await response.json();
		return new EchoProject(json);
	}
    
    export async function getAudio(projectId: string, fileName: string): Promise<ReadableStream> {
        let response = await fetch(`${url}/audio/${projectId}/${fileName}`);
    
        if (!response.ok) {
            console.log(`Failed to get audio file with name: ${fileName} from project ${projectId}`);
            return undefined;
        }
        
        return response.body;
    }
    
    export function getAudioUrl(projectId: string, fileName: string): string {
        return `${url}/audio/${projectId}/${fileName}`
    }
}
