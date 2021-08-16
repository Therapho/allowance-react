import { useState, useEffect } from "react";
import { Service } from "../types/service";



  const useProfileService =() =>{
    const [result, setResult] = useState<Service<any>>({status:"loading"});
  

  useEffect(() => {
    fetch('/.auth/me')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};


export default useProfileService;