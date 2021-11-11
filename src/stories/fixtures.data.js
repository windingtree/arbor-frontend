export const SAMPLE_ORGANISATION_SIMARD = {
    "type": "orgid",
    "subsidiaries": ["0xa8eacc80e138a30cd86002f12f5f324a3f2214b1fefc833435901ab6189579bb", "0x34dea2f4f739c43af35f6ffa82284d28280997ad26408b9e3d61525ec95b442e", "0xb5cd9c2be7774d1729e21d6534f9c0a0e9a40bd6c7259896cf55db9962ced5b4", "0x0b33e46b5cd994f8f9fc3142d67e7ca45a0011d520227a5f4696c09264547175", "0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d"],
    "parent": null,
    "jsonContent": {
        "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
        "id": "did:orgid:0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
        "created": "2020-06-30T10:06:42.645Z",
        "updated": "2020-06-30T10:06:42.645Z",
        "publicKey": [],
        "service": [],
        "trust": {
            "assertions": [{"type": "dns", "claim": "simard.io", "proof": "TXT"}, {
                "type": "domain",
                "claim": "simard.io",
                "proof": "https://simard.io/orgid.txt"
            }], "credentials": []
        },
        "legalEntity": {
            "legalName": "Simard OÜ",
            "alternativeName": "Simard",
            "legalIdentifier": "EE102233584",
            "identifiers": [{"type": "IATA", "value": "63320235"}],
            "legalType": "Limited Company",
            "registeredAddress": {
                "country": "EE",
                "subdivision": "EE-37",
                "locality": "Tallinn",
                "postalCode": "10115",
                "streetAddress": "Tartu mnt",
                "premise": "67/1-13b"
            },
            "locations": [],
            "contacts": []
        }
    },
    "orgid": "0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
    "owner": "0x7554EEd08160090c911180f9253091F07631D683",
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "director": "0x0000000000000000000000000000000000000000",
    "state": true,
    "directorConfirmed": false,
    "name": "Simard OÜ",
    "logo": null,
    "country": "EE",
    "proofsQty": 1,
    "isLifProved": false,
    "isWebsiteProved": true,
    "isSslProved": false,
    "isSocialFBProved": false,
    "isSocialTWProved": false,
    "isSocialIGProved": false,
    "isSocialLNProved": false,
    "isJsonValid": true,
    "orgJsonHash": "0xae078b1976d0b7414384ff8bb0af1d456e50eb3813b056bcf7dc6b25acfae476",
    "orgJsonUri": "https://raw.githubusercontent.com/windingtree/orgids/master/simard.json",
    "jsonCheckedAt": "2020-11-25T11:11:54.000Z",
    "jsonUpdatedAt": "2020-11-25T11:11:54.000Z",
    "createdAt": "2020-06-30T18:40:18.000Z",
    "updatedAt": "2020-11-25T11:11:55.000Z"
}

