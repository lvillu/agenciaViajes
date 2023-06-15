const env = process.env.NODE_ENV || 'localhost';

const localhost = {
    app: {
        port: 3000
    },
    db: {
        uri: 'mongodb://localhost/travelagency'
    }
};



const config = {
    localhost
};

module.exports = config[env];
