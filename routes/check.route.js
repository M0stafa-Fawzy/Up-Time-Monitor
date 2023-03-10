const router = require('express').Router()
const { isAuthenticated, isVerified } = require("../middlewares/auth")
const {
    createCheck,
    deleteCheck,
    updateCheck,
    getCheck,
    getChecksGroupedByTagName
} = require("../controllers/check.controller")

router.use([isAuthenticated, isVerified])
router.route('/').post(createCheck)
router.get('/grouped', getChecksGroupedByTagName)
router.route('/:checkID',).put(updateCheck).delete(deleteCheck).get(getCheck)

module.exports = router