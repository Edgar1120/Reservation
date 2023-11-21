CREATE PROCEDURE [dbo].[findByName]
    @text VARCHAR(45)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * 
    FROM [dbo].[Service]
    WHERE [name] LIKE '%' + @text + '%';
END
GO