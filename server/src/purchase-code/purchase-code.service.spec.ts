import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseCodeService } from './purchase-code.service';

describe('PurchaseCodeService', () => {
  let service: PurchaseCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseCodeService],
    }).compile();

    service = module.get<PurchaseCodeService>(PurchaseCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
