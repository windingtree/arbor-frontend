# Winding Tree Marketplace Front-End

Winding Tree Marketplace is an explorer for Winding Tree's [ORG.ID Protocol](https://github.com/windingtree/org.id).
It allows owners and directors of travel companies to create and administrate their organizations using a simple and intuitive user interface.

This repository contains the user interface, which is deployed as a static React application.

## Dependencies:
* yarn
* node 10

## Configuration
The App expects environment variables which are used to properly configure the different parameters according to the environment.

* `REACT_APP_LIF_DEPOSIT_AMOUNT`: The minimal amount to be used for verficiation, eg: 1000
* `REACT_APP_API_URI`: URL for the Backend API
* `REACT_APP_ORGID_PROXY_ADDRESS`: The address of the ORG.ID proxy contract.
* `REACT_APP_DIRECTORY_PROXY_ADDRESS`: The address of the Directory proxy contract.
* `REACT_APP_ETHEREUM_CHAIN_ID`: The Ethereum chain ID, eg: 1 for Mainnet or 3 for Ropsten


Also to handle the maintenance scenario, there is an optional variable to enable maintenace:
* `REACT_APP_MAINTENANCE`: It should be a JSON with the following keys:
  * `active`: `true` or `false` to enable the maintenance mode
  * `text`: The text of the maontenance mode
  * `button`: The text of the button for action
  * `link`: The link of a page that opens in a separate tab when the button is clicked
  * `title`: The title of the maintenance page


## Usage

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds Winding Tree Marketplace in the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

## Zeit Deployment usage
Winding Tree Marketplace can be deployed on Zeit now.<br />
There are three preloaded configurations inlcuded in this folder for `staging`, `ropsten` and `production` (mainnet). These configurations are picked-up by the `zeit_build.sh` script during the CI/CD flow to build the proper environment.

