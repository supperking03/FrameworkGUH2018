const Realm = require('realm');

// Define your models and their properties

const stackNavigate =
    {
        path: 'stackRealm.realm',
        schema: [{
            name: 'stack',
            properties:
                {
                    screens: 'string?',
                    props: 'string?',
                }
        }]
    };

const loginInfo = {
    path: 'loginRealm.realm',
    schema:
        [{
            name: 'loginInfo',
            properties: {
                userId: 'double',
                accessToken: 'string?',
            }
        }]
};

const profile = {
    path: 'profileRealm.realm',
    schema: [
        {
            name: 'profile',
            properties:
                {
                    profile: 'string?'
                }
        }],
};

const screenState = {
    path: 'stackRealm.realm',
    schema: [{
        name: 'state',
        properties:
            {
                state: 'string?',
            }
    }]
};

const listModel = [stackNavigate, loginInfo, profile, screenState];

export {
    Realm,
    loginInfo,
    profile,
    stackNavigate,
    listModel,
}