import axios from "axios";
import { authData } from "../types/authData";

 const getProfile = async () => {
    const response = await axios.get<authData>("/.auth/me");
    return response.data?.clientPrincipal;
};
export default getProfile;