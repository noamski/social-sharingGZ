# זה סופו של כל בלון

תשתית חיבור בין אזרחים לרשויות בעוטף עזה

באמצעות דיווח של האזרחים באתר על בלונים/עפיפונים/שריפות תנתן התרעה לכוחות הביטחון בעוטף עזה  

המטרה הינה הקטנת את זמן התגובה ולהזעיק כוחות כיבוי למקום בהקדם האפשרי

## התקנה 

איך מורידים את הפרויקט ואילו עזרים זקוקים להרצתו 

### להורדת הפרויקט     
```
$ git clone https://github.com/yarivg/balloonsGZ.git
```
### להורדת עזרים תומכים  
```bash

$ cd balloonsGZ

# Install dependencies
$ npm install

# start server
$ npm run start

# Client url: http://localhost:4200
# Application ( epxress ) API: http://localhost:4300
```

## Deployment

### "/dist" folder'
```bash

$ npm run build 
```
### Run server with https(port 443) 

```bash
$ node dist/server/bin/www.js
```

## Built With

* [Angular 2](https://www.tutorialspoint.com/angular2/) - The web JavaScript framework used

## Authors

  [שותפים](https://github.com/yarivg/baloonsGZ/graphs/contributors) שלוקחים חלק בפרויקט 

