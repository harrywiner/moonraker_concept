/**
 * File for debugging
 */
require('dotenv').config({path:__dirname+'/../.env'})
const TOKEN = process.env.SAMSARA_TOKEN
if (TOKEN === undefined) {
    throw Error("No token found")
}

const sdk = require('api')('@samsara-dev-rel/v2019.01.01#2xqng621f6l8vvz9pu');
sdk.auth(TOKEN);


function preprocess(addressName, tagName, formattedAddress, geofence) {
    var params = {
        geofence, 
        name: addressName,
        formattedAddress: formattedAddress
    }
    sdk.createAddress(params)
      .then(res => {
        console.log("Address Created, ID: ", res["data"]["id"])

        createTagWithAssets(addressName, tagName).then(res => {
            testCreateDallasTag(res)
        })
    })
      .catch(err => 
        console.error(err));
}

function createTagWithAssets(addressName, tagName) {
    return new Promise(async (resolve, reject) => {
        var assets = (await sdk.V1getAllAssetCurrentLocations())["assets"]

        var filtered_assets = assets.filter(e => e["location"][0]["location"] === addressName)
        var assetIDs = filtered_assets.map(e => e["id"])
        sdk.createTag({name: tagName, assets: assetIDs}).then(res => {
            resolve(res["data"]["id"])
        }).catch(err => 
            console.error(err))
    })
}

function updateTagAssets(addressName, tagID, tagName) {
    return new Promise(async (resolve, reject) => {
        var assets = (await sdk.V1getAllAssetCurrentLocations())["assets"]

        var filtered_assets = assets.filter(e => e["location"][0]["location"] === addressName)
        var assetIDs = filtered_assets.map(e => String(e["id"]))
        /**
         * Added For testing DELETE IN PRODUCTION
         */
        assetIDs = assetIDs.slice(0, assetIDs.length - 2)
        // End Delete
        sdk.replaceTag({assets: assetIDs, name: tagName}, {id: tagID}).then(res => {
            resolve(res["data"]["id"])
        }).catch(err => 
            console.error(err))
    })
}

function testCreateDallasTag(tagID) {
    const NUM_DALLAS_ASSETS = 176
    sdk.getTag({id: tagID})
        .then(res => {
            console.log(res)
            if (res["data"]["assets"].length != NUM_DALLAS_ASSETS)
            throw Error("Inocorrect number of assets: expected: " + NUM_DALLAS_ASSETS + " Found: " + res["data"]["assets"].length)
            else
            console.log("Success!")
            })
        .catch(err => console.error(err));
}

function testUpdateDallasTag(tagID) {
    const NUM_DALLAS_ASSETS = 175
    sdk.getTag({id: tagID})
        .then(res => {
            console.log(res)
            if (res["data"]["assets"].length != NUM_DALLAS_ASSETS)
            throw Error("Inocorrect number of assets: expected: " + NUM_DALLAS_ASSETS + " Found: " + res["data"]["assets"].length)
            else
            console.log("Success!")
            })
        .catch(err => console.error(err));
}


const GEOFENCE = {"circle": {
    "latitude": 30.1345549,
    "longitude": -97.6407735,
    "radiusMeters": 3000
  }} 
const TEST_ADDRESS = "Test Dallas Address"
const TEST_TAG = "Test_0005"
const TEST_FORMATTED_ADDRESS = "9201 Circuit of the Americas Blvd, Del Valle, TX 78617, United States"


// preprocess(TEST_ADDRESS, TEST_TAG, TEST_FORMATTED_ADDRESS, GEOFENCE)
const TEST_TAG_ID = '3759360'
// updateTagAssets(TEST_ADDRESS, TEST_TAG_ID, TEST_TAG).then(res => testUpdateDallasTag(TEST_TAG_ID))
testUpdateDallasTag(TEST_TAG_ID)