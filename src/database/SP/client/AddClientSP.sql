USE [reservations]
GO

CREATE PROCEDURE [dbo].[AddClient]
    @name varchar(45),
    @lastName varchar(20),
    @email varchar(64),
    @tel float

AS
BEGIN
    DECLARE @msg VARCHAR(100);

    INSERT INTO dbo.Client(name, lastname, email, tel)
    VALUES (@name, @lastName, @email, @tel);

    SET @msg = 'Cliente agregado correctamente.';
	SELECT @msg AS Msg;
    RETURN
END
GO