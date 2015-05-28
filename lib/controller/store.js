var _ = require('underscore'),
    app = require('../../config.json').app;

var storeService = require('../service/store');
var foodService = require('../service/food');

module.exports = {
    mapping: '/store',
    get: {
        /**
         * 店铺列表页面
         */
        '/': function (req, res) {
            storeService.queryStoreList()
                .then(function (stores) {
                    res.render('store/index', {
                        stores: stores
                    });
                });
        },
        /**
         * 店铺页面详情
         */
        '/:storeId': function (req, res) {
            storeService.queryStoreById(req.params.storeId)
                .then(function (store) {
                    res.put({store: store});

                    return foodService.queryFoodByStore({store: req.params.storeId});
                })
                .then(function (foods) {
                    res.put({foods: foods});
                    res.render('store/detail');
                });
        }
    }
};