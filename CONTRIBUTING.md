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

_Package for MacOS:_

```
yarn package-mac
```

_Package for Windows:_

```
yarn package-win
```

_Package for Linux:_

```
yarn package-linux
```

OR

_Package for all three operating systems:_

```
yarn package-all
```

<!-- TESTING USED -->

## Testing

The Nautilus repo is integrated with Travis CI, so tests will run automatically on all pull requests. But, we highly recommend that you test as you develop--Nautilus is a test driven development team. We have two ways to run tests:

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
