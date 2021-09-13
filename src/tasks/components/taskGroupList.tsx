import "./taskGroupList.scss"
import { Fragment } from "react";
import { Lookup } from "../../lookup/types/lookupType";
import { useTaskGroupList } from "../queries/useTaskGroupList";
import { TaskActivityList } from "../types/taskActivity";
import { Task } from "./taskCheckBox";
import TaskGroup from "./taskGroup";

type TaskGroupListProps = {
    taskActivityList: TaskActivityList,
    onStatusChange: (task:Task) => void
}
const TaskGroupList = ({taskActivityList, onStatusChange}: TaskGroupListProps)=>{
    const {data: taskGroupList} = useTaskGroupList();
    const groupTasks = (groupId: number) => {
        return taskActivityList.filter(item=>item.taskGroupId === groupId);
    }
    return(
        <Fragment>
        {(taskGroupList?.map((group:Lookup, index:number)=>(
            
            <div className="groupBox">
                <TaskGroup taskActivityList={groupTasks(group.id)} onStatusChange={onStatusChange}/>
            </div>
        )))}
        </Fragment>
    );    
}
export default TaskGroupList;