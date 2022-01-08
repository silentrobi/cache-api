const express = require('express');
const controllerCache = require('../controllers/controllerCache');
const router = express.Router();

/**
 * Returns cache data with given key
 */
router.get(`cache/:key`, controllerCache.getOne);

/**
 * Returns all cache keys
 */
router.get(`cache/keys`, controllerCache.getKeys);

/**
 * Creates a cache with given key or updates existing one
 */
router.post(`cache/:key`, controllerCache.upsert);

/**
 * Removes a cache data with given key
 */
router.delete(`cache/:key`, controllerCache.deleteOne);

/**
 * Removes all keys
 */
router.delete(`cache/keys`, controllerCache.deleteAll);

module.exports = router;
