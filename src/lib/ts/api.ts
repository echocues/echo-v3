import {EchoProject} from "./models";

export namespace BackEnd {
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
}