﻿/*
Deployment script for Allowance-DB

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "Allowance-DB"
:setvar DefaultFilePrefix "Allowance-DB"
:setvar DefaultDataPath ""
:setvar DefaultLogPath ""

GO
:on error exit
GO
/*
Detect SQLCMD mode and disable script execution if SQLCMD mode is not supported.
To re-enable the script after enabling SQLCMD mode, execute the following:
SET NOEXEC OFF; 
*/
:setvar __IsSqlCmdEnabled "True"
GO
IF N'$(__IsSqlCmdEnabled)' NOT LIKE N'True'
    BEGIN
        PRINT N'SQLCMD mode must be enabled to successfully execute this script.';
        SET NOEXEC ON;
    END


GO
IF EXISTS (SELECT 1
           FROM   [sys].[databases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET QUERY_STORE = OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
/*
The column [dbo].[TransactionLog].[AccountId] is being dropped, data loss could occur.

The column [dbo].[TransactionLog].[TargetAccountId] on table [dbo].[TransactionLog] must be added, but the column has no default value and does not allow NULL values. If the table contains data, the ALTER script will not work. To avoid this issue you must either: add a default value to the column, mark it as allowing NULL values, or enable the generation of smart-defaults as a deployment option.
*/

IF EXISTS (select top 1 1 from [dbo].[TransactionLog])
    RAISERROR (N'Rows were detected. The schema update is terminating because data loss might occur.', 16, 127) WITH NOWAIT

GO
PRINT N'Dropping Foreign Key [dbo].[FK_TransactionLog_ToAccounts]...';


GO
ALTER TABLE [dbo].[TransactionLog] DROP CONSTRAINT [FK_TransactionLog_ToAccounts];


GO
PRINT N'Altering Table [dbo].[TaskActivities]...';


GO
ALTER TABLE [dbo].[TaskActivities] ALTER COLUMN [UserIdentifier] UNIQUEIDENTIFIER NULL;


GO
PRINT N'Altering Table [dbo].[TransactionLog]...';


GO
ALTER TABLE [dbo].[TransactionLog] DROP COLUMN [AccountId];


GO
ALTER TABLE [dbo].[TransactionLog] ALTER COLUMN [UserIdentifier] UNIQUEIDENTIFIER NULL;


GO
ALTER TABLE [dbo].[TransactionLog]
    ADD [TargetAccountId]  INT   NOT NULL,
        [CallingAccountId] INT   NULL,
        [SourceFundId]     INT   NULL,
        [TargetFundId]     INT   NULL,
        [PreviousAmount]   MONEY NULL;


GO
PRINT N'Creating Table [dbo].[Funds]...';


GO
CREATE TABLE [dbo].[Funds] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [AccountID]     INT            NOT NULL,
    [Name]          NVARCHAR (50)  NOT NULL,
    [Description]   NVARCHAR (MAX) NULL,
    [TargetDate]    DATE           NULL,
    [Allocation]    INT            NULL,
    [TargetBalance] MONEY          NULL,
    [Balance]       MONEY          NOT NULL,
    [Locked]        BIT            NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Funds]...';


GO
ALTER TABLE [dbo].[Funds]
    ADD DEFAULT ((0)) FOR [TargetBalance];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Funds]...';


GO
ALTER TABLE [dbo].[Funds]
    ADD DEFAULT ((0)) FOR [Balance];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Funds]...';


GO
ALTER TABLE [dbo].[Funds]
    ADD DEFAULT ((0)) FOR [Locked];


GO
PRINT N'Creating Foreign Key [dbo].[FK_Goal_Account]...';


GO
ALTER TABLE [dbo].[Funds] WITH NOCHECK
    ADD CONSTRAINT [FK_Goal_Account] FOREIGN KEY ([AccountID]) REFERENCES [dbo].[Accounts] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TransactionLog_ToAccount_Calling]...';


GO
ALTER TABLE [dbo].[TransactionLog] WITH NOCHECK
    ADD CONSTRAINT [FK_TransactionLog_ToAccount_Calling] FOREIGN KEY ([CallingAccountId]) REFERENCES [dbo].[Accounts] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TransactionLog_ToAccounts_Target]...';


GO
ALTER TABLE [dbo].[TransactionLog] WITH NOCHECK
    ADD CONSTRAINT [FK_TransactionLog_ToAccounts_Target] FOREIGN KEY ([TargetAccountId]) REFERENCES [dbo].[Accounts] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TransactionLog_ToFund_Source]...';


GO
ALTER TABLE [dbo].[TransactionLog] WITH NOCHECK
    ADD CONSTRAINT [FK_TransactionLog_ToFund_Source] FOREIGN KEY ([SourceFundId]) REFERENCES [dbo].[Funds] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TransactionLog_ToFund_Target]...';


GO
ALTER TABLE [dbo].[TransactionLog] WITH NOCHECK
    ADD CONSTRAINT [FK_TransactionLog_ToFund_Target] FOREIGN KEY ([TargetFundId]) REFERENCES [dbo].[Funds] ([Id]);


GO
PRINT N'Creating View [dbo].[TransactionLogView]...';


GO
CREATE VIEW [dbo].TransactionLogView
	AS SELECT TransactionLog.*, TargetFund.Name as TargetFundName, SourceFund.Name as SourceFundName,
	TargetAccount.Name as TargetAccountName, CallingAccount.Name as CallingAccountName
	FROM TransactionLog
	left outer join Funds as TargetFund on TargetFundId = TargetFund.Id
	left outer join Funds as SourceFund on SourceFundId = SourceFund.Id
	left outer join Accounts as TargetAccount on TargetAccountId=TargetAccount.Id
	left outer join Accounts as CallingAccount on CallingAccountId = CallingAccount.Id
GO
