CREATE TABLE [dbo].[Accounts] (
    [Id]               INT              IDENTITY (1, 1) NOT NULL,
    [Username]         NVARCHAR (50)    NOT NULL,
    [RoleId]           INT              NOT NULL,
    [Name]             NVARCHAR (50)    NOT NULL,
    [Balance]          MONEY            DEFAULT ((0)) NOT NULL,
    [UserIdentifier]   UNIQUEIDENTIFIER NOT NULL,
    [ActiveTaskWeekId] INT              NULL,
    [UserId]           NVARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Accounts_ToRoles] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id])
);

