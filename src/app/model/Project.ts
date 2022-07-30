
import { ProjectTask } from "./ProjectTask"

export interface Project{
    id:number,
    name:string,
    isCollapsed?:boolean,
    tasks?:ProjectTask[]
}