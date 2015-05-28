var historyModel = require('../model/history');

module.exports = {
    createHistory: function (params, callback) {
        new historyModel(params).save(callback);
    },
    findHistoryList: function (callback) {
        historyModel.find()
            .sort({'addTime': 'desc'})
            .exec(callback);
    },
    deleteHistory: function (condition, callback) {
        historyModel.remove(condition, callback);
    }
};