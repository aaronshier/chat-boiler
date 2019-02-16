# RN Chat Web/Mobile App Boiler Plate

## Instructions

## Performance
With the current settings, page speed is 98 in lighthouse.

<!-- <p align="center">
  <img src="./assets/banner.png">
  <br>
  Easy-to-use CUI for fixing git conflicts
  <br>
  <br>
  <p align="center">
    <a href="https://travis-ci.org/mkchoi212/fac">
      <img src="https://travis-ci.org/mkchoi212/fac.svg?branch=master">
    </a>
    <a href="https://goreportcard.com/report/github.com/mkchoi212/fac">
      <img src="https://goreportcard.com/badge/github.com/mkchoi212/fac">
    </a>
    <a href="https://codecov.io/gh/mkchoi212/fac">
      <img src="https://codecov.io/gh/mkchoi212/fac/branch/master/graph/badge.svg">
    </a>
  </p>
</p>
<br>

I never really liked any of the `mergetools` out there so I made a program that is somewhat easier to use.

![Preview](https://i.imgur.com/GsJMRIp.gif)

## 👷 Installation

Execute:

```bash
$ go get github.com/mkchoi212/fac
```

Or using [Homebrew 🍺](https://brew.sh)

```bash
brew tap mkchoi212/fac https://github.com/mkchoi212/fac.git
brew install fac
```

## 🔧 Using

`fac` operates much like `git add -p` . It has a prompt input at the bottom of the screen where the user inputs various commands.

The commands have been preset to the following specifications

```
w - show more lines up
s - show more lines down
a - use local version
d - use incoming version
e - manually edit code

j - scroll down
k - scroll up

v - [v]iew orientation
n - [n]ext conflict
p - [p]revious conflict

h | ? - [h]elp
q | Ctrl+c - [q]uit

[w,a,s,d,?] >> [INPUT HERE]
```

### ⚙️ Customization

The above key-bindings and various behaviors can be altered by creating a `.fac.yml` file in your home directory.
Please refer to the [configuration README.md](./binding/README.md) for more information.

## ✋ Contributing

This is an open source project so feel free to contribute by

- Opening an [issue](https://github.com/mkchoi212/fac/issues/new)
- Sending me feedback via [email](mailto://mkchoi212@icloud.com)
- Or [tweet](https://twitter.com/Bananamlkshake2) at me!

## 👮 License
See [License](./LICENSE) -->