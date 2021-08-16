import React, { Consumer, Provider } from 'react';

export interface IContext{
    user: any
}

const context = React.createContext<IContext|null>(null);

export const ContextProvider:Provider<IContext|null> = context.Provider;
export const ContextConsumer:Consumer<IContext|null> = context.Consumer;