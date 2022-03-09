﻿/*
Deployment script for C:\CODE\ALLOWANCE-APP\API\DEV\ALLOWANCE.LOCAL.MDF

This code was generated by a tool.
Changes to this file may cause incorrect behavior and will be lost if
the code is regenerated.
*/

GO
SET ANSI_NULLS, ANSI_PADDING, ANSI_WARNINGS, ARITHABORT, CONCAT_NULL_YIELDS_NULL, QUOTED_IDENTIFIER ON;

SET NUMERIC_ROUNDABORT OFF;


GO
:setvar DatabaseName "C:\CODE\ALLOWANCE-APP\API\DEV\ALLOWANCE.LOCAL.MDF"
:setvar DefaultFilePrefix "C_\CODE\ALLOWANCE-APP\API\DEV\ALLOWANCE.LOCAL.MDF_"
:setvar DefaultDataPath "C:\Users\carlor\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"
:setvar DefaultLogPath "C:\Users\carlor\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\"

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
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET AUTO_CLOSE OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
USE [$(DatabaseName)];


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET ANSI_NULLS ON,
                ANSI_PADDING ON,
                ANSI_WARNINGS ON,
                ARITHABORT ON,
                CONCAT_NULL_YIELDS_NULL ON,
                QUOTED_IDENTIFIER ON,
                ANSI_NULL_DEFAULT ON,
                CURSOR_DEFAULT LOCAL,
                AUTO_SHRINK OFF 
            WITH ROLLBACK IMMEDIATE;
    END


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET PAGE_VERIFY NONE,
                DISABLE_BROKER 
            WITH ROLLBACK IMMEDIATE;
    END


GO
ALTER DATABASE [$(DatabaseName)]
    SET TARGET_RECOVERY_TIME = 0 SECONDS 
    WITH ROLLBACK IMMEDIATE;


GO
IF EXISTS (SELECT 1
           FROM   [master].[dbo].[sysdatabases]
           WHERE  [name] = N'$(DatabaseName)')
    BEGIN
        ALTER DATABASE [$(DatabaseName)]
            SET QUERY_STORE (CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 367)) 
            WITH ROLLBACK IMMEDIATE;
    END


GO
PRINT N'Creating Table [dbo].[Accounts]...';


