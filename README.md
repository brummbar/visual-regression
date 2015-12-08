# visual-regression
Visual Regression testing with Webdrivercss.

## Installation
- install mocha globally (you can also install it locally, if needed)
```sh
$ npm install -g mocha
```
- [Webdrivercss requires](https://github.com/webdriverio/webdrivercss#install) [Graphicsmagick](http://www.graphicsmagick.org/) for image processing.
```sh
# Mac
$ brew install graphicsmagick
# Ubuntu
$ sudo apt-get install graphicsmagick
```
- Download [Selenium Server standalone](http://www.seleniumhq.org/download/) and run it:
```sh
$ java -jar selenium-server-standalone-2.48.2.jar &> /dev/null &
```
- Clone this repo. Open a shell inside the folder and install dependencies:
```sh
$ npm install
```
- Run the tests:
```sh
$ mocha
```
