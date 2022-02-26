CREATE TABLE [dbo].[TaskDefinitions] (
    [Id]             INT              IDENTITY (1, 1) NOT NULL,
    [TaskGroupId]    INT              NOT NULL,
    [Description]    NVARCHAR (50)    NOT NULL,
    [Value]          MONEY            NOT NULL,
    [Sequence]       INT              NOT NULL,
    [UserIdentifier] UNIQUEIDENTIFIER NULL,
    [AccountId]      INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_TaskDefinition_ToTaskGroups] FOREIGN KEY ([TaskGroupId]) REFERENCES [dbo].[TaskGroups] ([Id]),
    CONSTRAINT [FK_TaskDefinitions_ToAccount] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Accounts] ([Id])
);

