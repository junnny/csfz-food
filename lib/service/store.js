var storeDao = require('../dao/store');
var Constants = require('../utils/constants');
var _ = require('underscore');

module.exports = {
    addStore: function (params, callback) {
        storeDao.createStore(params, callback);
    },
    queryStoreList: function () {
        return new Promise(function (resolve, reject) {
            storeDao.findStoreList(function (err, data) {
                err ? reject(err) : resolve(data);
            });
        });

    },
    queryStore: function (params, callback) {
        storeDao.findStore(params, callback);
    },
    queryStoreById: function (params) {
        return new Promise(function (resolve, reject) {
            storeDao.findStoreById(params, function (err, data) {
                err ? reject(err) : resolve(data);
            });
        });

    },
    updateStore: function (condition, params) {
        return new Promise(function (resolve, reject) {
            _.extend(params, {updateTime: new Date()});
            storeDao.updateStore(condition, params, function (err, data) {
                err ? reject(err) : resolve(data);
            });
        });
    },
    deleteStore: function (condition, callback) {
        return new Promise(function (resolve, reject) {
            storeDao.deleteStore(condition, function (err, data) {
                err ? reject(err) : resolve(data);
            });
        });
    },
    checkStore: function (params) {
        var errors = [];
        var self = this;
        return new Promise(function (resolve, reject) {

            self.queryStore({name: params.name}, function (err, store) {
                if (err) reject(err);
                if (store) {
                    errors.push('店铺名称已存在');
                    resolve(errors);
                } else {

                    if (!params.name || params.name.length === 0) {
                        errors.push('请输入店铺名称');
                    } else if (params.name.length > 20) {
                        errors.push('店铺名称过长');
                    }

                    if (!params.mainProduct || params.mainProduct.length === 0) {
                        errors.push('请输入主营产品');
                    } else if (params.mainProduct.length > 20) {
                        errors.push('主营产品过长');
                    }

                    if (!params.telephone || params.telephone.length === 0) {
                        errors.push('请输入联系电话');
                    } else if (!Constants.regexp.TELEPHONE.test(params.telephone)) {
                        errors.push('联系电话格式错误');
                    }

                    if (!params.address || params.address.email === 0) {
                        errors.push('请输入店铺地址');
                    } else if (params.address.length > 20) {
                        errors.push('店铺地址过长');
                    }

                    resolve(errors);
                }
            });

        });
    },
    checkUpdateStore: function (params) {
        var errors = [];
        var self = this;
        return new Promise(function (resolve, reject) {

            self.queryStore({name: params.name, _id: {$ne: params.id}}, function (err, store) {
                if (err) reject(err);
                if (store) {
                    errors.push('店铺名称已存在');
                    resolve(errors);
                } else {

                    if (!params.name || params.name.length === 0) {
                        errors.push('请输入店铺名称');
                    } else if (params.name.length > 20) {
                        errors.push('店铺名称过长');
                    }

                    if (!params.mainProduct || params.mainProduct.length === 0) {
                        errors.push('请输入主营产品');
                    } else if (params.mainProduct.length > 20) {
                        errors.push('主营产品过长');
                    }

                    if (!params.telephone || params.telephone.length === 0) {
                        errors.push('请输入联系电话');
                    } else if (!Constants.regexp.TELEPHONE.test(params.telephone)) {
                        errors.push('联系电话格式错误');
                    }

                    if (!params.address || params.address.email === 0) {
                        errors.push('请输入店铺地址');
                    } else if (params.address.length > 20) {
                        errors.push('店铺地址过长');
                    }

                    resolve(errors);
                }
            });

        });
    }
};
