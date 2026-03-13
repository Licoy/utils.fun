import type { CategoryContentMap, ToolContentMap } from "@/lib/tools/content-types";

export const deCategoryContent: CategoryContentMap = {
  "generate": {
    "title": "Erzeugen",
    "description": "Schnelle Erstellungstools zum Generieren von Assets, die Sie sofort verwenden können."
  },
  "image": {
    "title": "Bild",
    "description": "Bild-Workflows, die nach Möglichkeit lokal im Browser bleiben."
  },
  "encrypt": {
    "title": "Verschlüsseln",
    "description": "Hashing-, Codierungs- und gängige symmetrische Verschlüsselungshelfer."
  },
  "time": {
    "title": "Zeit",
    "description": "Zeitstempelkonvertierung, Datumsarithmetik und Weltzeittools."
  },
  "convert": {
    "title": "Konvertieren",
    "description": "Lokale Konvertierungstools für gängige Einheiten, Temperatur, Datengrößen und Dauer."
  },
  "finance": {
    "title": "Finanzen",
    "description": "Praktische Helfer für Betragsformulierungen, Summenlisten und Kreditschätzungen."
  },
  "text": {
    "title": "Text",
    "description": "Eine praktische Text-Workbench zum Bearbeiten, Konvertieren und Validieren."
  },
  "dev": {
    "title": "Entwickler",
    "description": "Formatierungs-, Konvertierungs- und Debugging-Helfer für Entwickler."
  }
};

