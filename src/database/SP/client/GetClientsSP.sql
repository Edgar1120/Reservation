USE [reservations]
GO

CREATE PROCEDURE [dbo].[GetClients]
AS
BEGIN
    SELECT * FROM [dbo].[Clients];
END
GO