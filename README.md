# hackathon-2022

## Pipedream Workflow
1. Trigger - durch EMail
2. Senden an Telegram Gruppen
3. Checken, ob `+twitter` in Email enthalten; wenn nicht, stop
4. Nachricht in Chunks aufteilen, wegen Twitter Character limit
5. Senden der Tweets als Thread

## Notes for Whatsapp
- Zwei Möglichkeiten:
	- Direct Messaging: Nachrichten werden direkt an die Telefonnummern der Eltern verteilt
	- Whatsapp-Gruppen: Nachrichten werden in Gruppen verteilt (nur über Hack möglich)

### Notes for Whatsapp for direct Messaging
- Das Unternehmen (Kita) muss von den Benutzern (Eltern) die Zustimmung einholen, dass das Unternehmen Nachrichten über Whatsapp an sie senden darf [Quelle](https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in)
- Das Unternehmen muss eine Nachrichten-Vorlage an Whatsapp zur Review schicken, bevor es eine Unterhaltung iniziieren kann [Quelle](https://developers.facebook.com/docs/whatsapp/api/messages/message-templates)


#### Whatsapp setup
- Whatsapp einen Business-Account erstellen
- Telefonnummer muss zu diesem Account hinzugefügt werden
	- bekommt `PHONE_NUMBER_ID`
	- dafür ist Verifizierung der Applikation von Whatsapp notwendig ([benötigte Berechtigung](https://developers.facebook.com/docs/permissions/reference/whatsapp_business_management/))
- Template muss zu diesem Account hinzugefügt & von WhasApp verifiziert werden

#### Whatsapp Register Contact
- Handynummer zu Contacts in Whatsapp-API hinzufügen https://developers.facebook.com/docs/whatsapp/on-premises/reference/contacts#creating
- `wa_id` auf server in BD speichern
- eigene Datenspeicherung ist notwendig für die Identifizierung der Gruppen

#### Whatsapp Send
- passende `wa_id`'s anhand der Gruppe aus Datenbank suchen
- an diese ID's nachrichten versenden
	- dafür muss das Template genutzt werden
	- `PHONE_NUMBER_ID` wird benötigt