export const deToolContent: ToolContentMap = {
  "rand-password": {
    "title": "Zufälliges Passwort",
    "description": "Generieren Sie sichere Zufallskennwörter nach Länge und Zeichensatz mit lokalem Verlauf.",
    "highlights": [
      "Benutzerdefinierte Länge",
      "Groß-/Kleinschreibung, Ziffern, Symbole",
      "Lokale Geschichte"
    ]
  },
  "qrcode": {
    "title": "QR-Code",
    "description": "Wandeln Sie Text oder URLs in QR-Codes mit anpassbarer Größe und Farbe um.",
    "highlights": [
      "Größe anpassen",
      "Passen Sie die Farben an",
      "Bild herunterladen"
    ]
  },
  "screen-record": {
    "title": "Bildschirmaufzeichnung",
    "description": "Zeichnen Sie Ihren Bildschirm mit Browser-APIs auf und exportieren Sie das Ergebnis lokal.",
    "highlights": [
      "Native Browser-Erfassung",
      "Sofortige Vorschau",
      "Lokaler Export"
    ]
  },
  "random-number": {
    "title": "Bereichsnummernlabor",
    "description": "Generieren Sie Zufallswerte stapelweise nach Bereich, Präzision und Eindeutigkeit für Stichproben- oder Testdaten.",
    "highlights": [
      "Reichweite und Präzision",
      "Einzigartiger Umschalter",
      "Mehrzeilige Ausgabe"
    ]
  },
  "guid": {
    "title": "UUID-Batch-Forge",
    "description": "Erstellen Sie im Browser mehrere UUIDs für API-Tests, Fixtures und Platzhalterdatensätze.",
    "highlights": [
      "Batch-Ausgabe",
      "Fall umschalten",
      "Textexport"
    ]
  },
  "random-group": {
    "title": "Zufällige Gruppierung",
    "description": "Mischen Sie einen Kader nach Gruppenanzahl oder -größe in zufällige Gruppen oder wählen Sie einen einzelnen Gewinner aus.",
    "highlights": [
      "Nach Gruppenanzahl oder -größe",
      "Einzelpick-Modus",
      "Flexible Trenner"
    ]
  },
  "watermark": {
    "title": "Offline-Wasserzeichen",
    "description": "Wenden Sie Wasserzeichen mit wiederholtem Text auf lokale Bilder an, ohne diese hochzuladen.",
    "highlights": [
      "Deckkraft und Winkel",
      "Lokales Rendering",
      "Ergebnis exportieren"
    ]
  },
  "image-compress": {
    "title": "Bildkomprimierung",
    "description": "Komprimieren Sie Bilder im Browser und vergleichen Sie das Vorher-Nachher-Ergebnis.",
    "highlights": [
      "Qualitätskontrolle",
      "Vorher/Nachher vergleichen",
      "Datei herunterladen"
    ]
  },
  "qrcode-decode": {
    "title": "QR-Inhaltsleser",
    "description": "Extrahieren Sie kopierbaren Text aus einem lokalen QR-Bild, um Links, Notizen oder WLAN-Nutzdaten zu überprüfen.",
    "highlights": [
      "Offline-Dekodierung",
      "Bildvorschau",
      "Ergebnis kopieren"
    ]
  },
  "barcode": {
    "title": "Barcode-Leinwand",
    "description": "Entwerfen Sie Barcodes mit mehreren Standards und exportieren Sie sofort gestochen scharfe SVG-Grafiken.",
    "highlights": [
      "Standards wechseln",
      "Farbe und Größe",
      "SVG-Download"
    ]
  },
  "md5": {
    "title": "Schreiben Sie MD5",
    "description": "Berechnen Sie Text-MD5-Hashes und zeigen Sie Varianten in Klein-/Großschreibung an.",
    "highlights": [
      "32-Zeichen-Ausgabe",
      "Groß-/Kleinschreibung",
      "Schnell kopieren"
    ]
  },
  "file-md5": {
    "title": "Datei MD5",
    "description": "Hashen Sie lokale Dateien in Blöcken für eine zuverlässige MD5-Überprüfung.",
    "highlights": [
      "Lokale Dateien",
      "Gestückeltes Hashing",
      "Geeignet für große Dateien"
    ]
  },
  "hmac": {
    "title": "HMAC-Hash",
    "description": "Berechnen Sie verschlüsselte HMAC-Hashes für MD5- und SHA-Varianten.",
    "highlights": [
      "Mehrere Algorithmen",
      "Geschlüsselter Hash",
      "Hex-Ausgabe"
    ]
  },
  "sha": {
    "title": "SHA-Hash",
    "description": "Berechnen Sie SHA1, SHA256, SHA512 und zugehörige Hashwerte.",
    "highlights": [
      "SHA-Varianten",
      "Schnelles Hashing",
      "Hex-Ausgabe"
    ]
  },
  "aes": {
    "title": "AES-Verschlüsselung",
    "description": "Verschlüsseln und entschlüsseln Sie mit AES unter Verwendung allgemeiner Modi und Auffülloptionen.",
    "highlights": [
      "EZB/CBC",
      "Hex oder Base64",
      "Brauch IV"
    ]
  },
  "rabbit": {
    "title": "Kaninchen-Chiffre",
    "description": "Verschlüsseln und entschlüsseln Sie Text mit der Rabbit-Stream-Verschlüsselung.",
    "highlights": [
      "Leicht",
      "Browserseitig",
      "Ergebnis kopieren"
    ]
  },
  "des": {
    "title": "DES / 3DES",
    "description": "Behandeln Sie DES- und TripleDES-Textverschlüsselung und -entschlüsselung.",
    "highlights": [
      "DES und 3DES",
      "Textverschlüsselung",
      "Base64-Ausgabe"
    ]
  },
  "rc4": {
    "title": "RC4-Chiffre",
    "description": "Führen Sie die RC4-Verschlüsselung oder -Entschlüsselung für den Eingabetext aus.",
    "highlights": [
      "Klassische Chiffre",
      "Schnelle Aktionen",
      "Nur lokal"
    ]
  },
  "base64": {
    "title": "Base64",
    "description": "Konvertieren Sie schnell zwischen Klartext und Base64.",
    "highlights": [
      "Unicode-sicher",
      "Kodieren/dekodieren",
      "Ergebnis kopieren"
    ]
  },
  "unicode": {
    "title": "Unicode-Konvertierung",
    "description": "Konvertieren Sie Text in Unicode-Escape-Sequenzen und zurück.",
    "highlights": [
      "Escape-Ausgabe",
      "Lesbaren Text wiederherstellen",
      "Lokale Verarbeitung"
    ]
  },
  "url": {
    "title": "URL-Kodierung",
    "description": "Verschlüsseln und dekodieren Sie URL-Werte sicher für den Transport.",
    "highlights": [
      "Sicher für Parameter",
      "Kodieren/dekodieren",
      "Sofortiges Ergebnis"
    ]
  },
  "timestamp": {
    "title": "Zeitstempel",
    "description": "Zeigt den aktuellen Zeitstempel an und konvertiert zwischen Zeitzeichenfolgen und Zeitstempeln.",
    "highlights": [
      "Sekunden/ms",
      "Live-Uhr",
      "Bidirektionale Konvertierung"
    ]
  },
  "calculation": {
    "title": "Datumsberechnung",
    "description": "Addieren oder subtrahieren Sie Zeit von einem Datum und messen Sie Datumsintervalle.",
    "highlights": [
      "Tage/Monate/Jahre hinzufügen",
      "Tagesintervall",
      "Klare Formen"
    ]
  },
  "world": {
    "title": "Weltzeit",
    "description": "Sehen Sie sich einen bestimmten Moment in einer Reihe wichtiger Weltzeitzonen an.",
    "highlights": [
      "Mehrere Städte",
      "Beistelltisch",
      "Wählen Sie die Basiszone"
    ]
  },
  "working-day": {
    "title": "Werktagsversatz",
    "description": "Verschieben Sie Zeitpläne nach Werktagen mit optionaler Überschreibung von Feiertagen und Ersatzarbeitstagen.",
    "highlights": [
      "Überspringen Sie Wochenenden",
      "Benutzerdefinierte Feiertagsliste",
      "Reichweitenzählung"
    ]
  },
  "batch-timestamp": {
    "title": "Mehrzeiliger Zeitkonverter",
    "description": "Normalisieren Sie zeitstempelintensive Protokolle Zeile für Zeile in lesbare Datumsangaben oder Unix-Rohwerte.",
    "highlights": [
      "Automatische Richtung",
      "Sekunden und ms",
      "Batch-Export"
    ]
  },
  "unit-converter": {
    "title": "Einheitsschalttafel",
    "description": "Bewahren Sie allgemeine technische und tägliche Einheiten an einem Ort auf, um eine schnelle Parallelkonvertierung zu ermöglichen.",
    "highlights": [
      "Gruppenschaltung",
      "Direkte Zieleinheit",
      "Tisch für die ganze Gruppe"
    ]
  },
  "english-amount": {
    "title": "Englischer Betragsentwurf",
    "description": "Entwurf einer rechnungsfertigen englischen Betragsformulierung aus einem numerischen Geldwert.",
    "highlights": [
      "Satzfall",
      "Großschreibung",
      "Rechnung fertig"
    ]
  },
  "sum-list": {
    "title": "Zusammenfassung des Nummernblatts",
    "description": "Wandeln Sie lose numerische Listen für eine schnelle Budgetierung in Summen-, Durchschnitts- und Min/Max-Zusammenfassungen um.",
    "highlights": [
      "Gemischte Separatoren",
      "Durchschnitt und Extreme",
      "Ungültige Token-Hinweise"
    ]
  },
  "loan": {
    "title": "Kreditzahlungsplaner",
    "description": "Schätzen Sie die monatliche Belastung und die Gesamtzinsen anhand von Darlehenskapital, Zinssatz und Laufzeit.",
    "highlights": [
      "Monatliche Schätzung",
      "Gesamtzins",
      "Erste 12 Monate"
    ]
  },
  "rmb": {
    "title": "RMB-Großbuchstaben",
    "description": "Wandeln Sie Zahlen in chinesische RMB-Großbuchstaben um.",
    "highlights": [
      "Finanzielle Formulierung",
      "Ganze Zahlen und Dezimalzahlen",
      "Sofortiges Ergebnis"
    ]
  },
  "text-dedupe": {
    "title": "Listenbereinigung",
    "description": "Bereinigen Sie wiederholte Einträge, Unterschiede in der Groß- und Kleinschreibung und verrauschte Abstände in einer aufgeräumteren Liste.",
    "highlights": [
      "Linie, Komma oder Leerzeichen",
      "Groß-/Kleinschreibung ignorieren",
      "Zusammenfassung aufbewahrt"
    ]
  },
  "emoji-clean": {
    "title": "Emoji-Reiniger",
    "description": "Entfernen Sie Emojis und piktografische Symbole aus dem Text, um eine sauberere, formale Klartextausgabe zu erzielen.",
    "highlights": [
      "Klartextausgabe",
      "Zählung entfernt",
      "Formfreundlich"
    ]
  },
  "id-card-cn": {
    "title": "CN-ID-Prüfung",
    "description": "Validieren Sie 18-stellige ID-Nummern auf dem chinesischen Festland und extrahieren Sie Angaben zu Geburtstag, Alter und Geschlecht.",
    "highlights": [
      "18-stellige Validierung",
      "Geburtstag und Alter",
      "Regionspräfix"
    ]
  },
  "simplified-traditional": {
    "title": "Wechsel der chinesischen Schrift",
    "description": "Wechseln Sie schnell zwischen vereinfachtem und traditionellem Chinesisch für die Kopierbereinigung und regionale Varianten.",
    "highlights": [
      "Zwei-Wege-Schalter",
      "Offline-Wörterbuch",
      "Langtextfreundlich"
    ]
  },
  "pinyin": {
    "title": "Pinyin-Transkriptor",
    "description": "Transkribieren Sie chinesischen Text in Pinyin und Initialen zur Indexierung, Suche oder Organisation von Notizen.",
    "highlights": [
      "Markiert, einfach oder numerisch",
      "Ausgabe der Initialen",
      "Nur lokal"
    ]
  },
  "pluralize": {
    "title": "Pluralisieren",
    "description": "Wechseln Sie schnell zwischen englischen Substantiven im Singular und Plural.",
    "highlights": [
      "Singular/Plural",
      "Gängige Wortformen",
      "Einfache Eingabe"
    ]
  },
  "english-case": {
    "title": "Englischer Fall",
    "description": "Wandeln Sie Text in Groß- und Kleinschreibung, Groß- und Kleinschreibung sowie Groß- und Kleinschreibung um.",
    "highlights": [
      "Mehrere Gehäusearten",
      "Sauberes Exemplar",
      "Schnell kopieren"
    ]
  },
  "cn-en": {
    "title": "CN/EN-Abstand",
    "description": "Verbessern Sie automatisch den Abstand zwischen Chinesisch, Englisch und Zahlen.",
    "highlights": [
      "Besserer gemischter Abstand",
      "Verbesserte Lesbarkeit",
      "Ein-Klick-Reparatur"
    ]
  },
  "trim": {
    "title": "Text zuschneiden",
    "description": "Entfernen Sie Leerzeichen aus dem gesamten Text oder Zeile für Zeile.",
    "highlights": [
      "Vollständiger Besatz",
      "Linienbesatz",
      "Chargenfreundlich"
    ]
  },
  "regex": {
    "title": "Regex-Test",
    "description": "Testen Sie, ob eine Zeichenfolge mit einem regulären Ausdrucksmuster übereinstimmt.",
    "highlights": [
      "Unterstützte Flaggen",
      "Schnelle Validierung",
      "Vorlagenbeispiele"
    ]
  },
  "md-html": {
    "title": "Markdown auf HTML",
    "description": "Rendern Sie Markdown in HTML und wechseln Sie zwischen Code und Vorschau.",
    "highlights": [
      "Zwei-Scheiben-Fluss",
      "HTML-Ausgabe",
      "Live-Vorschau"
    ]
  },
  "json": {
    "title": "JSON-Format",
    "description": "Formatieren, minimieren und validieren Sie JSON-Inhalte.",
    "highlights": [
      "Hübscher Druck",
      "Minimieren",
      "Validierung"
    ]
  },
  "json-to-types": {
    "title": "JSON-Typskizze",
    "description": "Skizzieren Sie TypeScript-Schnittstellen aus Beispiel-JSON, bevor Sie sie manuell verfeinern.",
    "highlights": [
      "Stammtyp umbenennen",
      "Nestet weiter",
      "Monaco Doppelverglasung"
    ]
  },
  "css": {
    "title": "CSS-Format",
    "description": "Formatieren Sie CSS und wenden Sie eine leichte Komprimierung an.",
    "highlights": [
      "Schöneres Format",
      "Minimierte Ausgabe",
      "Code-Editor"
    ]
  },
  "js": {
    "title": "JavaScript-Format",
    "description": "Formatieren oder komprimieren Sie JavaScript-Snippets für eine schnelle Bereinigung.",
    "highlights": [
      "Schöneres Format",
      "Ausgabe minimieren",
      "Ergebnis kopieren"
    ]
  },
  "html": {
    "title": "HTML-Format",
    "description": "Verschönern Sie HTML oder komprimieren Sie es in eine straffere Darstellung.",
    "highlights": [
      "Sauberere Struktur",
      "Minimierte Ausgabe",
      "Snippet-freundlich"
    ]
  },
  "sql": {
    "title": "SQL-Format",
    "description": "Formatieren Sie SQL-Anweisungen zur besseren Lesbarkeit oder komprimieren Sie sie für den Transport.",
    "highlights": [
      "Schlüsselwörter in Großbuchstaben",
      "Komprimieren Sie Räume",
      "Abfragefreundlich"
    ]
  },
  "crontab": {
    "title": "Cron-Zeitplan",
    "description": "Vorschau der nächsten Ausführungszeiten eines Cron-Ausdrucks.",
    "highlights": [
      "Die nächsten 10 Läufe",
      "Ausdrucksvalidierung",
      "Zeitliste"
    ]
  },
  "naming-converter": {
    "title": "Getriebe benennen",
    "description": "Teilen Sie natürliche Sprache oder vorhandene Bezeichner auf und verschieben Sie sie in gängige Code-Benennungsstile.",
    "highlights": [
      "Automatische Wortaufteilung",
      "6 Namensstile",
      "Sofortige Ausgabe"
    ]
  },
  "color-converter": {
    "title": "Farbformatbrücke",
    "description": "Überbrücken Sie HEX-, RGB- und HSL-Formate mit einem Live-Farbfeld für eine schnelle visuelle Bestätigung.",
    "highlights": [
      "Drei Formate",
      "Farbauswahl",
      "Live-Vorschau"
    ]
  },
  "websocket": {
    "title": "WebSocket-Test",
    "description": "Stellen Sie eine Verbindung zu einem WebSocket-Endpunkt her, senden Sie Nachrichten und überprüfen Sie Protokolle.",
    "highlights": [
      "Verbinden/schließen",
      "Nachrichtenprotokoll",
      "Heartbeat-Einstellungen"
    ]
  },
  "go-struct-json": {
    "title": "Gehen Sie zu Struct / JSON",
    "description": "Konvertieren Sie zwischen Go-Strukturen und JSON-Skeletten.",
    "highlights": [
      "Zwei-Wege-Konvertierung",
      "Nestet weiter",
      "Entwickler-Dienstprogramm"
    ]
  },
  "less2css": {
    "title": "Weniger zu CSS",
    "description": "Kompilieren Sie weniger Snippets und geben Sie das generierte CSS aus.",
    "highlights": [
      "Kompilierung im Browser",
      "Zwei Spalten",
      "Ausgabe kopieren"
    ]
  },
  "binary": {
    "title": "Basiskonvertierung",
    "description": "Konvertieren Sie Zahlen in Binär-, Oktal-, Dezimal-, Hexadezimalzahlen und mehr.",
    "highlights": [
      "2/8/10/16/32/36 Basen",
      "Sofortiger Tisch",
      "Nützlich in der Entwicklung"
    ]
  }
};