export const SAMPLE_ORGANISATION_SIMARD_SUBSIDIARIES =
    [{
        "subsidiaries": [],
        "parent": {
            "orgid": "0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
            "owner": "0xeAD12C6EE973E03D2d630D81eFa57F393CB9117f",
            "subsidiaries": ["0xa8eacc80e138a30cd86002f12f5f324a3f2214b1fefc833435901ab6189579bb", "0x34dea2f4f739c43af35f6ffa82284d28280997ad26408b9e3d61525ec95b442e", "0xb5cd9c2be7774d1729e21d6534f9c0a0e9a40bd6c7259896cf55db9962ced5b4"],
            "orgidType": "legalEntity",
            "directory": "legalEntity",
            "director": "0x0000000000000000000000000000000000000000",
            "state": true,
            "directorConfirmed": false,
            "name": "Simard OÜ",
            "country": "EE",
            "proofsQty": 0,
            "isWebsiteProved": false,
            "isSslProved": false,
            "isSocialFBProved": false,
            "isSocialTWProved": false,
            "isSocialIGProved": false,
            "isSocialLNProved": false,
            "isJsonValid": true,
            "jsonContent": {
                "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
                "id": "did:orgid:0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
                "created": "2020-06-30T10:06:42.645Z",
                "updated": "2020-06-30T10:06:42.645Z",
                "publicKey": [],
                "service": [],
                "trust": {
                    "assertions": [{"type": "dns", "claim": "simard.io", "proof": "TXT"}, {
                        "type": "domain",
                        "claim": "simard.io",
                        "proof": "https://simard.io/orgid.txt"
                    }], "credentials": []
                },
                "legalEntity": {
                    "legalName": "Simard OÜ",
                    "alternativeName": "Simard",
                    "legalIdentifier": "EE102233584",
                    "identifiers": [{"type": "IATA", "value": "63320235"}],
                    "legalType": "Limited Company",
                    "registeredAddress": {
                        "country": "EE",
                        "subdivision": "EE-37",
                        "locality": "Tallinn",
                        "postalCode": "10115",
                        "streetAddress": "Tartu mnt",
                        "premise": "67/1-13b"
                    },
                    "locations": [],
                    "contacts": []
                }
            },
            "orgJsonHash": "0xae078b1976d0b7414384ff8bb0af1d456e50eb3813b056bcf7dc6b25acfae476",
            "orgJsonUri": "https://raw.githubusercontent.com/windingtree/orgids/master/simard.json",
            "jsonCheckedAt": "2020-07-11T12:33:00.035Z",
            "jsonUpdatedAt": "2020-07-11T12:33:00.035Z"
        },
        "orgid": "0x34dea2f4f739c43af35f6ffa82284d28280997ad26408b9e3d61525ec95b442e",
        "state": true,
        "orgidType": "organizationalUnit",
        "directory": "travel agency",
        "name": "Glider Travel",
        "logo": null,
        "proofsQty": 0,
        "owner": "0x7554EEd08160090c911180f9253091F07631D683",
        "country": "EE",
        "type": "orgid"
    }, {
        "subsidiaries": [],
        "parent": {
            "orgid": "0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
            "owner": "0xeAD12C6EE973E03D2d630D81eFa57F393CB9117f",
            "subsidiaries": ["0xa8eacc80e138a30cd86002f12f5f324a3f2214b1fefc833435901ab6189579bb", "0x34dea2f4f739c43af35f6ffa82284d28280997ad26408b9e3d61525ec95b442e", "0xb5cd9c2be7774d1729e21d6534f9c0a0e9a40bd6c7259896cf55db9962ced5b4"],
            "orgidType": "legalEntity",
            "directory": "legalEntity",
            "director": "0x0000000000000000000000000000000000000000",
            "state": true,
            "directorConfirmed": false,
            "name": "Simard OÜ",
            "country": "EE",
            "proofsQty": 0,
            "isWebsiteProved": false,
            "isSslProved": false,
            "isSocialFBProved": false,
            "isSocialTWProved": false,
            "isSocialIGProved": false,
            "isSocialLNProved": false,
            "isJsonValid": true,
            "jsonContent": {
                "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
                "id": "did:orgid:0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
                "created": "2020-06-30T10:06:42.645Z",
                "updated": "2020-06-30T10:06:42.645Z",
                "publicKey": [],
                "service": [],
                "trust": {
                    "assertions": [{"type": "dns", "claim": "simard.io", "proof": "TXT"}, {
                        "type": "domain",
                        "claim": "simard.io",
                        "proof": "https://simard.io/orgid.txt"
                    }], "credentials": []
                },
                "legalEntity": {
                    "legalName": "Simard OÜ",
                    "alternativeName": "Simard",
                    "legalIdentifier": "EE102233584",
                    "identifiers": [{"type": "IATA", "value": "63320235"}],
                    "legalType": "Limited Company",
                    "registeredAddress": {
                        "country": "EE",
                        "subdivision": "EE-37",
                        "locality": "Tallinn",
                        "postalCode": "10115",
                        "streetAddress": "Tartu mnt",
                        "premise": "67/1-13b"
                    },
                    "locations": [],
                    "contacts": []
                }
            },
            "orgJsonHash": "0xae078b1976d0b7414384ff8bb0af1d456e50eb3813b056bcf7dc6b25acfae476",
            "orgJsonUri": "https://raw.githubusercontent.com/windingtree/orgids/master/simard.json",
            "jsonCheckedAt": "2020-07-11T12:35:02.560Z",
            "jsonUpdatedAt": "2020-07-11T12:35:02.560Z"
        },
        "orgid": "0xa8eacc80e138a30cd86002f12f5f324a3f2214b1fefc833435901ab6189579bb",
        "state": true,
        "orgidType": "organizationalUnit",
        "directory": "travel aggregator",
        "name": "Glider Aggregator",
        "logo": null,
        "proofsQty": 0,
        "owner": "0x7554EEd08160090c911180f9253091F07631D683",
        "country": "EE",
        "type": "orgid"
    }, {
        "subsidiaries": [],
        "parent": {
            "orgid": "0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
            "owner": "0x7554EEd08160090c911180f9253091F07631D683",
            "subsidiaries": ["0xa8eacc80e138a30cd86002f12f5f324a3f2214b1fefc833435901ab6189579bb", "0x34dea2f4f739c43af35f6ffa82284d28280997ad26408b9e3d61525ec95b442e", "0xb5cd9c2be7774d1729e21d6534f9c0a0e9a40bd6c7259896cf55db9962ced5b4", "0x0b33e46b5cd994f8f9fc3142d67e7ca45a0011d520227a5f4696c09264547175", "0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d"],
            "orgidType": "legalEntity",
            "directory": "unknown",
            "director": "0x0000000000000000000000000000000000000000",
            "state": true,
            "directorConfirmed": false,
            "name": "Simard OÜ",
            "country": "EE",
            "proofsQty": 1,
            "isWebsiteProved": true,
            "isSslProved": false,
            "isSocialFBProved": false,
            "isSocialTWProved": false,
            "isSocialIGProved": false,
            "isSocialLNProved": false,
            "isJsonValid": true,
            "jsonContent": {
                "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
                "id": "did:orgid:0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
                "created": "2020-06-30T10:06:42.645Z",
                "updated": "2020-06-30T10:06:42.645Z",
                "publicKey": [],
                "service": [],
                "trust": {
                    "assertions": [{"type": "dns", "claim": "simard.io", "proof": "TXT"}, {
                        "type": "domain",
                        "claim": "simard.io",
                        "proof": "https://simard.io/orgid.txt"
                    }], "credentials": []
                },
                "legalEntity": {
                    "legalName": "Simard OÜ",
                    "alternativeName": "Simard",
                    "legalIdentifier": "EE102233584",
                    "identifiers": [{"type": "IATA", "value": "63320235"}],
                    "legalType": "Limited Company",
                    "registeredAddress": {
                        "country": "EE",
                        "subdivision": "EE-37",
                        "locality": "Tallinn",
                        "postalCode": "10115",
                        "streetAddress": "Tartu mnt",
                        "premise": "67/1-13b"
                    },
                    "locations": [],
                    "contacts": []
                }
            },
            "orgJsonHash": "0xae078b1976d0b7414384ff8bb0af1d456e50eb3813b056bcf7dc6b25acfae476",
            "orgJsonUri": "https://raw.githubusercontent.com/windingtree/orgids/master/simard.json",
            "jsonCheckedAt": "2021-03-12T07:37:53.766Z",
            "jsonUpdatedAt": "2021-03-12T07:37:53.766Z"
        },
        "orgid": "0xb5cd9c2be7774d1729e21d6534f9c0a0e9a40bd6c7259896cf55db9962ced5b4",
        "state": true,
        "orgidType": "organizationalUnit",
        "directory": "unknown",
        "name": "Simard Pay",
        "logo": "https://simard.io/images/logo_marketplace.png",
        "proofsQty": 0,
        "owner": "0x7554EEd08160090c911180f9253091F07631D683",
        "country": "EE",
        "type": "orgid"
    }, {
        "subsidiaries": [],
        "parent": {
            "orgid": "0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
            "owner": "0x7554EEd08160090c911180f9253091F07631D683",
            "subsidiaries": ["0xa8eacc80e138a30cd86002f12f5f324a3f2214b1fefc833435901ab6189579bb", "0x34dea2f4f739c43af35f6ffa82284d28280997ad26408b9e3d61525ec95b442e", "0xb5cd9c2be7774d1729e21d6534f9c0a0e9a40bd6c7259896cf55db9962ced5b4", "0x0b33e46b5cd994f8f9fc3142d67e7ca45a0011d520227a5f4696c09264547175", "0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d"],
            "orgidType": "legalEntity",
            "directory": "legalEntity",
            "director": "0x0000000000000000000000000000000000000000",
            "state": true,
            "directorConfirmed": false,
            "name": "Simard OÜ",
            "country": "EE",
            "proofsQty": 1,
            "isWebsiteProved": true,
            "isSslProved": false,
            "isSocialFBProved": false,
            "isSocialTWProved": false,
            "isSocialIGProved": false,
            "isSocialLNProved": false,
            "isJsonValid": true,
            "jsonContent": {
                "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
                "id": "did:orgid:0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
                "created": "2020-06-30T10:06:42.645Z",
                "updated": "2020-06-30T10:06:42.645Z",
                "publicKey": [],
                "service": [],
                "trust": {
                    "assertions": [{"type": "dns", "claim": "simard.io", "proof": "TXT"}, {
                        "type": "domain",
                        "claim": "simard.io",
                        "proof": "https://simard.io/orgid.txt"
                    }], "credentials": []
                },
                "legalEntity": {
                    "legalName": "Simard OÜ",
                    "alternativeName": "Simard",
                    "legalIdentifier": "EE102233584",
                    "identifiers": [{"type": "IATA", "value": "63320235"}],
                    "legalType": "Limited Company",
                    "registeredAddress": {
                        "country": "EE",
                        "subdivision": "EE-37",
                        "locality": "Tallinn",
                        "postalCode": "10115",
                        "streetAddress": "Tartu mnt",
                        "premise": "67/1-13b"
                    },
                    "locations": [],
                    "contacts": []
                }
            },
            "orgJsonHash": "0xae078b1976d0b7414384ff8bb0af1d456e50eb3813b056bcf7dc6b25acfae476",
            "orgJsonUri": "https://raw.githubusercontent.com/windingtree/orgids/master/simard.json",
            "jsonCheckedAt": "2021-02-01T09:23:50.778Z",
            "jsonUpdatedAt": "2021-02-01T09:23:50.778Z"
        },
        "orgid": "0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d",
        "state": true,
        "orgidType": "organizationalUnit",
        "directory": "[\"inventory management system\",\"property management system\",\"channel manager\"]",
        "name": "Rooms",
        "logo": null,
        "proofsQty": 0,
        "owner": "0x7554EEd08160090c911180f9253091F07631D683",
        "country": null,
        "type": "orgid"
    }]


