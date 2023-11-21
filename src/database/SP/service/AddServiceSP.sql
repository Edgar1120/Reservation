USE [reservations]
GO

CREATE PROCEDURE [dbo].[AddService]
    @name varchar(45),
    @category varchar(20),
    @description varchar(64),
    @rackPrice float,
    @netPrice float,
    @tax int
AS
BEGIN
    DECLARE @msg VARCHAR(100);

    IF LEN(@name) = 0
    BEGIN
        SET @msg = 'El nombre del servicio no puede estar en blanco.';
		SELECT @msg AS Msg;
        RETURN;
    END;

    IF @rackPrice <= 0
    BEGIN
        SET @msg = 'El precio rack debe ser mayor que cero.';
        SELECT @msg AS Msg;
        RETURN;
    END;

    IF @netPrice <= 0
    BEGIN
        SET @msg = 'El precio neto debe ser mayor que cero.';
        SELECT @msg AS Msg;
        RETURN;
    END;

    IF @tax < 1 OR @tax > 100
    BEGIN
        SET @msg = 'El impuesto debe estar en el rango de 1 a 100.';
        SELECT @msg AS Msg;
        RETURN;
    END;

    INSERT INTO dbo.Service (name, category, description, rackPrice, netPrice, tax)
    VALUES (@name, @category, @description, @rackPrice, @netPrice, @tax);

    SET @msg = 'Servicio agregado correctamente.';
	SELECT @msg AS Msg;
    RETURN
END
GO