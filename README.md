Projekt Task Scheduler (tskschd) byl od začátku zamýšlen pro vlastní potřebu, nikoli pro prezentaci třetím stranám (v době zahájení projektu jsem se neucházel o práci programátora, ani jsem o tom nepřemýšlel).

Cíl projektu:
	- Navrhnout a implementovat nástroj pro záznam
		○ Kontaktů
		○ Poznámek
		○ Úkolů
		○ Běžeckých tréninků
	- Bavit se tvůrčí prací (programováním)

Architektura projektu
	- Frontend - Angular
	- Aplikační server - Nestjs + TypeORM
	- DB Server - MySql

Co v projektu není
	- Práce s verzovacím software (git)
	- Automatizované testy
	- CRUD operace nad dalšími entitami (transaction, source, project, news, event)
	- Relace & hierarchické relace mezi entitami - v další verzi projektu mělo být možné např. přiřadit úkol určitému kontaktu (řešitel, gestor) nebo pro konkrétní kontakt definovat jeho manažera
	- Update, Delete a List funkce pro uživatele
	- V kódu aplikace jsou ale některé prázdné šablony pro pozdější snazší implementaci těchto funkčností

Co v projektu je
	- Logování na úrovni aplikačního serveru
    - Logování na úrovni Console.log v prohlížeči
	- JWT autentizace (signup & signin)
	- Vlastní styling HTML stránek - zkoušel jsem pracovat s frameworky Bootstrap nebo Angular Material, ale vždy jsem narazil na bod, kdy jsem nebyl schopen definovat vzhled html stránky podle mých představ (např. dynamická animace karet an úvodní obrazovce)

Aplikační server
	- Netsjs
	- Asynchronní programování pomocí knihovny (async metody, rxjs knihovna)
	- Controller - Service - Repository architektura
	- Exception handling na úrovni repository

Front end
	- Angular & scss
	- Lazy modules loading
	- Material module použit pouze pro stránkování a třídění tabulek

MySql
	- Db vytvořena příkazem:

	create database if not exists tskschd
		character set utf8mb4
		collate utf8mb4_czech_ci;
		
	- Connection parameters:
	
	DB_HOST=localhost
	DB_PORT=3306
	DB_USERNAME=root
	DB_PASSWORD=Airacobra
	DB_DATABASE=tskschd
	JWT_SECRET=B[T@_6_-M2ux\^u),<7D9hsu99x.2-}bX_2bUXgnW?#5YT*cn$d{HjvBW^#Jfs]j
	

	
	
	
	
