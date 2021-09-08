import { Label, Stack, Text } from "@fluentui/react";
import { useProfileData } from "../profile/profileProvider";


export const Dashboard = ()=>{

    
    const {account} = useProfileData();
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
