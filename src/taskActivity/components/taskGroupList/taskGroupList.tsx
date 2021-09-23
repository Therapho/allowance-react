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
        {(taskGroupSet?.map((group:Lookup, index:number)=>(
            
            <div className={taskGroupListStyles.groupBox} key={group.id}>
                <TaskGroup taskActivityList={groupTasks(group.id)} onStatusChange={onStatusChange}/>
            </div>
        )))}
        </Fragment>
    );    
}
export default TaskGroupList;