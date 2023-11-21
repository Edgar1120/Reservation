CREATE DATABASE reservations
GO

USE reservations
GO

CREATE TABLE [dbo].[User](
	[id] [int] IDENTITY NOT NULL,
	[name] [varchar](45) NOT NULL,
	[password] [varchar](30) NOT NULL,
	[type] [varchar](15) NOT NULL,
	[agency] [int] NULL,
	PRIMARY KEY (id)
)
GO

CREATE TABLE [dbo].[Client](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](45) NOT NULL,
	[lastname] [varchar](45) NOT NULL,
	[email] [varchar](45) NOT NULL,
	[tel] [varchar](15) NOT NULL,
	PRIMARY KEY (id)
)
GO

CREATE TABLE [dbo].[Agency](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idJuridic] [varchar](50) NOT NULL, 
	[name] [varchar](45) NOT NULL,
	[direction] [varchar](45) NOT NULL,
	[email] [varchar](45) NOT NULL,
	[tel] [varchar](15) NOT NULL,
	PRIMARY KEY (id)
)
GO

CREATE TABLE [dbo].[Reservation](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[client] [int] NULL,
	[agency] [int] NULL,
	[date] [Date] NOT NULL,
	[status] [varchar](15) NOT NULL,
	PRIMARY KEY (id)
)
GO

CREATE TABLE [dbo].[Service](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](45) NOT NULL,
	[category] [varchar](20) NOT NULL,
	[description] [varchar](64) NOT NULL,
	[rackPrice] [float] NOT NULL,
	[netPrice] [float] NOT NULL,
	[tax] [int] NOT NULL,
	PRIMARY KEY (id)
)
GO

CREATE TABLE [dbo].[ServicesDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[reservation] [int] NOT NULL,
	[service] [int] NOT NULL,
	[pax] [int] NOT NULL,
	[time] [time](7) NOT NULL,
	[price] [float] NOT NULL,
	[tax] [int] NOT NULL,
	PRIMARY KEY (id)
)
GO

CREATE TABLE [dbo].[Contract](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[agency] [int] NOT NULL,
	[service] [int] NOT NULL,
	[price] [float] NOT NULL,
	[discount] [int] NOT NULL
	PRIMARY KEY (id)
)
GO

CREATE TABLE [dbo].[Bill](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[reservation] [int] NOT NULL,
	[total] [float] NOT NULL
	PRIMARY KEY (id)
)
GO

CREATE TABLE [dbo].[BillDetails](
	[bill] [int] NOT NULL,
	[service] [int] NOT NULL,
	[rawPrice] [float] NOT NULL,
	[netPrice] [float] NOT NULL
) 
GO


ALTER TABLE [dbo].[User] WITH CHECK ADD CONSTRAINT [fk_user_agency] FOREIGN KEY([agency])
REFERENCES [dbo].[Agency] ([id])
GO


ALTER TABLE [dbo].[Reservation] WITH CHECK ADD CONSTRAINT [fk_reservation_client] FOREIGN KEY([client])
REFERENCES [dbo].[Client] ([id])
GO

ALTER TABLE [dbo].[Reservation] WITH CHECK ADD CONSTRAINT [fk_reservation_agency] FOREIGN KEY([agency])
REFERENCES [dbo].[Agency] ([id])
GO

ALTER TABLE [dbo].[Bill] WITH CHECK ADD CONSTRAINT [fk_bill_reservation] FOREIGN KEY([reservation])
REFERENCES [dbo].[Reservation] ([id])
GO

ALTER TABLE [dbo].[BillDetails] WITH CHECK ADD CONSTRAINT [FK_billdetails_bill] FOREIGN KEY([bill])
REFERENCES [dbo].[Bill] ([id])
GO

ALTER TABLE [dbo].[ServicesDetails] WITH CHECK ADD CONSTRAINT [FK_servicesdetails_reservation] FOREIGN KEY([reservation])
REFERENCES [dbo].[Reservation] ([id])
GO

ALTER TABLE [dbo].[ServicesDetails] WITH CHECK ADD CONSTRAINT [FK_servicesdetails_service] FOREIGN KEY([service])
REFERENCES [dbo].[Service] ([id])
GO

ALTER TABLE [dbo].[Contract] WITH CHECK ADD CONSTRAINT [FK_contract_agency] FOREIGN KEY([agency])
REFERENCES [dbo].[Agency] ([id])
GO

ALTER TABLE [dbo].[Contract] WITH CHECK ADD CONSTRAINT [FK_contract_service] FOREIGN KEY([service])
REFERENCES [dbo].[Service] ([id])
GO