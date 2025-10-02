Halvklar reflektion

### Tabellreflektion för namngivning

| Namn                      |                  Förklaring                  |                                                                                                                                Reflektion och regler från Clean Code                                                                                                                                 |
| :------------------------ | :------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| setChartTitle(chartTitle) |   Metod för att sätta titel på ett diagram   |                            **Method names:** Namnet börjar med set vilket följer reglerna för mutators **Don't add gratuitous context:** Metoden ligger i klassen chart vilket gör Chart i namnet redundant. Det hade räcket med setTitle då man får kontext av klassen.                             |
| addLines(name, data)      | Lägger till en ny linje med data i LineChart | **Avoid disinformation:** Metoden heter addLines men returnerar bara en line vilket är förvirrande. **Use Intention-Revealing Names:** Add i metod namnet visar tydligt vad metoden ska göra, problemet är att lines är i plural och därför tror man att man kan lägga till flera lines med metoden. |

### Kapitelreflektion kap 2

Efter att jag läst kapitel 2 så inser jag att jag slarvar en del när jag namnger metoder, t.ex att jag döper metoden till addLines istället för addLine när den bara lägger till en line och inte flera. Däremot tycker jag att jag är ganska bra på att följa "Method Names", jag döper mina mutators till setX och getY. En annan sak jag gör bra är att jag följer "Don't Be Cute" regeln, brukar inte döpa mina metoder till "roliga" namn.

### Tabellreflektion för funktioner/metoder

|          Metodnamn          |  Class   | Antal rader |                                                                                                                         Reflektion                                                                                                                          |
| :-------------------------: | :------: | :---------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      addData(newData)       | Chart.js |     12      | **Function Arguments:** Metoden har bara ett argument. **Do One Thing:** Gör i huvudsak bara en sak, lägger till ny data. Metoden anropar validatorer men har även en dublettkontroll som kanske skulle brytas ut som jag gjort med de andra validatorerna. |
| updateData(label, newValue) | Chart.js |      9      |                                  **Function Arguments:** Metoden har två argument vilket är okej. **Do One Thing:** Samma sak här som på addData, hade kunnat bryta ut dublettkontroll så att funktionen bara gör en sak.                                   |

### Kapitelrefklektion kap 3

Vissa av mina funktioner är nästan identiska och strider mot DRY, borde försökt implementera en hjälp metod som tar fram extrem värden. Några av mina metoder bryter även mot "Do One Thing" regeln. Som en relativt ny programmerare tycker jag att det är svårt att ha alla funktioner super korta som Robert Martin föreslår i boken och håller därmed inte med honom om det.

### Reflektion över egen kodkvalitet

Nu när jag analyserat min egen kodkvalitet märker jag en del styrkor och en del brister. Som jag nämnt tidigare märker jag att jag slarvar ibland när jag döper mina metoder t.ex getLines istället för getLine vilket kan förvirra andra programmerare. En styrka med mina metodnamn är att de flesta följer "Intention-Revealing" regeln från boken, de är relativt tydliga och lättförståda. Jag kan bli bättre på att följa "Do One Thing" regeln, några av mina metoder gör flera saker.
