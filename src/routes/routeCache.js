const express = require('express');
const controllerCache = require('../controllers/controllerCache');
const validatorCache = require('../validators/validatorCache');
const router = express.Router();

/**
 * Returns cache data with given key
 */
router.get(`/:key`, controllerCache.getOne);

/**
 * Returns all cache keys
 */
router.get(`/`, controllerCache.getKeys);

/**
 * Creates a cache with given key or updates existing one
 */
router.post(`/`, validatorCache.validateUpsert, controllerCache.upsert);

/**
 * Removes a cache data with given key
 */
router.delete(`/:key`, controllerCache.deleteOne);

/**
 * Removes all keys
 */
router.delete(`/`, controllerCache.deleteAll);

module.exports = router;
