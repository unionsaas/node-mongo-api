require('../index')({
    server: {
        port: 10508,
        public:'../public'
    },
    mongo: {
        url: 'mongodb://unionlive:unionlive@211.152.57.29:39017/unionlive?authSource=admin&authMechanism=SCRAM-SHA-1'
        //url: 'mongodb://127.0.0.1:27017/test'
    }
})
