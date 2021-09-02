import { useEffect, useState } from "react";
import DataService from "../../services/dataService";
import { Lookup } from "../../store/entities/lookup"
import dateUtilities from "../../utilities/dateUtilities";

export const Tasks = ()=>{

    const [taskGroups, setTaskGroups] = useState([] as Lookup[]);
    const selectedDate = dateUtilities.getMonday(new Date());
    
    useEffect(()=>{
        DataService.getTaskGroupList().then(result=>setTaskGroups(result));
   
        }, []
    )
    return(
        <article className="bodyClass">
            <h1>Tasks</h1>
            <ul>
                {taskGroups.map(function(d,idx){
                    return (<li key={idx}>{d.name}</li>)
                })}
            </ul>
        </article>
    );

}