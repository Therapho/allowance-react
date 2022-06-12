import { Fragment } from "react";
import { taskGroupListStyles } from "./taskGroups.styles";
import { TaskGroupListProps } from "./taskGroupList.props";
import { Lookup } from "../../../common/stores/lookup/types/lookupType";
import TaskGroup from "../taskGroup/taskGroup";


const TaskGroupList = ({ taskGroupSet, taskActivitySet, onStatusChange}:TaskGroupListProps)=>{
  
    const groupTasks = (groupId: number) => {
        return taskActivitySet && taskActivitySet.filter((item) => item.taskGroupId === groupId);
      };
    return(
        <Fragment>
        {(taskGroupSet?.map((group:Lookup, index:number)=>{ 
            var tasks = groupTasks(group.id);
            if(tasks.length > 0) return(
            
            <div className={taskGroupListStyles.groupBox} key={group.id}>
                
                <TaskGroup taskActivityList={tasks} onStatusChange={onStatusChange}/>
            </div>
        )
        else return (<Fragment/>) }))}
        </Fragment>
    );    
}
export default TaskGroupList;  