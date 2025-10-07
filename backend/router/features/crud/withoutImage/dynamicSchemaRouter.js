// const express = require("express");

// const checkApiActive = require("../../../../middleware/forAdminGiveAccessApi/apiUseAcessMiddleware");
// const isAuth = require("../../../../middleware/forUserMiddleware/isAuth");
// const {
//   createDocument,
//   updateDocument,
//   deleteDocument,
//   getAllModels,
//   getAllDocuments,
// } = require("../../../../controller/features/crud/withoutImage/dynamicSchemaController");
// const router = express.Router();

// router.post("/:uuid/crud-creation", checkApiActive, isAuth, createDocument);
// router.post(
//   "/:uuid/crud-get-data-of-model",
//   checkApiActive,
//   isAuth,
//   getAllDocuments
// );
// router.put("/:uuid/crud-update", checkApiActive, isAuth, updateDocument);
// router.delete("/:uuid/crud-delete", checkApiActive, isAuth, deleteDocument);
// router.get("/:uuid/crud-get-all-models", checkApiActive, isAuth, getAllModels);

// module.exports = router;

const express = require("express");
const router = express.Router();

const checkApiActive = require("../../../../middleware/forAdminGiveAccessApiForCrud/apiUseAcessMiddleware");
const {
  createDocument,
  updateDocument,
  getAllModels,
  getAllDocuments,
  deleteSpecificDocumentFromModel,
  deleteWholeModel,
  getAllModelsWithData,
  createCollectionNameAndFields,
  addFieldsToExistingModel,
} = require("../../../../controller/features/crud/withoutImage/dynamicSchemaController");
const isAuth = require("../../../../middleware/forUserMiddleware/isAuth");

// CRUD APIs — now secured using apiKey + token middleware
router.post("/create-collection-name", isAuth, createCollectionNameAndFields);
router.put("/add-fields-to-model", isAuth, addFieldsToExistingModel);

router.post("/:uuid/crud-creation", checkApiActive, createDocument);
router.get("/:uuid/crud-get-data-of-model", checkApiActive, getAllDocuments);
router.put("/:uuid/crud-update", checkApiActive, updateDocument);
router.delete(
  "/:uuid/crud-delete",
  checkApiActive,
  deleteSpecificDocumentFromModel
);
router.delete(
  "/:uuid/crud-delete-wholemodel",
  checkApiActive,
  deleteWholeModel
);
router.get("/:uuid/crud-get-all-models", checkApiActive, getAllModels);
router.get(
  "/:uuid/crud-get-all-models-with-data",
  checkApiActive,
  getAllModelsWithData
);

module.exports = router;
