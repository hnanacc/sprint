<h3 align='center'> Sprint </h3>

<p align='center' markdown='1'>
A tailored code editor for competitive programmers
</p>
<br>

<img width="100%" src="img/Screenshot%20from%202020-01-23%2023-36-07.png">

--------------------------------------------------------------------------------

# Usage 

start the editor
```sh
$ sprint 
```

# Contribution

If you wish to contribute to this repository then follow the steps below to build the project.

Make sure you have `nodejs` and `npm` installed. If you don't, follow the [link](https://nodejs.org/en/). 
Also if you are on windows install some linux terminal client like `git-bash`. The below snippets should work fine
on `linux` and `macOS`. 

* Step 1: Clone the github repository.

```sh
$ git clone https://github.com/bitbeast18/sprint.git
```
* Step 2: Install project dependencies.

```sh
$ cd sprint
$ npm install
```

* Step 3: Re-build `electron` to build native node packages.

```sh 
$ npm install electron-rebuild
$ $(npm bin)/electron-rebuild
```

* Step 4: Run the project.

```sh
$ npm run electron:serve
```

Every time you work on the project make sure to `pull` the updates from `master`.

# Known issues

* If `electron` fails to install then follow the steps below.

```sh
$ cd test-editor
$ ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/" npm install electron@latest --verbose
```

`pull-requests` are welcomed.
