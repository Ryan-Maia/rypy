# Sobre

O aplivativo Rypy é um programa simples para baixar vídeos do YouTube através da url. Desenvolvido com python, html, css, javascript, vuejs e um pouco de nodejs (electron).

## Python

Em python, foi utilizado a biblioteca [Eel](https://github.com/ChrisKnott/Eel/), desenvolvida por Chris Knott. A biblioteca consistem em controlar uma aba de navegador, e conta com códigos para criar uma ponte entre o JavaScript da aba com o python do processo, exportando as funções de cada um no outro, sendo possível chamar funções do python no javaScript e o oposto.

## Nodejs

Em node, foi utilizado a biblioteca [electron](https://github.com/electron/electron) para o controle da janela do navegador em que a interface é desenvolvida, possibilitando um controle maior da customização da mesma.

## Html, Css e JavaScript

O Html, css e JavaScript são os básicos e essenciais do desenvolvimento web.

## Vuejs

O vuejs foi utilizado em sua forma reduzida, como uma lib JavaScript importada por cdn.

# Dependencias

## Python

```
pip install pytube
pip install moviepy
pip install eel
```

## Nodejs

```
yarn install

Ou

npm install
```

# Executar

```
python main.py
```