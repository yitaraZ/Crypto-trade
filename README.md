#Crypto-trade

## Installation

 ติดตั้ง project

clone repo
```
git clone https://github.com/yitaraZ/Crypto-trade
```
เปลี่ยน directory ไปที่ Crypto-trade ที่เป็น
```
cd SortingHat
```
ติดตั้ง dependency 
```
npm i
```

-----------------------------------------------------

### ติดตั้ง database 

ไปที่โฟลเดอร์ db ก่อน
```
cd db
```

ใช้คำสั่ง docker-compose
```
docker-compose up -d
```
ติดตั้ง databae เสร็จสิ้น ออกไปหน้าเดิมที่ crypto-trade

-----------------------------------------------------

### เตรียมรันโปรแกรม

***ไฟล์ .env นี้มีไว้เพื่อการทดสอบเท่านั้น ไม่ควรนำไปใช้ใน production***

ไปที่โฟลเดอร์ server
```
cd crypto/server
```

รัน seed 
```
node seeders/seedAllScenarios.js
```

รันโปรแกรม
```
node index.js
```


