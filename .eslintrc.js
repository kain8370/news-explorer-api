module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "rules": {
      "no-underscore-dangle":  ["error", { "allow": ["_id"] }],
      "no-console": 0,
      "linebreak-style": 0
    },
   "extends": "airbnb-base"
};