export const SAMPLE_ORGANISATION_ROOMS = {
    "type": "orgid",
    "subsidiaries": [],
    "parent": {
        "orgid": "0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
        "owner": "0x7554EEd08160090c911180f9253091F07631D683",
        "subsidiaries": ["0xa8eacc80e138a30cd86002f12f5f324a3f2214b1fefc833435901ab6189579bb", "0x34dea2f4f739c43af35f6ffa82284d28280997ad26408b9e3d61525ec95b442e", "0xb5cd9c2be7774d1729e21d6534f9c0a0e9a40bd6c7259896cf55db9962ced5b4", "0x0b33e46b5cd994f8f9fc3142d67e7ca45a0011d520227a5f4696c09264547175", "0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d"],
        "orgidType": "legalEntity",
        "directory": "legalEntity",
        "director": "0x0000000000000000000000000000000000000000",
        "state": true,
        "directorConfirmed": false,
        "name": "Simard OÜ",
        "country": "EE",
        "proofsQty": 1,
        "isWebsiteProved": true,
        "isSslProved": false,
        "isSocialFBProved": false,
        "isSocialTWProved": false,
        "isSocialIGProved": false,
        "isSocialLNProved": false,
        "isJsonValid": true,
        "jsonContent": {
            "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
            "id": "did:orgid:0x07493f25bb5610951bd8b3b10fcd271abc69e45817d170d1dcb60076ee699b1a",
            "created": "2020-06-30T10:06:42.645Z",
            "updated": "2020-06-30T10:06:42.645Z",
            "publicKey": [],
            "service": [],
            "trust": {
                "assertions": [{"type": "dns", "claim": "simard.io", "proof": "TXT"}, {
                    "type": "domain",
                    "claim": "simard.io",
                    "proof": "https://simard.io/orgid.txt"
                }], "credentials": []
            },
            "legalEntity": {
                "legalName": "Simard OÜ",
                "alternativeName": "Simard",
                "legalIdentifier": "EE102233584",
                "identifiers": [{"type": "IATA", "value": "63320235"}],
                "legalType": "Limited Company",
                "registeredAddress": {
                    "country": "EE",
                    "subdivision": "EE-37",
                    "locality": "Tallinn",
                    "postalCode": "10115",
                    "streetAddress": "Tartu mnt",
                    "premise": "67/1-13b"
                },
                "locations": [],
                "contacts": []
            }
        },
        "orgJsonHash": "0xae078b1976d0b7414384ff8bb0af1d456e50eb3813b056bcf7dc6b25acfae476",
        "orgJsonUri": "https://raw.githubusercontent.com/windingtree/orgids/master/simard.json",
        "jsonCheckedAt": "2021-02-01T09:23:50.778Z",
        "jsonUpdatedAt": "2021-02-01T09:23:50.778Z"
    },
    "jsonContent": {
        "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
        "id": "did:orgid:0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d",
        "created": "2020-11-25T10:00:09.141Z",
        "organizationalUnit": {
            "name": "Rooms",
            "type": ["inventory management system", "property management system", "channel manager"],
            "description": "Rooms is a simple inventory management system for hotels"
        },
        "publicKey": [{
            "id": "did:orgid:0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d#key1",
            "type": "secp256k1",
            "controller": "did:orgid:0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d",
            "publicKeyPem": "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEhHBQqxREnomk83TtTBuhv92RnFRY0m99YHJZx0YnSbIC64czXp5bw2p/NTMmcoF3iDXah/62K7fd8jd71X2l/w==",
            "note": ""
        }],
        "service": [],
        "trust": {"assertions": []},
        "updated": "2020-11-25T10:01:20.411Z"
    },
    "orgid": "0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d",
    "owner": "0x7554EEd08160090c911180f9253091F07631D683",
    "orgidType": "organizationalUnit",
    "directory": "[\"inventory management system\",\"property management system\",\"channel manager\"]",
    "director": "0x7554EEd08160090c911180f9253091F07631D683",
    "state": true,
    "directorConfirmed": true,
    "name": "Rooms",
    "logo": null,
    "country": null,
    "proofsQty": 0,
    "isLifProved": false,
    "isWebsiteProved": false,
    "isSslProved": false,
    "isSocialFBProved": false,
    "isSocialTWProved": false,
    "isSocialIGProved": false,
    "isSocialLNProved": false,
    "isJsonValid": true,
    "orgJsonHash": "0x198707ec751cf63a4f4cec39d2550875334afb525f7b9aa9cdc87d834c30967d",
    "orgJsonUri": "https://api.marketplace.windingtree.com/uploads/0x7554eed08160090c911180f9253091f07631d683/did:orgid:0xd40bb7a98edbc6ccfe699c835b4160e7b0f070ba4c58b0de2ec1055a8d712a5d/0x198707ec751cf63a4f4cec39d2550875334afb525f7b9aa9cdc87d834c30967d.json",
    "jsonCheckedAt": "2021-02-01T09:23:50.000Z",
    "jsonUpdatedAt": "2021-02-01T09:23:50.000Z",
    "createdAt": "2020-11-25T11:11:55.000Z",
    "updatedAt": "2021-02-01T09:23:51.000Z"
}


