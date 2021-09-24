import { useProfile } from "../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../common/stores/profile/types/profileType";
import { ChildDashboard } from "./components/childDashboard/childDashboard";
import { ParentDashBoard } from "./components/parentDashboard/parentDashboard";

export const Home = () => {
  const { data: profile } = useProfile();

  return (
    <main>
      <h1>Summary</h1>
      {profile && (
        <div>
          {checkIfParent(profile) ? <ParentDashBoard /> : <ChildDashboard />}
        </div>
      )}
    </main>
  );
};
