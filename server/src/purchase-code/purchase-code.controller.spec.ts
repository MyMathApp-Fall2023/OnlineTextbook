import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseCodeController } from './purchase-code.controller';
import { PurchaseCodeService } from './purchase-code.service';

describe('PurchaseCodeController', () => {
  let controller: PurchaseCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseCodeController],
      providers: [PurchaseCodeService],
    }).compile();

    controller = module.get<PurchaseCodeController>(PurchaseCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