export const ORGANISATIONS_SEARCH_RESULT = [{
    "subsidiaries": [],
    "parent": null,
    "orgid": "0x51ad6c12eebd6a5215e081c9975dbe151443c2baedffac487b27b22f1d3265d4",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "Hawaiian Style Rentals",
    "logo": "https://api.marketplace.windingtree.com/uploads/0x526edc481a36bbb7b7461cb18efed1aa5ae7b019/mediaType/did:orgid:0x51ad6c12eebd6a5215e081c9975dbe151443c2baedffac487b27b22f1d3265d4/female-logo1.jpg",
    "proofsQty": 0,
    "owner": "0x526EDc481A36BBb7B7461CB18EfEd1aa5ae7B019",
    "country": "US",
    "type": "orgid"
}, {
    "subsidiaries": [],
    "parent": {
        "orgid": "0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90",
        "owner": "0x7554EEd08160090c911180f9253091F07631D683",
        "subsidiaries": ["0x546ddd0909bd8317712f76703ff6408f53295c3797168364dbc0e4ab75c0a1e1"],
        "orgidType": "legalEntity",
        "directory": "legalEntity",
        "director": "0x0000000000000000000000000000000000000000",
        "state": true,
        "directorConfirmed": false,
        "name": "NORDIC CHOICE HOSPITALITY GROUP AS",
        "logo": "https://marketplace.windingtree.com/uploads/0x7554eed08160090c911180f9253091f07631d683/mediaType/did:orgid:0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90/nordic-choice-hotels.png",
        "country": "NO",
        "proofsQty": 0,
        "isWebsiteProved": false,
        "isSslProved": false,
        "isSocialFBProved": false,
        "isSocialTWProved": false,
        "isSocialIGProved": false,
        "isSocialLNProved": false,
        "isJsonValid": true,
        "jsonContent": {
            "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
            "id": "did:orgid:0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90",
            "created": "2020-07-01T17:26:48.952Z",
            "legalEntity": {
                "contacts": [{"website": "https://www.nordicchoicehotels.no"}],
                "locations": [],
                "legalType": "Limited Company",
                "legalName": "NORDIC CHOICE HOSPITALITY GROUP AS",
                "legalIdentifier": "990 465 339",
                "registeredAddress": {
                    "country": "NO",
                    "subdivision": "Oslo",
                    "locality": "Oslo",
                    "streetAddress": "Fredrik Stangs gate 22-24",
                    "postalCode": "0264"
                }
            },
            "publicKey": [{
                "id": "0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90#generic",
                "type": "secp256k1",
                "controller": "did:orgid:0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90",
                "publicKeyPem": "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEf6vYEi3VKzMZYqqj2SWeQX0jzaDfw1wqaZlQieN4Ve709GXDZ20KqED3Ngn6XgalKATAQIYjCQxwWN/gcNckDg==",
                "note": "Max"
            }],
            "service": [],
            "trust": {"assertions": []},
            "updated": "2020-07-01T17:29:10.347Z",
            "media": {"logo": "https://marketplace.windingtree.com/uploads/0x7554eed08160090c911180f9253091f07631d683/mediaType/did:orgid:0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90/nordic-choice-hotels.png"}
        },
        "orgJsonHash": "0x9a8ac462468fb40034d39152fd2f81d5d3af0a89123a3c3aecb5ef49f2109b94",
        "orgJsonUri": "https://api.marketplace.windingtree.com/uploads/0x7554eed08160090c911180f9253091f07631d683/did:orgid:0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90/0x9a8ac462468fb40034d39152fd2f81d5d3af0a89123a3c3aecb5ef49f2109b94.json",
        "jsonCheckedAt": "2020-07-07T17:58:06.164Z",
        "jsonUpdatedAt": "2020-07-07T17:58:06.164Z"
    },
    "orgid": "0x546ddd0909bd8317712f76703ff6408f53295c3797168364dbc0e4ab75c0a1e1",
    "state": true,
    "orgidType": "organizationalUnit",
    "directory": "hotel",
    "name": "Hobo Hotel",
    "logo": "https://api.marketplace.windingtree.com/uploads/0x7554eed08160090c911180f9253091f07631d683/mediaType/did:orgid:0x546ddd0909bd8317712f76703ff6408f53295c3797168364dbc0e4ab75c0a1e1/hobo.jpg",
    "proofsQty": 0,
    "owner": "0x7554EEd08160090c911180f9253091F07631D683",
    "country": "SE",
    "type": "orgid"
}, {
    "subsidiaries": [],
    "parent": null,
    "orgid": "0x588c8be0208ce336d58c089423824954807ee481956fd2c9ebe97cf340363043",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "Rotaradar Internet Hiz ve Tur LTD STI",
    "logo": "https://api.marketplace.windingtree.com/uploads/0x3b0a225d0a1ca053a9656f4a0364a3dc2d828dc5/mediaType/did:orgid:0x588c8be0208ce336d58c089423824954807ee481956fd2c9ebe97cf340363043/logo.jpg",
    "proofsQty": 1,
    "owner": "0x3B0a225d0a1CA053a9656f4A0364a3DC2D828dC5",
    "country": "TR",
    "type": "orgid"
}, {
    "subsidiaries": ["0xd9c0ec29ddb45d89fdd50097991da63a55bb3d33124b5dbe2ed714bc83eb4d59"],
    "parent": null,
    "orgid": "0x5ab81bff37204c1f1a2239fad031b225f8c3b135ef56dc60b25ec95fcc4dfb35",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "MudMaps Pty Limited",
    "logo": null,
    "proofsQty": 0,
    "owner": "0x56d687C55c1Ef00b38396F369dF2fdd17Ee9D7E2",
    "country": "AU",
    "type": "orgid"
}, {
    "subsidiaries": [],
    "parent": null,
    "orgid": "0x69df17dd625f36ec1fe8ca1b2f035f7467bed058076957c6a13c6568dae13079",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "Travel Tech Consulting, Inc.",
    "logo": "https://api.marketplace.windingtree.com/uploads/0xda92fd28ec56f447df51bd2f24e5b4a910af9363/mediaType/did:orgid:0x69df17dd625f36ec1fe8ca1b2f035f7467bed058076957c6a13c6568dae13079/logo7_TTCI FINAL.reduced.jpg",
    "proofsQty": 0,
    "owner": "0xDa92FD28EC56f447DF51Bd2F24e5B4A910af9363",
    "country": "US",
    "type": "orgid"
}, {
    "subsidiaries": [],
    "parent": null,
    "orgid": "0x76c361144cccaa113788f0c79c3517880d05d0c5e3a8dfd9a68fc32029ba5f6c",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "Thrink Ltd",
    "logo": "https://api.marketplace.windingtree.com/uploads/0x2eddc20e9ca62508a944f62c6e4a7c70e9c03203/mediaType/did:orgid:0x76c361144cccaa113788f0c79c3517880d05d0c5e3a8dfd9a68fc32029ba5f6c/thrinking man v3 coloured transparent-01.png",
    "proofsQty": 0,
    "owner": "0x2eddC20e9CA62508a944F62C6E4a7c70e9c03203",
    "country": "UK",
    "type": "orgid"
}, {
    "subsidiaries": ["0x546ddd0909bd8317712f76703ff6408f53295c3797168364dbc0e4ab75c0a1e1"],
    "parent": null,
    "orgid": "0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "NORDIC CHOICE HOSPITALITY GROUP AS",
    "logo": "https://marketplace.windingtree.com/uploads/0x7554eed08160090c911180f9253091f07631d683/mediaType/did:orgid:0x78d45a09df150d978bb0bfeef7aebe144ef258c2b1e660fa635bb77857a3ec90/nordic-choice-hotels.png",
    "proofsQty": 0,
    "owner": "0x7554EEd08160090c911180f9253091F07631D683",
    "country": "NO",
    "type": "orgid"
}, {
    "subsidiaries": ["0xac1627e6d683ef86cfe787f33ae8a8dc2b13f51e8eff67a1def77cf6593921cb"],
    "parent": null,
    "orgid": "0x7e53a949aa7710b376b45b1d63f2a73e7b044ab3f7358c1c893d14c659403b71",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "Own Hotel Management",
    "logo": "https://api.marketplace.windingtree.com/uploads/0x61432301c58784f8da8a8d3e823a7e421c7dadf1/mediaType/did:orgid:0x7e53a949aa7710b376b45b1d63f2a73e7b044ab3f7358c1c893d14c659403b71/logo.png",
    "proofsQty": 0,
    "owner": "0x61432301c58784F8DA8A8D3e823a7e421C7DADf1",
    "country": "UY",
    "type": "orgid"
}, {
    "subsidiaries": [],
    "parent": null,
    "orgid": "0x8d3417c9246ead3764286edd294b48c38e9958db1675e13a975fb20cd434420d",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "Kishan & Thakur Corp",
    "logo": null,
    "proofsQty": 0,
    "owner": "0xb457f08B38c684736325BCEdd23D69CAD06af169",
    "country": "US",
    "type": "orgid"
}, {
    "subsidiaries": [],
    "parent": null,
    "orgid": "0x94798f7815f2a6a53410f333c696e7b2a8c4dabc07d1c59ef2be312fe9513d06",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "unknown",
    "name": "ReBlonde",
    "logo": "https://api.marketplace.windingtree.com/uploads/0x6f5def90345cf747fe4405f8ba168de5a4d794e4/mediaType/did:orgid:0x94798f7815f2a6a53410f333c696e7b2a8c4dabc07d1c59ef2be312fe9513d06/rw1znrllq.png",
    "proofsQty": 0,
    "owner": "0x6F5dEf90345Cf747Fe4405F8bA168De5A4D794E4",
    "country": "IL",
    "type": "orgid"
}, {
    "subsidiaries": ["0xe56fae66fec4c842b443101afd4cba21a9d737f9f40e92b2254c44e3a04da5bd"],
    "parent": null,
    "orgid": "0x95e8b2796e4615e34d2a01f4d48c2c9cdeab99a248b6c007848a67a48eb63643",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "Ansero, Inc.",
    "logo": "https://api.marketplace.windingtree.com/uploads/0x008d04c54469018da69a18eca01898bb443d1e61/mediaType/did:orgid:0x95e8b2796e4615e34d2a01f4d48c2c9cdeab99a248b6c007848a67a48eb63643/shr-compact-logo-tagline.png",
    "proofsQty": 2,
    "owner": "0x008d04c54469018Da69a18EcA01898bb443D1E61",
    "country": "US",
    "type": "orgid"
}, {
    "subsidiaries": [],
    "parent": null,
    "orgid": "0x9c67ca326a26d2c5ca3f059f77ac2212ea1682c60ce0fb4ec3a7e4dabc5a7b80",
    "state": true,
    "orgidType": "legalEntity",
    "directory": "legalEntity",
    "name": "Airport Hotel Basel",
    "logo": "https://api.marketplace.windingtree.com/uploads/0xb99b40fdc9ca9fcf7e2bbaae8d0f2c833e33af47/mediaType/did:orgid:0x9c67ca326a26d2c5ca3f059f77ac2212ea1682c60ce0fb4ec3a7e4dabc5a7b80/logo hotel basel noch kleiner.jpg",
    "proofsQty": 1,
    "owner": "0xB99B40FDc9ca9Fcf7e2bBAaE8d0F2c833e33Af47",
    "country": "CH",
    "type": "orgid"
}]


