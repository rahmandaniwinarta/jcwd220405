const router = require("express").Router();
const { admin } = require("../../controllers/index");
const { userComp } = admin;

router.get("/admin/all_user", userComp.allUser);
router.get("/admin/sort_user", userComp.filterUser);
router.get("/admin/warehouse_admin", userComp.WarehouseAdmin);
router.patch("/admin/edit_user/:id", userComp.editUser);
router.delete("/admin/delete_user/:id", userComp.deleteUser);

module.exports = router;