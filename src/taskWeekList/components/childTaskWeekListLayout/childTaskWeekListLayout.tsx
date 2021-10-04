import { Fragment } from "react";
import { useAccount } from "../../../common/stores/account/queries/useAccount";
import TaskWeekList from "../taskWeekList/taskWeekList";

type ChildTaskWeekListLayoutProps ={

    startDate: Date,
    endDate: Date
}
const ChildTaskWeekListLayout = ({startDate, endDate} : ChildTaskWeekListLayoutProps)=>{
    const {data:account} = useAccount();
    return (
        <Fragment>
            {account && <TaskWeekList startDate={startDate} endDate={endDate} account={account}/>}
        </Fragment>
        
    )
}

export default ChildTaskWeekListLayout;