<h1 align="center">
  <img src="./static/Nautilus-text-logo2.png" width=400px>
</h1>

<p align="center">
  A Docker Compose Charting Tool <br>
  <a href="https://nautilusdev.com">nautilusdev.com</a>
</p>

<p align="center">
  <!-- License -->
  <img src="https://img.shields.io/github/license/oslabs-beta/nautilus?color=brown&label=license">

  <!-- Release -->
  <img src="https://img.shields.io/badge/release-1.2.0-orange">

  <!-- Release Date -->
  <img src="https://img.shields.io/badge/release%20date-4%2F9%2F20-yellow">

  <!-- Test -->
  <img src="https://img.shields.io/travis/com/oslabs-beta/nautilus/master?color=green&label=test">

  <!-- Typescript (Dominant Languge Used) -->
  <img src="https://img.shields.io/github/languages/top/oslabs-beta/nautilus?color=brightgreen">

  <!-- Repo Size -->
  <img src="https://img.shields.io/github/repo-size/oslabs-beta/nautilus?color=blue">

  <!-- Contributions -->
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat&color=navy">

  <!-- Test Coverage -->
  <!-- <a href="https://codecov.io/github/choojs/choo">
    <img src="https://img.shields.io/codecov/c/github/choojs/choo/master.svg?style=flat-square&color=indigo"
      alt="Test Coverage" />
  </a> -->

  <!-- Stability
  <img src="https://img.shields.io/badge/stability-beta-blueviolet"> -->

  <!-- Code Style -->
  <img src="https://img.shields.io/badge/code%20style-airbnb-violet">
</p>

<p align="center">
  <sub> No nautili were harmed during the making of this application
  <br>
  - Aris, Danny, Josh, Michael, Tyler
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Features](#about-the-project)
  - [Networks View](#networks-view)
  - [Depends On View](#depends-on-view)
  - [Ports and Volumes Toggles](#ports-and-volumes-toggles)
  - [Service Info Display](#service-info-display)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
  - [Cloning The Repo](#cloning-the-Repo)
  - [Development](#development)
  - [Packaging](#packaging)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [You May Also Like...](#you-may-also-like)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## Features

### Upload your Compose file

<p align="center">
  <img src="https://nautilusdev.com/assets/upload-g.gif" width=70%>
</p>

### Display your service's info, ports and volumes

<p align="center">
  <img src="./static/options.png" width=70%>
</p>

### View services by networks or a container dependent view

<p align="center">
  <img src="./static/views.png" width=70%>
</p>

<!-- GETTING STARTED -->

## Getting Started

Nautilus comes in a prebundled application that is ready to run on your preferred operating system.

### **Prerequisites**

Nautilus requires the <code>docker</code> and <code>docker-compose</code> command-line interface tools installed. For Mac and Windows users, this comes included with Docker Desktop. For Linux Users, this comes included with Docker Engine.<br/><br/>
For your convenience, we've included links to Docker's documentation to set this up on your preferred operating system below.

- [Mac](https://docs.docker.com/docker-for-mac/install/)
- [Windows](https://docs.docker.com/docker-for-windows/install/)
- [Linux](https://docs.docker.com/docker-for-mac/install/)

### **Installation**

Once you're sure you have the <code>docker</code> and <code>docker-compose</code> CLI tools installed, download the application from one of the links below.

- [Windows](https://nautilusdev.com/release/Nautilus%20Setup%201.2.0.exe)
- [Mac](https://nautilusdev.com/release/Nautilus-1.2.0.dmg)
- [Linux](https://nautilusdev.com/release/Nautilus-1.2.0.AppImage)

We are currently in the process of getting appropriate certifications/signatures so you may need to bypass some security warnings to run our application, but rest assured Nautilus does not make any network calls (and the project is 100% open source).

### **Visualizing Your Application**

Run the application, upload your Docker Compose file, and visualize your Docker Compose setup with the various views and options.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### **Cloning the Repo**

1. Fork the Project and clone the repo to your local machine
2. Install Dependencies

   Using Yarn (highly recommended):

   ```
   yarn
   ```

   Using npm:

   ```
   npm install
   ```

3. Make changes
4. Write tests for changes
5. Open a Pull Request

### **Development**

When developing, you'll probably want to run the dev version of our application. Nautilus development is fully integrated with webpack HMR, typescript and sass loaders and Electron. To start the development enviorment.

```
yarn dev
```

This will open a new instance of the Nautilus desktop application and will reload automatically as you make changes. Code away!!

### **Packaging**

Nautilus utilizes electron-builder to package the application. If you want to see the changes you've made to Nautilus in a production version of the application, use these scripts:

_Package for Linux:_ `yarn package-linux`

_Package for macOS:_ `yarn package-mac`

_Package for windows:_ `yarn package-win`

OR

_Package for all three:_ `yarn package-all`

<!-- TESTING USED -->

## Testing

The Nauilus repo is integrated with Travis Ci, so tests will run automatically on all pull requests. But, we highly recommend that you test as you develop. Nautilus is a test driven development team. We have two was to run tests.

#### #1 Run Tests for Whole Application

```
yarn test
```

Best use for `yarn test` is right before making a PR to make sure that none of your changes have broken the application.

#### #2 Run One Test File

```
yarn test-f <test-filename>
```

This command is ideal when working on a particular component to streamline development. No need to run tests for the whole application when only touching one file.

<!-- TECHNOLOGIES USED -->

## Technologies Used

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [TypeScript](https://www.typescriptlang.org/)
- [Electron](https://www.electronjs.org/)
- [D3](https://d3js.org/)
- [React with Hooks](https://reactjs.org/)
- [Jest](https://jestjs.io/)
- [Enzyme](https://github.com/enzymejs/enzyme)
- [Travis CI](https://travis-ci.org/)
- [SCSS](https://sass-lang.com/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

<!-- YOU MAY ALSO LIKE -->

## You May Also Like...

- [bankai](https://github.com/choojs/bankai) - streaming asset compiler
- [stack.gl](http://stack.gl/) - open software ecosystem for WebGL
- [yo-yo](https://github.com/maxogden/yo-yo) - tiny library for modular UI
- [tachyons](https://github.com/tachyons-css/tachyons) - functional CSS for
  humans
- [sheetify](https://github.com/stackcss/sheetify) - modular CSS bundler for
  `browserify`

  <!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

The Nauilus Devs - [linkedin](https://www.linkedin.com/company/nautilusapp)
