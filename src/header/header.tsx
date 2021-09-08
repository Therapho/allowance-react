import { FontIcon, Stack,Text } from "@fluentui/react";
import './header.scss';

export const Header = ()=>(
    <Stack

        horizontal
        horizontalAlign='start'
        verticalAlign="center"
        className='headerClass'
    >
        <FontIcon
            aria-label="Currency"
            iconName="AllCurrency"
            className='headerIconClass' />

        <Text className='headerTextClass'>Allowance</Text>

    </Stack>
)