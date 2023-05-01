import { TasksProvider } from "../taskActivity/context/tasksContext";
import DashboardView from "./dashboardView";


export const DashboardPage = () => (
  <TasksProvider>
    <DashboardView />
  </TasksProvider>
);
export default DashboardPage