import { IsString } from "class-validator"
import { ValidateNested } from "class-validator"
import { IsType } from "../utils/validators/is-type"

import { StringComparisonOperator } from "./common"

export class CustomerGroupsBatchCustomer {
  @IsString()
  id: string
}
export class FilterableCustomerGroupProps {
  @ValidateNested()
  @IsType([String, [String], StringComparisonOperator])
  id?: string | string[] | StringComparisonOperator
}

export class CustomerGroupUpdate {
  name?: string
  metadata?: object
}
