# Autumn_mall
Autumn 조 쇼핑몰 프로젝트입니다
먼저, Docker를 사용하여 DB 서버를 구성하였음을 알립니다

# docker 설정파일
```
version: "2"

services:
  vacation-db:
    image: mysql
    restart: always
    environment: // enviroment에서 TZ부분 말고 본인 환경에 맞춰 수정
      MYSQL_ROOT_PASSWORD: "root1234"
      MYSQL_DATABASE: "exampledb"
      MYSQL_USER: "urstory"
      MYSQL_PASSWORD: "u1234"
      TZ: Asia/Seoul
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - ./database/init/:/docker-entrypoint-initdb.d/
      - ./database/datadir/:/var/lib/mysql
    platform: linux/x86_64
    ports:
      - 3307:3307 // port번호 확인

```

## front단 설치
폴더 안의 'front' 에서 npm install --legacy-peer-deps 를 해줍니다.
( 버전 간의 상호 호환성 문제 )

## back단 설치
resources/application.yml에서 
```

spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3307/exampledb?useUnicode=true&serverTimezone=Asia/Seoul
    username: urstory
    password: u1234
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        show_sql: true
        format_sql: true
    database-platform: org.hibernate.dialect.MySQL8Dialect 
```
여기 중, 'url: jdbc:mysql://127.0.0.1:3307/exampledb?useUnicode=true&serverTimezone=Asia/Seoul` 여기에서 해당하는 db, 포트번호로 바꿉니다.

ex) 워크벤치 기준 스키마가 'examplesdb', docker 기준 port번호가 3308이면
'url: jdbc:mysql://127.0.0.1:3308/examplesdb?useUnicode=true&serverTimezone=Asia/Seoul`