GO
CREATE TABLE [dbo].[Accounts] (
    [Id]               INT              IDENTITY (1, 1) NOT NULL,
    [Username]         NVARCHAR (50)    NOT NULL,
    [RoleId]           INT              NOT NULL,
    [Name]             NVARCHAR (50)    NOT NULL,
    [Balance]          MONEY            NOT NULL,
    [UserIdentifier]   UNIQUEIDENTIFIER NOT NULL,
    [ActiveTaskWeekId] INT              NULL,
    [UserId]           NVARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[ActivityStatus]...';


GO
CREATE TABLE [dbo].[ActivityStatus] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


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
PRINT N'Creating Table [dbo].[Roles]...';


GO
CREATE TABLE [dbo].[Roles] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[Status]...';


GO
CREATE TABLE [dbo].[Status] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[TaskActivities]...';


GO
CREATE TABLE [dbo].[TaskActivities] (
    [Id]                INT              IDENTITY (1, 1) NOT NULL,
    [TaskGroupId]       INT              NOT NULL,
    [Sequence]          INT              NOT NULL,
    [TaskWeekId]        INT              NOT NULL,
    [MondayStatusId]    INT              NOT NULL,
    [TuesdayStatusId]   INT              NOT NULL,
    [WednesdayStatusId] INT              NOT NULL,
    [ThursdayStatusId]  INT              NOT NULL,
    [FridayStatusId]    INT              NOT NULL,
    [SaturdayStatusId]  INT              NOT NULL,
    [SundayStatusId]    INT              NOT NULL,
    [TaskDefinitionId]  INT              NOT NULL,
    [UserIdentifier]    UNIQUEIDENTIFIER NULL,
    [AccountId]         INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[TaskDefinitions]...';


GO
CREATE TABLE [dbo].[TaskDefinitions] (
    [Id]             INT              IDENTITY (1, 1) NOT NULL,
    [TaskGroupId]    INT              NOT NULL,
    [Description]    NVARCHAR (50)    NOT NULL,
    [Value]          MONEY            NOT NULL,
    [Sequence]       INT              NOT NULL,
    [UserIdentifier] UNIQUEIDENTIFIER NULL,
    [AccountId]      INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[TaskGroups]...';


GO
CREATE TABLE [dbo].[TaskGroups] (
    [Id]     INT           IDENTITY (1, 1) NOT NULL,
    [Name]   NVARCHAR (50) NOT NULL,
    [Weekly] BIT           NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[TaskWeeks]...';


GO
CREATE TABLE [dbo].[TaskWeeks] (
    [Id]             INT              IDENTITY (1, 1) NOT NULL,
    [WeekStartDate]  DATE             NOT NULL,
    [StatusId]       INT              NOT NULL,
    [Value]          MONEY            NOT NULL,
    [UserIdentifier] UNIQUEIDENTIFIER NULL,
    [AccountId]      INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[TransactionCategories]...';


GO
CREATE TABLE [dbo].[TransactionCategories] (
    [Id]   INT        IDENTITY (1, 1) NOT NULL,
    [Name] NCHAR (10) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Table [dbo].[TransactionLog]...';


GO
CREATE TABLE [dbo].[TransactionLog] (
    [Id]               INT              IDENTITY (1, 1) NOT NULL,
    [Date]             DATETIME         NOT NULL,
    [Description]      NVARCHAR (50)    NOT NULL,
    [CategoryId]       INT              NOT NULL,
    [Amount]           MONEY            NOT NULL,
    [UserIdentifier]   UNIQUEIDENTIFIER NULL,
    [TargetAccountId]  INT              NOT NULL,
    [CallingAccountId] INT              NULL,
    [SourceFundId]     INT              NULL,
    [TargetFundId]     INT              NULL,
    [PreviousAmount]   MONEY            NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[Accounts]...';


GO
ALTER TABLE [dbo].[Accounts]
    ADD DEFAULT ((0)) FOR [Balance];


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
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TaskActivities]...';


GO
ALTER TABLE [dbo].[TaskActivities]
    ADD DEFAULT ((1)) FOR [MondayStatusId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TaskActivities]...';


GO
ALTER TABLE [dbo].[TaskActivities]
    ADD DEFAULT ((1)) FOR [TuesdayStatusId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TaskActivities]...';


GO
ALTER TABLE [dbo].[TaskActivities]
    ADD DEFAULT ((1)) FOR [WednesdayStatusId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TaskActivities]...';


GO
ALTER TABLE [dbo].[TaskActivities]
    ADD DEFAULT ((1)) FOR [ThursdayStatusId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TaskActivities]...';


GO
ALTER TABLE [dbo].[TaskActivities]
    ADD DEFAULT ((1)) FOR [FridayStatusId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TaskActivities]...';


GO
ALTER TABLE [dbo].[TaskActivities]
    ADD DEFAULT ((1)) FOR [SaturdayStatusId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TaskActivities]...';


GO
ALTER TABLE [dbo].[TaskActivities]
    ADD DEFAULT ((1)) FOR [SundayStatusId];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TaskGroups]...';


GO
ALTER TABLE [dbo].[TaskGroups]
    ADD DEFAULT ((0)) FOR [Weekly];


GO
PRINT N'Creating Default Constraint unnamed constraint on [dbo].[TransactionLog]...';


GO
ALTER TABLE [dbo].[TransactionLog]
    ADD DEFAULT (getdate()) FOR [Date];


GO
PRINT N'Creating Foreign Key [dbo].[FK_Accounts_ToRoles]...';


GO
ALTER TABLE [dbo].[Accounts] WITH NOCHECK
    ADD CONSTRAINT [FK_Accounts_ToRoles] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_Goal_Account]...';


GO
ALTER TABLE [dbo].[Funds] WITH NOCHECK
    ADD CONSTRAINT [FK_Goal_Account] FOREIGN KEY ([AccountID]) REFERENCES [dbo].[Accounts] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToAccount (Id)]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToAccount (Id)] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Accounts] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToActivityStatus_Friday]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToActivityStatus_Friday] FOREIGN KEY ([FridayStatusId]) REFERENCES [dbo].[ActivityStatus] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToActivityStatus_Monday]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToActivityStatus_Monday] FOREIGN KEY ([MondayStatusId]) REFERENCES [dbo].[ActivityStatus] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToActivityStatus_Saturday]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToActivityStatus_Saturday] FOREIGN KEY ([SaturdayStatusId]) REFERENCES [dbo].[ActivityStatus] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToActivityStatus_Sunday]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToActivityStatus_Sunday] FOREIGN KEY ([SundayStatusId]) REFERENCES [dbo].[ActivityStatus] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToActivityStatus_Thursday]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToActivityStatus_Thursday] FOREIGN KEY ([ThursdayStatusId]) REFERENCES [dbo].[ActivityStatus] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToActivityStatus_Tuesday]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToActivityStatus_Tuesday] FOREIGN KEY ([TuesdayStatusId]) REFERENCES [dbo].[ActivityStatus] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToActivityStatus_Wednesday]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToActivityStatus_Wednesday] FOREIGN KEY ([WednesdayStatusId]) REFERENCES [dbo].[ActivityStatus] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToTaskDefinitions (Id)]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToTaskDefinitions (Id)] FOREIGN KEY ([TaskDefinitionId]) REFERENCES [dbo].[TaskDefinitions] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToTaskGroups]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToTaskGroups] FOREIGN KEY ([TaskGroupId]) REFERENCES [dbo].[TaskGroups] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskActivities_ToTaskWeeks]...';


