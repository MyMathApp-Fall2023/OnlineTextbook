import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseCodeDto } from './create-purchase-code.dto';

export class UpdatePurchaseCodeDto extends PartialType(CreatePurchaseCodeDto) {}
