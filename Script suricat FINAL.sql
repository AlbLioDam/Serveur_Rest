#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

DROP DATABASE IF EXISTS suricat;
CREATE DATABASE IF NOT EXISTS suricat;
USE suricat;

#------------------------------------------------------------
# Table: Users
#------------------------------------------------------------

CREATE TABLE Users(
        idUser                      int (11) Auto_increment  NOT NULL ,
        email                       Varchar (50) NOT NULL ,
        password                    Varchar (20) NOT NULL ,
        firstname                   Varchar (30) NOT NULL ,
        lastname                    Varchar (30) NOT NULL ,
        status                      Varchar (30) ,
        car                         Bool ,
        carsharing                  Bool ,
        active                      Bool ,
        address                     Varchar (100) ,
        city                        Varchar (100) ,
        corporateLifeRepresentative Bool ,
        workCouncilRepresentative   Bool ,
        idDepartment                Int NOT NULL ,
        PRIMARY KEY (idUser )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Team
#------------------------------------------------------------

CREATE TABLE Team(
        idTeam             int (11) Auto_increment  NOT NULL ,
        teamName           Varchar (30) NOT NULL ,
        projectName        Varchar (30) ,
        projectDescription Varchar (500) ,
        PRIMARY KEY (idTeam )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Department
#------------------------------------------------------------

CREATE TABLE Department(
        idDepartment   int (11) Auto_increment  NOT NULL ,
        departmentName Varchar (30) NOT NULL ,
        PRIMARY KEY (idDepartment ) ,
        UNIQUE (departmentName )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Actuality
#------------------------------------------------------------

CREATE TABLE Actuality(
        idActuality   int (11) Auto_increment  NOT NULL ,
        title         Varchar (50) ,
        dateActuality Datetime NOT NULL ,
        publication   Varchar (2000) NOT NULL ,
        photo         blob ,
        idUser        Int NOT NULL ,
        PRIMARY KEY (idActuality )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: LeisureActuality
#------------------------------------------------------------

CREATE TABLE LeisureActuality(
        category    Varchar (50) NOT NULL ,
        idActuality Int NOT NULL ,
        PRIMARY KEY (idActuality )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: TeamActuality
#------------------------------------------------------------

CREATE TABLE TeamActuality(
        idActuality Int NOT NULL ,
        idTeam      Int NOT NULL ,
        PRIMARY KEY (idActuality )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Rdv
#------------------------------------------------------------

CREATE TABLE Rdv(
        idRdv       int (11) Auto_increment  NOT NULL ,
        dateRdv     Datetime NOT NULL ,
        description Varchar (100) NOT NULL ,
        color       Varchar (10) ,
        idTeam      Int NOT NULL ,
        PRIMARY KEY (idRdv )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Task
#------------------------------------------------------------

CREATE TABLE Task(
        idTask   int (11) Auto_increment  NOT NULL ,
        taskName Varchar (60) NOT NULL ,
        detail   Varchar (250) ,
        PRIMARY KEY (idTask ) ,
        UNIQUE (taskName )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Tool
#------------------------------------------------------------

CREATE TABLE Tool(
        idTool   int (11) Auto_increment  NOT NULL ,
        toolName Varchar (60) NOT NULL ,
        PRIMARY KEY (idTool ) ,
        UNIQUE (toolName )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: CorporateLifeActuality
#------------------------------------------------------------

CREATE TABLE CorporateLifeActuality(
        idActuality Int NOT NULL ,
        PRIMARY KEY (idActuality )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: WorksCouncilActuality
#------------------------------------------------------------

CREATE TABLE WorksCouncilActuality(
        idActuality Int NOT NULL ,
        PRIMARY KEY (idActuality )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Message
#------------------------------------------------------------

CREATE TABLE Message(
        idMessage    int (11) Auto_increment  NOT NULL ,
        message      Varchar (250) NOT NULL ,
        dateMessage  Datetime NOT NULL ,
        idUser       Int NOT NULL ,
        idUser_Users Int NOT NULL ,
        readStatus   Bool ,
        PRIMARY KEY (idMessage )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: notify
#------------------------------------------------------------

CREATE TABLE notify(
        idUser      Int NOT NULL ,
        idActuality Int NOT NULL ,
        PRIMARY KEY (idUser ,idActuality )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: postComment
#------------------------------------------------------------

CREATE TABLE postComment(
        commentary     Varchar (250) NOT NULL ,
        dateCommentary Datetime NOT NULL ,
        idUser         Int NOT NULL ,
        idActuality    Int NOT NULL ,
        PRIMARY KEY (idUser ,idActuality, dateCommentary)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: have
#------------------------------------------------------------

CREATE TABLE have(
        idTeam Int NOT NULL ,
        idTask Int NOT NULL ,
        idUser Int NOT NULL ,
        PRIMARY KEY (idTeam ,idTask ,idUser )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: gotShortcut
#------------------------------------------------------------

CREATE TABLE gotShortcut(
        shortcut Varchar (200) NOT NULL ,
        idUser   Int NOT NULL ,
        idTeam   Int NOT NULL ,
        PRIMARY KEY (idUser ,idTeam, shortcut)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: gotTool
#------------------------------------------------------------

CREATE TABLE gotTool(
        visible  Bool NOT NULL ,
        position TinyINT NOT NULL ,
        idUser   Int NOT NULL ,
        idTeam   Int NOT NULL ,
        idTool   Int NOT NULL ,
        PRIMARY KEY (idUser ,idTeam ,idTool )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: toDo
#------------------------------------------------------------

CREATE TABLE toDo(
        duration    TinyINT NOT NULL ,
        status      Varchar (30) NOT NULL ,
        weight      TinyINT ,
        dateDeDebut Datetime ,
        dateDeFin   Datetime ,
        idTeam      Int NOT NULL ,
        idTask      Int NOT NULL ,
        PRIMARY KEY (idTeam ,idTask )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: belongTo
#------------------------------------------------------------

CREATE TABLE belongTo(
        idUser Int NOT NULL ,
        idTeam Int NOT NULL ,
        PRIMARY KEY (idUser ,idTeam )
)ENGINE=InnoDB;

ALTER TABLE Users ADD CONSTRAINT FK_Users_idDepartment FOREIGN KEY (idDepartment) REFERENCES Department(idDepartment);
ALTER TABLE Actuality ADD CONSTRAINT FK_Actuality_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE LeisureActuality ADD CONSTRAINT FK_LeisureActuality_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE TeamActuality ADD CONSTRAINT FK_TeamActuality_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE TeamActuality ADD CONSTRAINT FK_TeamActuality_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE Rdv ADD CONSTRAINT FK_Rdv_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE CorporateLifeActuality ADD CONSTRAINT FK_CorporateLifeActuality_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE WorksCouncilActuality ADD CONSTRAINT FK_WorksCouncilActuality_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE Message ADD CONSTRAINT FK_Message_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE Message ADD CONSTRAINT FK_Message_idUser_Users FOREIGN KEY (idUser_Users) REFERENCES Users(idUser);
ALTER TABLE notify ADD CONSTRAINT FK_notify_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE notify ADD CONSTRAINT FK_notify_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE postComment ADD CONSTRAINT FK_postComment_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE postComment ADD CONSTRAINT FK_postComment_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE have ADD CONSTRAINT FK_have_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE have ADD CONSTRAINT FK_have_idTask FOREIGN KEY (idTask) REFERENCES Task(idTask);
ALTER TABLE have ADD CONSTRAINT FK_have_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE gotShortcut ADD CONSTRAINT FK_gotShortcut_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE gotShortcut ADD CONSTRAINT FK_gotShortcut_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE gotTool ADD CONSTRAINT FK_gotTool_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE gotTool ADD CONSTRAINT FK_gotTool_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE gotTool ADD CONSTRAINT FK_gotTool_idTool FOREIGN KEY (idTool) REFERENCES Tool(idTool);
ALTER TABLE toDo ADD CONSTRAINT FK_toDo_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE toDo ADD CONSTRAINT FK_toDo_idTask FOREIGN KEY (idTask) REFERENCES Task(idTask);
ALTER TABLE belongTo ADD CONSTRAINT FK_belongTo_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE belongTo ADD CONSTRAINT FK_belongTo_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);


#------------------------------------------------------------
# INSERT : DEPARTMENT
#------------------------------------------------------------
INSERT INTO Department(departmentName) VALUES ("Service développement");
INSERT INTO Department(departmentName) VALUES ("Service secrétariat");
INSERT INTO Department(departmentName) VALUES ("Service marketing");
INSERT INTO Department(departmentName) VALUES ("Administrateur");
INSERT INTO Department(departmentName) VALUES ("Service Informatique");

#------------------------------------------------------------
# INSERT : USERS
#------------------------------------------------------------
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("david.dimarcantonio@suricat.fr", "1234", "David", "Di-marcantonio", "Admin", true, true, true, "Chez David", "Ville de David", 4, 0, 0);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("lionel.chialvo@suricat.fr", "1234", "Lionel", "Chialvo", "Chef de projet", true, true, true, "Chez Lionel", "Ville de Lionel", 1, 1, 0);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("alban.martinez@suricat.fr", "1234", "Alban", "Martinez", "Utilisateur", true, true, true, "Chez Alban", "Ville d'Alban", 1, 0, 1);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("damien.elsabbagh@suricat.fr", "1234", "Damien", "El sabbagh", "Utilisateur", true, true, true, "Chez Damien", "Ville de Damien", 1, 0, 0);

INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("cyril.mathieu@suricat.fr", "1234", "Cyril", "Mathieu", "Chef de projet", true, true, true, "Chez Cyril", "Ville de Cyril", 1, 0, 0);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("benjamin.champetier@suricat.fr", "1234", "Benjamin", "Champetier", "Utilisateur", true, true, true, "Chez Benji", "Ville de Benji", 1, 0, 0);

INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("mathieu.peyramard@suricat.fr", "1234", "Mathieu", "Peyramard", "Chef de projet", true, true, true, "Chez Mathieu", "Ville de Mathieu", 1, 0, 1);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("florent.valadier@suricat.fr", "1234", "Florent", "Valadier", "Utilisateur", true, true, true, "Chez Florent", "Ville de Florent", 1, 0, 0);

INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("manu.piat@suricat.fr", "1234", "Manu", "Piat", "Utilisateur", true, true, true, "Chez Manu", "Ville de Manu", 1, 0, 1);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("anais.gueyte@suricat.fr", "1234", "Anais", "Gueyte", "Utilisateur", true, true, true, "Chez Anais", "Ville de Anais", 1, 0, 1);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("khadidja.boudjema@suricat.fr", "1234", "Khadidja", "Boudjema", "Chef de projet", true, true, true, "Chez Khadidja", "Ville de Khadidja", 1, 1, 1);

INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("marc.naouache@suricat.fr", "1234", "Marc", "Naouache", "Utilisateur", true, true, true, "Chez Marc", "Ville de Marc", 1, 0, 1);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment, corporateLifeRepresentative, workCouncilRepresentative) 
VALUES ("audric.lespagnol@suricat.fr", "1234", "Audric", "Lespagnol", "Chef de projet", true, true, true, "Chez Audric", "Ville d'Audric", 1, 0, 1);

#------------------------------------------------------------
# INSERT : TEAM
#------------------------------------------------------------
INSERT INTO Team(teamName, projectName, projectDescription) VALUES ("Team Suricat", "Suricat", "Site web communautaire en entreprise");
INSERT INTO Team(teamName, projectName, projectDescription) VALUES ("Team MonitorYourLan", "MonitorYourLan", "Application lourde et mobile de détection matériel");
INSERT INTO Team(teamName, projectName, projectDescription) VALUES ("Team WhiskyBoard", "WhiskyBoard", "Application de dégustation");
INSERT INTO Team(teamName, projectName, projectDescription) VALUES ("Team GoldenEyes", "GoldenEyes", "Application mobile de surveillance d'habitation'");
INSERT INTO Team(teamName, projectName, projectDescription) VALUES ("Team EntreNous", "EntreNous", "Site web de recherche de bar commun");

#------------------------------------------------------------
# INSERT : belongTo (Users - Team)
#------------------------------------------------------------
INSERT INTO belongTo(idUser, idTeam) VALUES (1, 1);
INSERT INTO belongTo(idUser, idTeam) VALUES (1, 2);
INSERT INTO belongTo(idUser, idTeam) VALUES (1, 3);
INSERT INTO belongTo(idUser, idTeam) VALUES (1, 4);
INSERT INTO belongTo(idUser, idTeam) VALUES (1, 5);

INSERT INTO belongTo(idUser, idTeam) VALUES (2, 1);
INSERT INTO belongTo(idUser, idTeam) VALUES (3, 1);
INSERT INTO belongTo(idUser, idTeam) VALUES (4, 1);

INSERT INTO belongTo(idUser, idTeam) VALUES (5, 2);
INSERT INTO belongTo(idUser, idTeam) VALUES (6, 2);

INSERT INTO belongTo(idUser, idTeam) VALUES (7, 3);
INSERT INTO belongTo(idUser, idTeam) VALUES (8, 3);

INSERT INTO belongTo(idUser, idTeam) VALUES (12, 4);
INSERT INTO belongTo(idUser, idTeam) VALUES (13, 4);

INSERT INTO belongTo(idUser, idTeam) VALUES (9, 5);
INSERT INTO belongTo(idUser, idTeam) VALUES (10, 5);
INSERT INTO belongTo(idUser, idTeam) VALUES (11, 5);

#------------------------------------------------------------
# INSERT : Task
#------------------------------------------------------------
INSERT INTO Task(taskName, detail) VALUES ("Fonctionnalité Login", "Mettre en place la page de connection");
INSERT INTO Task(taskName, detail) VALUES ("Fonctionnalité Inscription", "Mettre en place la page d'inscription");
INSERT INTO Task(taskName, detail) VALUES ("Fonctionnalité design main page", "Mettre en place la page princpale");
INSERT INTO Task(taskName, detail) VALUES ("Fonctionnalité implementer server", "Mettre en place le serveur rest");

#------------------------------------------------------------
# INSERT : toDo (Team - Task)
#------------------------------------------------------------
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (1, 1, 3, "In Progress");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (1, 2, 4, "To Do");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (1, 3, 5, "To Verify");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (1, 4, 7, "To Do");

INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (2, 1, 2, "In Progress");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (2, 2, 3, "To Do");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (2, 3, 4, "To Do");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (2, 4, 6, "In Progress");

INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (3, 1, 1, "In Progress");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (3, 2, 6, "Done");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (3, 3, 8, "To Do");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (3, 4, 10, "To Do");

INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (4, 1, 3, "In Progress");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (4, 2, 4, "To Do");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (4, 3, 5, "To Do");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (4, 4, 7, "To Do");

INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (5, 1, 3, "Done");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (5, 2, 4, "Done");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (5, 3, 5, "In Progress");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (5, 4, 7, "In Progress");

#------------------------------------------------------------
# INSERT : have (Users - Team - Task)
#------------------------------------------------------------
INSERT INTO have(idTeam, idTask, idUser) VALUES (1, 1, 2);
INSERT INTO have(idTeam, idTask, idUser) VALUES (1, 2, 3);
INSERT INTO have(idTeam, idTask, idUser) VALUES (1, 3, 4);

INSERT INTO have(idTeam, idTask, idUser) VALUES (2, 1, 5);
INSERT INTO have(idTeam, idTask, idUser) VALUES (2, 2, 6);

INSERT INTO have(idTeam, idTask, idUser) VALUES (3, 3, 7);
INSERT INTO have(idTeam, idTask, idUser) VALUES (3, 4, 8);

INSERT INTO have(idTeam, idTask, idUser) VALUES (4, 1, 9);
INSERT INTO have(idTeam, idTask, idUser) VALUES (4, 3, 10);
INSERT INTO have(idTeam, idTask, idUser) VALUES (4, 4, 11);

INSERT INTO have(idTeam, idTask, idUser) VALUES (5, 1, 12);
INSERT INTO have(idTeam, idTask, idUser) VALUES (5, 2, 13);

/*
#------------------------------------------------------------
# INSERT : Tool
#------------------------------------------------------------
INSERT INTO Tool(toolName) VALUES ("Kanban");
INSERT INTO Tool(toolName) VALUES ("Calendar");
INSERT INTO Tool(toolName) VALUES ("Actualité d'équipe");

#------------------------------------------------------------
# INSERT : gotTool (Users - Team)
#------------------------------------------------------------
INSERT INTO gotTool(idTeam, idUser, idTool, visible, position) VALUES (1, 1, 1, true, 1);
INSERT INTO gotTool(idTeam, idUser, idTool, visible, position) VALUES (1, 1, 2, true, 2);
INSERT INTO gotTool(idTeam, idUser, idTool, visible, position) VALUES (1, 2, 2, true, 1);

#------------------------------------------------------------
# INSERT : gotShortcut (Users - Team)
#------------------------------------------------------------
INSERT INTO gotShortcut(idTeam, idUser, shortcut) VALUES (1, 1, "U:\Partage\19- FIL ROUGE\Projet WEB Lionel Alban Doom\Gestion projet Suricat\UML");
INSERT INTO gotShortcut(idTeam, idUser, shortcut) VALUES (1, 1, "U:\Partage\01- Expose\Alban Lionel Cyril Benjamin");
*/

#------------------------------------------------------------
# INSERT : Actuality
#------------------------------------------------------------
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du CE 1", NOW(), "C'est une actualité de test CE 1", null, 3);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du CE 2", NOW(), "C'est une actualité de test CE 2", null, 7);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du CE 3", NOW(), "C'est une actualité de test CE 3", null, 3);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du CE 4", NOW(), "C'est une actualité de test CE 4", null, 10);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du CE 5", NOW(), "C'est une actualité de test CE 5", null, 10);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du CE 6", NOW(), "C'est une actualité de test CE 6", null, 10);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du CE 7", NOW(), "C'est une actualité de test CE 7", null, 11);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du CE 8", NOW(), "C'est une actualité de test CE 8", null, 12);

INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 9", NOW(), "C'est une actualité de test Team 1", null, 2);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 10", NOW(), "C'est une actualité de test Team 2", null, 2);

INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 11", NOW(), "C'est une actualité de test Team 1", null, 5);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 12", NOW(), "C'est une actualité de test Team 2", null, 5);

INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 13", NOW(), "C'est une actualité de test Team 1", null, 7);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 14", NOW(), "C'est une actualité de test Team 2", null, 7);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 15", NOW(), "C'est une actualité de test Team 3", null, 7);

INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 16", NOW(), "C'est une actualité de test Team 1", null, 11);

INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de la Team 17", NOW(), "C'est une actualité de test Team 1", null, 13);

INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de loisir 1", NOW(), "C'est une actualité de test Loisir 1", null, 1);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de loisir 2", NOW(), "C'est une actualité de test Loisir 2", null, 3);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de loisir 3", NOW(), "C'est une actualité de test Loisir 3", null, 7);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de loisir 4", NOW(), "C'est une actualité de test Loisir 4", null, 8);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de loisir 5", NOW(), "C'est une actualité de test Loisir 5", null, 8);
INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality de loisir 6", NOW(), "C'est une actualité de test Loisir 6", null, 12);

INSERT INTO Actuality(title, dateActuality, publication, photo, idUser) VALUES ("Actuality du VE 1", NOW(), "C'est une actualité de test CE 1", null, 11);

#------------------------------------------------------------
# INSERT : WorksCouncilActuality
#------------------------------------------------------------
INSERT INTO WorksCouncilActuality(idActuality) VALUES (1);
INSERT INTO WorksCouncilActuality(idActuality) VALUES (2);
INSERT INTO WorksCouncilActuality(idActuality) VALUES (3);
INSERT INTO WorksCouncilActuality(idActuality) VALUES (4);
INSERT INTO WorksCouncilActuality(idActuality) VALUES (5);
INSERT INTO WorksCouncilActuality(idActuality) VALUES (6);
INSERT INTO WorksCouncilActuality(idActuality) VALUES (7);
INSERT INTO WorksCouncilActuality(idActuality) VALUES (8);

#------------------------------------------------------------
# INSERT : TeamActuality
#------------------------------------------------------------
INSERT INTO TeamActuality(idActuality, idTeam) VALUES (9, 1);
INSERT INTO TeamActuality(idActuality, idTeam) VALUES (10, 1);

INSERT INTO TeamActuality(idActuality, idTeam) VALUES (11, 2);
INSERT INTO TeamActuality(idActuality, idTeam) VALUES (12, 2);

INSERT INTO TeamActuality(idActuality, idTeam) VALUES (13, 3);
INSERT INTO TeamActuality(idActuality, idTeam) VALUES (14, 3);
INSERT INTO TeamActuality(idActuality, idTeam) VALUES (15, 3);

INSERT INTO TeamActuality(idActuality, idTeam) VALUES (16, 4);

INSERT INTO TeamActuality(idActuality, idTeam) VALUES (17, 5);

#------------------------------------------------------------
# INSERT : LeisureActuality
#------------------------------------------------------------
INSERT INTO LeisureActuality(idActuality, category) VALUES (18, "Cuisine");
INSERT INTO LeisureActuality(idActuality, category) VALUES (19, "Sport");
INSERT INTO LeisureActuality(idActuality, category) VALUES (20, "Sport");
INSERT INTO LeisureActuality(idActuality, category) VALUES (21, "Covoiturage");
INSERT INTO LeisureActuality(idActuality, category) VALUES (22, "Covoiturage");
INSERT INTO LeisureActuality(idActuality, category) VALUES (23, "Sport");

#------------------------------------------------------------
# INSERT : CorporateLifeActuality
#------------------------------------------------------------
INSERT INTO CorporateLifeActuality(idActuality) VALUES (24);

/*
#------------------------------------------------------------
# INSERT : notify (TeamActuality - Users)
#------------------------------------------------------------
INSERT INTO notify(idActuality, idUser) VALUES (2, 2);

#------------------------------------------------------------
# INSERT : postComment (LeisureActuality - Users)
#------------------------------------------------------------
INSERT INTO postComment(idActuality, idUser, dateCommentary, commentary) VALUES (3, 2, NOW(), "Sympa ce post !");

#------------------------------------------------------------
# INSERT : Message
#------------------------------------------------------------
INSERT INTO Message(dateMessage, message, idUser, idUser_Users) VALUES (NOW(), "Tu es là ?", 1, 2);
INSERT INTO Message(dateMessage, message, idUser, idUser_Users) VALUES (DATE_ADD(NOW(), INTERVAL 1 SECOND), "Oui je bosse tu crois quoi ?!", 2, 1);
INSERT INTO Message(dateMessage, message, idUser, idUser_Users) VALUES (DATE_ADD(NOW(), INTERVAL 2 SECOND), "Je m'en doutais... Tu as basculé du côté obscur...", 1, 2);
*/