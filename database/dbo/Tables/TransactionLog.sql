CREATE TABLE [dbo].[TransactionLog] (
    [Id]               INT              IDENTITY (1, 1) NOT NULL,
    [Date]             DATETIME         DEFAULT (getdate()) NOT NULL,
    [Description]      NVARCHAR (50)    NOT NULL,
    [CategoryId]       INT              NOT NULL,
    [Amount]           MONEY            NOT NULL,
    [UserIdentifier]   UNIQUEIDENTIFIER NULL,
    [TargetAccountId]  INT              NOT NULL,
    [CallingAccountId] INT              NULL,
    [SourceFundId]     INT              NULL,
    [TargetFundId]     INT              NULL,
    [PreviousAmount] MONEY NULL, 
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_TransactionLog_ToAccount_Calling] FOREIGN KEY ([CallingAccountId]) REFERENCES [dbo].[Accounts] ([Id]),
    CONSTRAINT [FK_TransactionLog_ToAccounts_Target] FOREIGN KEY ([TargetAccountId]) REFERENCES [dbo].[Accounts] ([Id]),
    CONSTRAINT [FK_TransactionLog_ToFund_Source] FOREIGN KEY ([SourceFundId]) REFERENCES [dbo].[Funds] ([Id]),
    CONSTRAINT [FK_TransactionLog_ToFund_Target] FOREIGN KEY ([TargetFundId]) REFERENCES [dbo].[Funds] ([Id]),
    CONSTRAINT [FK_TransactionLog_ToTransactionCategory] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[TransactionCategories] ([Id])
);

