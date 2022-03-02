import { Router } from "express"
import { CustomerGroup } from "../../../.."
import { DeleteResponse, PaginatedResponse } from "../../../../types/common"
import middlewares from "../../../middlewares"

const route = Router()

export default (app) => {
  app.use("/customer-groups", route)

  route.get("/", middlewares.wrap(require("./list-customer-groups").default))
  route.get("/:id", middlewares.wrap(require("./get-customer-group").default))
  route.post("/", middlewares.wrap(require("./create-customer-group").default))
  route.post(
    "/:id/customers/batch",
    middlewares.wrap(require("./add-customers-batch").default)
  )
  route.delete(
    "/:id/customers/batch",
    middlewares.wrap(require("./delete-customers-batch").default)
  )

  route.delete(
    "/:id",
    middlewares.wrap(require("./delete-customer-group").default)
  )
  route.post(
    "/:id",
    middlewares.wrap(require("./update-customer-group").default)
  )

  return app
}

/* ************************************** */
/* ******** EXPORT API CLIENT TYPES ***** */
/* ************************************** */

export type AdminCustomerGroupsRes = {
  customer_group: CustomerGroup
}

export type AdminCustomerGroupsDeleteRes = DeleteResponse

export type AdminCustomerGroupsListRes = PaginatedResponse & {
  customer_groups: CustomerGroup[]
}

export const defaultAdminCustomerGroupsRelations = []

export { AdminPostCustomerGroupsGroupCustomersBatchReq } from "./add-customers-batch"
export { AdminPostCustomerGroupsReq } from "./create-customer-group"
export { AdminDeleteCustomerGroupsGroupCustomerBatchReq } from "./delete-customers-batch"
export { AdminGetCustomerGroupsGroupParams } from "./get-customer-group"
export { AdminGetCustomerGroupsParams } from "./list-customer-groups"
export { AdminPostCustomerGroupsGroupReq } from "./update-customer-group"
