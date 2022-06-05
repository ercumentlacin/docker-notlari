# Docker Hakkinda Her Sey

## Faydali Komutlar

- Image upload

```shell
$ docker pull ubuntu
```

- Image run

```shell
$ docker run ubuntu
```

- Image run and not executed

```shell
$ docker run -it ubuntu
```

- Exit

```shell
$ exit
```

- Ayakta olan containerlari listeler

```shell
$ docker ps
# yada
$ docker container ls
```

- Gecmise yonelik calisan tum containerlari listeler

```shell
$ docker ps -all
# yada
$ docker container ls -a
```

- Container'a isim vermek

```shell
$ docker run --name -it my_bash ubuntu
```

- Isimli container'i calistirmak

```shell
$ docker start my_bash
```

- Isimli container'i durdurmak

```shell
$ docker stop my_bash
# not
# container adi yerine container_id yazilabilir
# hatta rastgele gelen isimler de kullanilabilir
```

- Aktif olmayan containerlari silmek

```shell
$ docker rm my_bash
# name yada id kullanilabilir

# Hepsini silmek istersek
$ docker rm $(docker container ls -aq)
# yada
$ docker prune
```

- Tagler ile calismak

```shell
$ docker run redis:5
# isim sonrasi gelen rakam tagi ifade eder
```

- Image'i arka planda calistirmak (Detach Mode)

```shell
$ docker run -d redis
# bu komut imagei calistirir ve container id'sini bize doner
```

- Arka planda calisan image'i on plana almak (Attach)

```shell
$ docker attach ilgiliContainerId
```

- Container loglarini goruntulemek

```shell
$ docker container logs ilgiliContainerId
```

- Port Mapping

```shell
$ docker run -p DIS_PORT_Numarasi:IC_PORT_Numarasi mongo
# docker run -p 27017:27017 mongo
```

- Volume Mapping (Mesela mongo'da yapmis oldugumuz degisikliklerin saklanmasini saglar)

```shell
$ docker run -v /opt/data:/data/db mongo
# destination:source
# hata alirsan ziyaret et >> https://stackoverflow.com/a/68495984/14406819
```

- Enviorment eklemek

```shell
$ docker run -e DB_NAME=MY_AWESOME_DB mongo
```

- Network olusturmak

```shell
$ docker network create --driver bridge --subnet 182.18.0.1/24 --gateway 182.18.0.1 custom-network
```

- Networkleri listelemek

```shell
$ docker network ls
```

- Network uzerinden container oluşturmak

```shell
$ docker run --name mongo-server --net custom-network  -d mongo
```

- Bir image'i network uzerinden ayaga kaldirmak

```shell
$ docker run --net custom-network -p 3000:3000 mongo
```

- Docker image olusturmak

```shell
$ docker build . -t herhangibirisim
# nokta dedigimiz path Dockerfile bulundugu konum
```

- Docker image silmek

```shell
$ docker rmi imageName
```

- Container Links

```shell
# Adim I: express uygulamasini image et
$ docker build . -t todo-app
# Adim II: mongo'yu ayaga kaldir
$ docker run --name mongo-server -p 27017:27017 -d mongo
# Adim III: link metodu ile mongo-server 'a baglan
$  docker run --link mongo-server:mongo-alias  -p 4000:4000 todo-app
```

- Entypoint

```dockerfile
ENTRYPOINT ["node"]
# image run edilirken herhangi bir sey yazabilirsiniz mesela
# docker run my-app file1.js
```

- Cache temizleme

```shell
$ docker builder prune
```

## Docker Compose

> Butun komutlar `.yaml` dosyasinin bulundugu dizinde calistirilmali

- Image olusturmak

```shell
$ docker-compose build
```

- Image ayaga kaldırmak

```shell
$ docker-compose up
```

- Image durdurmak icin

```shell
$ docker-compose down
```

## Kaynaklar

- [Docker Hub](https://hub.docker.com/)
- [Kablosuz Kedi](https://www.youtube.com/playlist?list=PL_f2F0Oyaj4_xkCDqnRWp4p5ypjDeC0kO)
