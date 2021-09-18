import { useMutation } from "react-query"
import { acceptTaskWeek } from "../api/acceptTaskWeek";
import { TaskWeek } from "../types/taskWeekType";

export const useAcceptTaskWeekMutation = ()=>{
    return useMutation((taskWeek:TaskWeek) => acceptTaskWeek(taskWeek));
}