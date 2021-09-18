import { Fragment } from "react";
import { TaskGroupListProps } from "./taskGroupList.props";
import { useTaskGroupList } from "../services/queries/useTaskGroupList";
import TaskGroup from "./taskGroup";
import { Lookup } from "../../common/services/lookup/types/lookupType";
import { taskGroupListStyles } from "./taskGroupList.styles";
import { Task } from "./taskCheckbox.props";


const TaskGroupList = ({taskActivityList, canEdit, onStatusChange}: TaskGroupListProps)=>{
  

    const {data: taskGroupList} = useTaskGroupList();
    const groupTasks = (groupId: number) => {
        return taskActivityList.filter(item=>item.taskGroupId === groupId);
    }
    const handleStatusChange = (task:Task)=>{
        if(canEdit) onStatusChange(task);
    }
    return(
        <Fragment>
        {(taskGroupList?.map((group:Lookup, index:number)=>(
            
            <div className={taskGroupListStyles.groupBox}>
                <TaskGroup taskActivityList={groupTasks(group.id)} onStatusChange={handleStatusChange}/>
            </div>
        )))}
        </Fragment>
    );    
}
export default TaskGroupList;