export const SAMPLE_OGRANIZATION_TRIPS_COMMUNITY = {
        "type": "orgid",
        "subsidiaries": [],
        "parent": null,
        "jsonContent": {
            "@context": ["https://www.w3.org/ns/did/v1", "https://windingtree.com/ns/orgid/v1"],
            "id": "did:orgid:0x19967b48b54540081e17c8d3018d04cdadae8db09fdfb8758bb67967ce764d26",
            "created": "2020-11-27T11:27:55.694Z",
            "legalEntity": {
                "contacts": [{
                    "email": "info@tripscommunity.com",
                    "website": "https://tripscommunity.com/",
                    "facebook": "https://www.facebook.com/TripsCommunity/",
                    "twitter": "https://twitter.com/tripscommunity",
                    "instagram": "https://www.instagram.com/trips_community/"
                }],
                "locations": [],
                "legalType": "Corporation",
                "legalName": "Trips Community OÜ",
                "legalIdentifier": "11761802",
                "registeredAddress": {
                    "subdivision": "Harju maakond",
                    "locality": "Tallinn",
                    "streetAddress": "Pärnu mnt 158",
                    "postalCode": "11317",
                    "country": "EE"
                }
            },
            "publicKey": [],
            "service": [],
            "trust": {
                "assertions": [{
                    "type": "domain",
                    "claim": "tripscommunity.com",
                    "proof": "https://tripscommunity.com/0x19967b48b54540081e17c8d3018d04cdadae8db09fdfb8758bb67967ce764d26.txt"
                }, {
                    "type": "social",
                    "claim": "facebook.com/TripsCommunity",
                    "proof": "https://www.facebook.com/TripsCommunity/posts/2683036045290531"
                }, {
                    "type": "social",
                    "claim": "linkedin.com/posts",
                    "proof": "https://www.linkedin.com/posts/luca-de-giglio_winding-tree-marketplace-account-0x19967b48b54540081e17c8d3018d04cdadae8db09fdfb8758bb67967ce764d26-activity-6738055229004136448-XYW3"
                }]
            },
            "updated": "2020-11-27T11:29:48.446Z",
            "media": {"logo": "https://api.marketplace.windingtree.com/uploads/0x36666e1fdc526f6df4638491f087e907a542bcdf/mediaType/did:orgid:0x19967b48b54540081e17c8d3018d04cdadae8db09fdfb8758bb67967ce764d26/w0c0opwjh.png"}
        },
        "orgid": "0x19967b48b54540081e17c8d3018d04cdadae8db09fdfb8758bb67967ce764d26",
        "owner": "0x36666e1fdC526f6df4638491F087e907A542BCdf",
        "orgidType": "legalEntity",
        "directory": "legalEntity",
        "director": "0x0000000000000000000000000000000000000000",
        "state": true,
        "directorConfirmed": false,
        "name": "Trips Community OÜ",
        "logo": "https://api.marketplace.windingtree.com/uploads/0x36666e1fdc526f6df4638491f087e907a542bcdf/mediaType/did:orgid:0x19967b48b54540081e17c8d3018d04cdadae8db09fdfb8758bb67967ce764d26/w0c0opwjh.png",
        "country": "EE",
        "proofsQty": 1,
        "isLifProved": false,
        "isWebsiteProved": true,
        "isSslProved": false,
        "isSocialFBProved": false,
        "isSocialTWProved": false,
        "isSocialIGProved": false,
        "isSocialLNProved": false,
        "isJsonValid": true,
        "orgJsonHash": "0xc198f83f6625d319f669ceed268024800812b94dbeea8a330116bd95bed09b8a",
        "orgJsonUri": "https://api.marketplace.windingtree.com/uploads/0x36666e1fdc526f6df4638491f087e907a542bcdf/did:orgid:0x19967b48b54540081e17c8d3018d04cdadae8db09fdfb8758bb67967ce764d26/0xc198f83f6625d319f669ceed268024800812b94dbeea8a330116bd95bed09b8a.json",
        "jsonCheckedAt": "2020-11-27T17:58:15.000Z",
        "jsonUpdatedAt": "2020-11-27T17:58:15.000Z",
        "createdAt": "2020-11-27T11:30:30.000Z",
        "updatedAt": "2020-11-27T17:58:15.000Z"
}