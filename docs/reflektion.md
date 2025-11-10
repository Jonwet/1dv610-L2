### Tabell kapitel 2

| Namn                            |                            Förklaring                             |                                                                                                                                                                                                       Reflektion och regler från Clean Code                                                                                                                                                                                                        |
| :------------------------------ | :---------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| executeAttack(targetId, action) | Metod som utför en attack från nuvarande combatant mot ett target | **Method Names:** Följer regeln som säger att metoder ska börja med eller vara verb. **Pick One Word per Concept:** I detta metod namn använder jag mig utav execute vilket jag återanvänder i min metod executeDefend. Vilket följer regeln att man ska vara konsekvent i sin namngivning. **Use Problem Domain Names:** “Attack” är ett ord som jag tror att de flesta kan koppla till att något slår något annat då det ofta förekommer i spel. |
| getState()                      |         Metod som returnerar en snapshot av combat state          |                                                                                                               **Method Names:** Följer också regeln om att metoder ska börja med verb. **Add Meaningful Context:** State är väldigt vagt, behöver mer kontext t.ex getCombatState eller liknande, namnet tvingar läsaren att gissa.                                                                                                                |
| nextUnitTurn()                  |          Metod som går vidare till nästa combatants tur           |                                                                     **Make Meaningful Distinctions:** Använder mig av Unit i denna metod men använder mig av Combatant i andra metoder. Borde döpa om till nextCombatantTurn. **Method Names:** Hade kunnat lägga till ett verb i metodens namn t.ex advance men metod namnet blir ganska långt då men också mer beskrivande.                                                                      |
| checkBattleEnd()                |             Metod som kontrollerar om battle är slut              |                                                                                                       **Make Meaningful Distintions:** Använder mig utav Battle här men Combat på andra ställen i klassen, borde döpa om till checkCombatEnd(). **Use Pronounceable Names:** Metod namnet är lätt att uttala och därmed lätt att diskutera.                                                                                                        |
| #combatLogger(message)          |          Metod som loggar meddelande till combat loggen           |                                                                                                                                                            **Don't Add Gratuitous Context:** Metoden befinner sig i CombatSystem klassen och combat i namnet är därmed onödig kontext.                                                                                                                                                             |

## Reflektion Kap 2

Jag märker att jag är inkonsekvent i mitt namngivande av metoder jag använder mig av unit och combatant samt battle och combat vilket bara förvirrar andra användare om det finns någon skillnad. Lösningen på detta är att hålla sig till ett namn för en sak vilket jag tar med mig från boken.

Jag är även övertydlig, enligt boken, i vissa metoder vilket bryter mot “Don’t add gratuitous context” då jag lägger på combat i mina metoder, här håller jag inte med om regeln i boken då jag inte tycker att ett metod namn som “start” är tydligt nog.

Jag håller med boken om att man inte ska ha “söta” namn enligt regeln “Don’t be cute” eftersom att det ofta bara förvirrar andra utvecklare.

Något jag också tar hänsyn till ifrån boken är att använda searchable names istället för magic numbers vilket hjälper användare av modulen att lättare hitta metoden de letar efter

| Namn                            |       Fil       | Antal rader (ej ws) |                                                                                                                                                                           Reflektion                                                                                                                                                                            |
| :------------------------------ | :-------------: | :-----------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| executeAttack(targetId, action) | CombatSystem.js |         ~25         | **Small!:** Enligt boken är metoden för lång då boken säger att metoder ska vara pytte små. **Do One Thing:** Metoden bryter mot regeln då den validerar, kontrollerar träff och beräknar damage. Regeln säger att en metod endast ska göra en sak. **Function Arguments:** Metoden är dyadisk (2 argument) vilket är okej men på gränsen, borde refaktorisera. |
| nextUnitTurn                    | CombatSystem.js |         ~10         |               **Small!: Blocks and Indenting:** Som en del av Small regeln så står det att en funktion inte ska ha mer än två nivåer av indentering vilket denna metod uppfyller. **Have No Side Effects:** Metoden bryter mot regeln då den återställer isDefending state vilket kan ses som en dold funktion, borde brytas ut till egen metod.                |
| executeDefend(unitId)           | CombatSystem.js |         ~10         |                                                                                                                         **Command Query Separation:** Metoden följer regeln då den bara ändrar state och loggar. Den returnerar inget.                                                                                                                          |
| takeDamage(amount)              |  Combatant.js   |         ~10         |                                                                                                                    **Do One Thing:** Bryter mot regeln då den validerar input, ändrar damage, applicerar damage och kollar om combatant dör                                                                                                                     |
| startCombat(participants)       | CombatSystem.js |         ~8          |                                                                                                    **One Level of Abstraction:** Blandar hög och låg nivå, den anropar metoder (hög nivå) och tilldelar variabelvärden (låg nivå) vilket bryter mot regeln.                                                                                                     |

### Förslag på förbättringar

- Refaktorisera metoder som både ändrar state och returnerar värden
- Bryta ut validering till validerings metoder
- Refaktorisera långa metoder som gör flera saker till många små metoder

## Reflektion Kap 3

Jag har svårt att se hur författaren vill att funktioner ska vara så små alltså håller jag inte med om "Small" regeln, även fast de flesta av mina metoder är små så vill regeln att dem ska vara ännu mindre. Detta eftersom jag fortfarande är relativt ny som utvecklare så tror jag att det mest tar massa tid om man ska försöka få varenda funktion så liten som möjligt.

Jag har även märkt att jag väldigt ofta blandar commands och queries inte just i denna modul utan även i mina äldre projekt.

Jag tycker även att många regler går in i varandra t.ex om en metod bara gör en sak så följer den antagligen "Command query separation", detta kanske är en dålig tolkning men jag tror att om man försöker följa en regel blir det lättare att följa de flesta andra. Detta då om en metod är liten så gör den antagligen bara en sak.

## Reflektion Kod kvalitet

Efter att jag läst kapitel 2 och kapitel 3 i Clean Code inser jag att jag har brister inom min namngivning och sättet jag skriver metoder på, men jag ser även några styrkor.

Reglerna kring namngivning tycker jag att jag har följt relativt bra. Jag tycker att vissa av mina namn följer “Intention-revealing names” bra t.ex takeDamage och sen är jag bra på att använda verb i namnen enligt regeln. Jag följer reglerna som tipsar en om att inte använda sig utav encodings.

Dock har jag brutit mot meaningful distinctions då jag använder både unit och combatant för samma koncept vilket skapar förvirring för andra utvecklare.

När det kommer till reglerna från kapitel 3 så bryter jag ofta mot “Command Query Separation” vissa av mina metoder både påverkar state och returnerar data. Jag bryter även mot “Do One Thing” i vissa metoder då jag både validerar och gör beräkningar i mina metoder.

En styrka är att de flesta av mina metoder är korta vilket följer “Small” regeln då jag bryter ut viss logik till privata metoder. Men å andra sidan är vissa andra av mina metoder väldigt långa och gör flera saker, detta då jag tycker det är svårt att följa regeln “Command Query Separation” som jag nämnt tidigare.

Min största lärdom är att kod är ett sätt att kommunicera med andra utvecklare och inte bara instruktioner till datorn. Om min metod heter en sak men gör en annan så blir min modul väldigt jobbig att använda och andra utvecklare måste antingen ändra i min kod eller hitta en annan modul.