GO
ALTER TABLE [dbo].[TaskActivities] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskActivities_ToTaskWeeks] FOREIGN KEY ([TaskWeekId]) REFERENCES [dbo].[TaskWeeks] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskDefinition_ToTaskGroups]...';


GO
ALTER TABLE [dbo].[TaskDefinitions] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskDefinition_ToTaskGroups] FOREIGN KEY ([TaskGroupId]) REFERENCES [dbo].[TaskGroups] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskDefinitions_ToAccount]...';


GO
ALTER TABLE [dbo].[TaskDefinitions] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskDefinitions_ToAccount] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Accounts] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskWeeks_ToAccount]...';


GO
ALTER TABLE [dbo].[TaskWeeks] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskWeeks_ToAccount] FOREIGN KEY ([AccountId]) REFERENCES [dbo].[Accounts] ([Id]);


GO
PRINT N'Creating Foreign Key [dbo].[FK_TaskWeeks_ToStatus]...';


GO
ALTER TABLE [dbo].[TaskWeeks] WITH NOCHECK
    ADD CONSTRAINT [FK_TaskWeeks_ToStatus] FOREIGN KEY ([StatusId]) REFERENCES [dbo].[Status] ([Id]);


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
PRINT N'Creating Foreign Key [dbo].[FK_TransactionLog_ToTransactionCategory]...';


GO
ALTER TABLE [dbo].[TransactionLog] WITH NOCHECK
    ADD CONSTRAINT [FK_TransactionLog_ToTransactionCategory] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[TransactionCategories] ([Id]);


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
PRINT N'Checking existing data against newly created constraints';


GO
USE [$(DatabaseName)];


GO
ALTER TABLE [dbo].[Accounts] WITH CHECK CHECK CONSTRAINT [FK_Accounts_ToRoles];

ALTER TABLE [dbo].[Funds] WITH CHECK CHECK CONSTRAINT [FK_Goal_Account];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToAccount (Id)];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToActivityStatus_Friday];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToActivityStatus_Monday];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToActivityStatus_Saturday];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToActivityStatus_Sunday];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToActivityStatus_Thursday];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToActivityStatus_Tuesday];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToActivityStatus_Wednesday];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToTaskDefinitions (Id)];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToTaskGroups];

ALTER TABLE [dbo].[TaskActivities] WITH CHECK CHECK CONSTRAINT [FK_TaskActivities_ToTaskWeeks];

ALTER TABLE [dbo].[TaskDefinitions] WITH CHECK CHECK CONSTRAINT [FK_TaskDefinition_ToTaskGroups];

ALTER TABLE [dbo].[TaskDefinitions] WITH CHECK CHECK CONSTRAINT [FK_TaskDefinitions_ToAccount];

ALTER TABLE [dbo].[TaskWeeks] WITH CHECK CHECK CONSTRAINT [FK_TaskWeeks_ToAccount];

ALTER TABLE [dbo].[TaskWeeks] WITH CHECK CHECK CONSTRAINT [FK_TaskWeeks_ToStatus];

ALTER TABLE [dbo].[TransactionLog] WITH CHECK CHECK CONSTRAINT [FK_TransactionLog_ToAccount_Calling];

ALTER TABLE [dbo].[TransactionLog] WITH CHECK CHECK CONSTRAINT [FK_TransactionLog_ToAccounts_Target];

ALTER TABLE [dbo].[TransactionLog] WITH CHECK CHECK CONSTRAINT [FK_TransactionLog_ToFund_Source];

ALTER TABLE [dbo].[TransactionLog] WITH CHECK CHECK CONSTRAINT [FK_TransactionLog_ToFund_Target];

ALTER TABLE [dbo].[TransactionLog] WITH CHECK CHECK CONSTRAINT [FK_TransactionLog_ToTransactionCategory];


GO
PRINT N'Update complete.';


GO