const express = require("express");
const router = express.Router();
const upload = require("../../../../middleware/imgCrudOperation/multerMiddleware");
const {
  createDocument,
  updateDocumentWithImg,
  getAllDocuments,
  getAllModelsWithImg,
  deleteSpecificDocumentWithImg,
  deleteWholeModelWithImg,
  getAllModelsWithData,
  createCollectionNameAndFieldsWithImg,
  addFieldsToExistingModelWithImg,
} = require("../../../../controller/features/crud/withImage/crudWithImgContoller");
const checkApiActive = require("../../../../middleware/forAdminGiveAccessApiForCrud/apiUseAcessMiddleware");
const isAuth = require("../../../../middleware/forUserMiddleware/isAuth");

//router
router.post(
  "/create-collection-name-img",
  isAuth,
  createCollectionNameAndFieldsWithImg
);
router.put(
  "/add-fields-to-model-img",
  isAuth,
  addFieldsToExistingModelWithImg
);
router.post(
  "/:uuid/crud-with-image-create-model",
  checkApiActive,
  upload.array("images", 10),
  createDocument
);
router.put(
  "/:uuid/crud-with-image-update",
  checkApiActive,
  upload.single("file"),
  updateDocumentWithImg
);
router.delete(
  "/:uuid/crud-with-image-delete",
  checkApiActive,
  deleteSpecificDocumentWithImg
);
router.delete(
  "/:uuid/crud-with-image-whole-modeldelete",
  checkApiActive,
  deleteWholeModelWithImg
);
router.get(
  "/:uuid/crud-with-image-get-all-fields",
  checkApiActive,
  getAllDocuments
);
router.get(
  "/:uuid/crud-with-image-get-all-model",
  checkApiActive,
  getAllModelsWithImg
);
router.get(
  "/:uuid/crud-with-image-get-all-model-with-data",
  checkApiActive,
  getAllModelsWithData
);

module.exports = router;
