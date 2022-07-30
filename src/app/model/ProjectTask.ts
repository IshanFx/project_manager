export interface ProjectTask{
    id:number,
    name:string,
    status?: "active" | "completed" | "in-progress",
    description?:string,
    children?:ProjectTask[]
}