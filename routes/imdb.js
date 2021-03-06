var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/images' })

// Controller modules
var tvshow_controller = require('../controllers/tvshowController');
var genre_controller = require('../controllers/genreController');
var network_controller = require('../controllers/networkController');

// TV show Routes

router.get('/', tvshow_controller.index);
router.get('/tvshows', tvshow_controller.tvshow_list);
router.get('/tvshow/create', tvshow_controller.tvshow_create_get);
router.post('/tvshow/create', upload.single('image'), tvshow_controller.tvshow_create_post);
router.get('/tvshow/:id', tvshow_controller.tvshow_detail);
router.get('/tvshow/:id/updateAuth', tvshow_controller.tvshow_update_get_auth);
router.post('/tvshow/:id/updateAuth', upload.single('image'), tvshow_controller.tvshow_update_post_auth);
router.get('/tvshow/:id/update', tvshow_controller.tvshow_update_get);
router.post('/tvshow/:id/update', upload.single('image'), tvshow_controller.tvshow_update_post);
router.get('/tvshow/:id/deleteAuth', tvshow_controller.tvshow_delete_get_auth);
router.post('/tvshow/:id/deleteAuth', tvshow_controller.tvshow_delete_post_auth);
router.get('/tvshow/:id/delete', tvshow_controller.tvshow_delete_get);
router.post('/tvshow/:id/delete', tvshow_controller.tvshow_delete_post);

// Genre Routes

router.get('/genres', genre_controller.genre_list);
router.get('/genre/create', genre_controller.genre_create_get);
router.post('/genre/create', genre_controller.genre_create_post);
router.get('/genre/:id', genre_controller.genre_detail);
router.get('/genre/:id/updateAuth', genre_controller.genre_update_get_auth);
router.post('/genre/:id/updateAuth', genre_controller.genre_update_post_auth);
router.get('/genre/:id/update', genre_controller.genre_update_get);
router.post('/genre/:id/update', genre_controller.genre_update_post);
router.get('/genre/:id/deleteAuth', genre_controller.genre_delete_get_auth);
router.post('/genre/:id/deleteAuth', genre_controller.genre_delete_post_auth);
router.get('/genre/:id/delete', genre_controller.genre_delete_get);
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// Network Routes

router.get('/networks', network_controller.network_list);
router.get('/network/create', network_controller.network_create_get);
router.post('/network/create', network_controller.network_create_post);
router.get('/network/:id', network_controller.network_detail);
router.get('/network/:id/updateAuth', network_controller.network_update_get_auth);
router.post('/network/:id/updateAuth', network_controller.network_update_post_auth);
router.get('/network/:id/update', network_controller.network_update_get);
router.post('/network/:id/update', network_controller.network_update_post);
router.get('/network/:id/deleteAuth', network_controller.network_delete_get_auth);
router.post('/network/:id/deleteAuth', network_controller.network_delete_post_auth);
router.get('/network/:id/delete', network_controller.network_delete_get);
router.post('/network/:id/delete', network_controller.network_delete_post);

module.exports = router;