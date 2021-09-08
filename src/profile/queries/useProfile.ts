import { useQuery } from "react-query"
import getProfile from "../api/getProfile"

 export const useProfile=(enabled:boolean=true)=>{
    return useQuery('profile',  getProfile, {enabled:enabled} )
}
