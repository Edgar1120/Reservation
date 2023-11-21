USE [reservations]
GO

CREATE PROCEDURE [dbo].[DeleteService]
    @id int
AS
BEGIN
   
	DECLARE @msg VARCHAR(100);

    IF NOT EXISTS (SELECT 1 FROM dbo.Service WHERE id = @id)
    BEGIN
        SET @msg = 'El servicio con el ID especificado no existe.';
		SELECT @msg AS Msg;
        RETURN;
    END;

    IF EXISTS (SELECT 1 FROM dbo.ServicesDetails WHERE service = @id)
    BEGIN
		SET @msg = 'No se puede eliminar el servicio porque hay registros en ServicesDetails relacionados con �l.';
        SELECT @msg AS Msg;
		RETURN;
    END;

    
    DELETE FROM Service WHERE id = @id;
   
    SET @msg = 'Servicio eliminado correctamente.';
	SELECT @msg AS Msg;
END;
GO