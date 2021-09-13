import { Label, Stack, Text } from "@fluentui/react";
import { useAccount } from "../common/services/account/queries/useAccount";


export const Dashboard = ()=>{

    
    const {data:account} = useAccount();
    
    return(
        <Stack horizontalAlign='center' wrap horizontal >
            <Stack.Item className='card'>
                <Label>Name</Label>
                <Text>{account?.name}</Text>
            </Stack.Item>
            <Stack.Item className='card'>
                <Label>Balance</Label>
                <Text>{account?.balance}</Text>
            </Stack.Item>
            
        </Stack>
    );
}
