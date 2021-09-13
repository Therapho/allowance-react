import { Fragment } from "react";
import { TaskGroupListProps } from "./taskGroupList.props";
import { useTaskGroupList } from "../services/queries/useTaskGroupList";
import TaskGroup from "./taskGroup";
import { Lookup } from "../../common/services/lookup/types/lookupType";
import { getClassNames } from "./taskGroupList.styles";


const TaskGroupList = ({taskActivityList, onStatusChange}: TaskGroupListProps)=>{
    const classNames = getClassNames();

    const {data: taskGroupList} = useTaskGroupList();
    const groupTasks = (groupId: number) => {
        return taskActivityList.filter(item=>item.taskGroupId === groupId);
    }
    return(
        <Fragment>
        {(taskGroupList?.map((group:Lookup, index:number)=>(
            
            <div className={classNames.groupBox}>
                <TaskGroup taskActivityList={groupTasks(group.id)} onStatusChange={onStatusChange}/>
            </div>
        )))}
        </Fragment>
    );    
}
export default TaskGroupList;