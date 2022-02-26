CREATE VIEW [dbo].TransactionLogView
	AS SELECT TransactionLog.*, TargetFund.Name as TargetFundName, SourceFund.Name as SourceFundName,
	TargetAccount.Name as TargetAccountName, CallingAccount.Name as CallingAccountName
	FROM TransactionLog
	left outer join Funds as TargetFund on TargetFundId = TargetFund.Id
	left outer join Funds as SourceFund on SourceFundId = SourceFund.Id
	left outer join Accounts as TargetAccount on TargetAccountId=TargetAccount.Id
	left outer join Accounts as CallingAccount on CallingAccountId = CallingAccount.Id