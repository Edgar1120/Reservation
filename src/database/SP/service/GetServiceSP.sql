USE [reservations]
GO

CREATE PROCEDURE [dbo].[GetServices]
AS
BEGIN
    SELECT * FROM [dbo].[Service];
END
GO