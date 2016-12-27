-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- SET time_zone = "+00:00";

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
        idUser       int (11) Auto_increment  NOT NULL ,
        email        Varchar (50) NOT NULL ,
        password     Varchar (20) NOT NULL ,
        firstname    Varchar (30) NOT NULL ,
        lastname     Varchar (30) NOT NULL ,
        status       Varchar (30) ,
        car          Bool ,
        carsharing   Bool ,
        active       Bool ,
        address      Varchar (100) ,
        city         Varchar (100) ,
        idDepartment Int NOT NULL ,
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
        type          Varchar (50) NOT NULL ,
        publication   Varchar (2000) NOT NULL ,
        photo         Blob ,
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
        taskName Varchar (30) NOT NULL ,
        detail   Varchar (250) ,
        PRIMARY KEY (idTask ) ,
        UNIQUE (taskName )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Tool
#------------------------------------------------------------

CREATE TABLE Tool(
        idTool   int (11) Auto_increment  NOT NULL ,
        toolName Varchar (30) NOT NULL ,
        PRIMARY KEY (idTool ) ,
        UNIQUE (toolName )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: notify (Users - Actuality)
#------------------------------------------------------------

CREATE TABLE notify(
        idUser      Int NOT NULL ,
        idActuality Int NOT NULL ,
        PRIMARY KEY (idUser ,idActuality )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: postTeamActuality (Users - Team - Actuality)
#------------------------------------------------------------

CREATE TABLE postTeamActuality(
        idUser      Int NOT NULL ,
        idTeam      Int NOT NULL ,
        idActuality Int NOT NULL ,
        PRIMARY KEY (idUser ,idTeam ,idActuality )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: postComment (Users - Actuality)
#------------------------------------------------------------

CREATE TABLE postComment(
        commentary     Varchar (250) NOT NULL ,
        dateCommentary Datetime NOT NULL ,
        idUser         Int NOT NULL ,
        idActuality    Int NOT NULL ,
        PRIMARY KEY (idUser ,idActuality, dateCommentary)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: have (Users - Team - Task)
#------------------------------------------------------------

CREATE TABLE have(
        idTeam Int NOT NULL ,
        idTask Int NOT NULL ,
        idUser Int NOT NULL ,
        PRIMARY KEY (idTeam ,idTask ,idUser )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: talk (Users - Users)
#------------------------------------------------------------

CREATE TABLE talk(
        message      Varchar (250) NOT NULL ,
        dateMessage  Datetime NOT NULL ,
        idUser       Int NOT NULL ,
        idUser_Users Int NOT NULL ,
        PRIMARY KEY (idUser ,idUser_Users, dateMessage)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: gotShortcut (Users - Team)
#------------------------------------------------------------

CREATE TABLE gotShortcut(
        shortcut Varchar (200) NOT NULL ,
        idUser   Int NOT NULL ,
        idTeam   Int NOT NULL ,
        PRIMARY KEY (idUser ,idTeam, shortcut)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: gotTool (Users - Team)
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
# Table: toDo (Team - Task)
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
# Table: belongTo (Users - Team)
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
ALTER TABLE Rdv ADD CONSTRAINT FK_Rdv_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE notify ADD CONSTRAINT FK_notify_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE notify ADD CONSTRAINT FK_notify_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE postTeamActuality ADD CONSTRAINT FK_postTeamActuality_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE postTeamActuality ADD CONSTRAINT FK_postTeamActuality_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE postTeamActuality ADD CONSTRAINT FK_postTeamActuality_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE postComment ADD CONSTRAINT FK_postComment_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE postComment ADD CONSTRAINT FK_postComment_idActuality FOREIGN KEY (idActuality) REFERENCES Actuality(idActuality);
ALTER TABLE have ADD CONSTRAINT FK_have_idTeam FOREIGN KEY (idTeam) REFERENCES Team(idTeam);
ALTER TABLE have ADD CONSTRAINT FK_have_idTask FOREIGN KEY (idTask) REFERENCES Task(idTask);
ALTER TABLE have ADD CONSTRAINT FK_have_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE talk ADD CONSTRAINT FK_talk_idUser FOREIGN KEY (idUser) REFERENCES Users(idUser);
ALTER TABLE talk ADD CONSTRAINT FK_talk_idUser_Users FOREIGN KEY (idUser_Users) REFERENCES Users(idUser);
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

#------------------------------------------------------------
# INSERT : USERS
#------------------------------------------------------------
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment) VALUES ("emile.louis@hotmail.fr", "petitefillefragile", "Emile", "Louis", "Développeur", true, true, true, "3 impasse de la petite allée", "Bruxelles", 1);
INSERT INTO Users(email, password, firstname, lastname, status, car, carsharing, active, address, city, idDepartment) VALUES ("joe.pastrami@hotmail.fr", "etalonitalia", "Joe", "Pastrami", "Chef de projet", true, true, true, "rue de la boxe", "Los Angeles", 1);

#------------------------------------------------------------
# INSERT : TEAM
#------------------------------------------------------------
INSERT INTO Team(teamName, projectName, projectDescription) VALUES ("Big Balls Team", "Suricat", "Site web communautaire en entreprise");

#------------------------------------------------------------
# INSERT : belongTo (Users - Team)
#------------------------------------------------------------
INSERT INTO belongTo(idUser, idTeam) VALUES (1, 1);
INSERT INTO belongTo(idUser, idTeam) VALUES (2, 1);

#------------------------------------------------------------
# INSERT : Task
#------------------------------------------------------------
INSERT INTO Task(taskName, detail) VALUES ("Fonctionnalité Login", "Mettre en place la page de connection");
INSERT INTO Task(taskName, detail) VALUES ("Fonctionnalité Inscription", "Mettre en place la page d'inscription");

#------------------------------------------------------------
# INSERT : toDo (Team - Task)
#------------------------------------------------------------
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (1, 1, 3, "In Progress");
INSERT INTO toDo(idTeam, idTask, duration, status) VALUES (1, 2, 5, "To Do");

#------------------------------------------------------------
# INSERT : have (Users - Team - Task)
#------------------------------------------------------------
INSERT INTO have(idTeam, idUser, idTask) VALUES (1, 1, 1);
INSERT INTO have(idTeam, idUser, idTask) VALUES (1, 2, 2);

#------------------------------------------------------------
# INSERT : Tool
#------------------------------------------------------------
INSERT INTO Tool(toolName) VALUES ("Kanban");
INSERT INTO Tool(toolName) VALUES ("Calendar");

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

#------------------------------------------------------------
# INSERT : Actuality
#------------------------------------------------------------
INSERT INTO Actuality(title, dateActuality, type, publication, photo, idUser) VALUES ("Actuality de la muerte", NOW(), "Vie d'entreprise", "C'est une actualité de test VE", null, 1);
INSERT INTO Actuality(title, dateActuality, type, publication, photo, idUser) VALUES ("Actuality de la Team", NOW(), "Equipe", "C'est une actualité de test Team", null, 2);
INSERT INTO Actuality(title, dateActuality, type, publication, photo, idUser) VALUES ("Actuality de loisir", NOW(), "Loisir", "C'est une actualité de test Loisir", null, 1);

#------------------------------------------------------------
# INSERT : TeamActuality
#------------------------------------------------------------
INSERT INTO TeamActuality(idActuality) VALUES (2);

#------------------------------------------------------------
# INSERT : LeisureActuality
#------------------------------------------------------------
INSERT INTO LeisureActuality(idActuality, category) VALUES (3, "Cuisine");

#------------------------------------------------------------
# INSERT : postTeamActuality (TeamActuality - Users - Team)
#------------------------------------------------------------
INSERT INTO postTeamActuality(idActuality, idUser, idTeam) VALUES (2, 1, 1);

#------------------------------------------------------------
# INSERT : notify (TeamActuality - Users)
#------------------------------------------------------------
INSERT INTO notify(idActuality, idUser) VALUES (2, 2);

#------------------------------------------------------------
# INSERT : postComment (LeisureActuality - Users)
#------------------------------------------------------------
INSERT INTO postComment(idActuality, idUser, dateCommentary, commentary) VALUES (3, 2, NOW(), "Sympa ce post !");

#------------------------------------------------------------
# INSERT : talk (Users - Users)
#------------------------------------------------------------
INSERT INTO talk(idUser, idUser_Users, dateMessage, message) VALUES (1, 2, NOW(), "Tu es là ?");
INSERT INTO talk(idUser, idUser_Users, dateMessage, message) VALUES (2, 1, DATE_ADD(NOW(), INTERVAL 1 SECOND), "Oui je bosse tu crois quoi ?!");
INSERT INTO talk(idUser, idUser_Users, dateMessage, message) VALUES (1, 2, DATE_ADD(NOW(), INTERVAL 2 SECOND), "Je m'en doutais... Tu as basculé du côté obscur...'");