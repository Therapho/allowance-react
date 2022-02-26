CREATE TABLE [dbo].[Funds] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [AccountID]     INT            NOT NULL,
    [Name]          NVARCHAR (50)  NOT NULL,
    [Description]   NVARCHAR (MAX) NULL,
    [TargetDate]    DATE           NULL,
    [Allocation]    INT            NULL,
    [TargetBalance] MONEY          DEFAULT ((0)) NULL,
    [Balance]       MONEY          DEFAULT ((0)) NOT NULL,
    [Locked]        BIT            DEFAULT ((0)) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Goal_Account] FOREIGN KEY ([AccountID]) REFERENCES [dbo].[Accounts] ([Id])
);

