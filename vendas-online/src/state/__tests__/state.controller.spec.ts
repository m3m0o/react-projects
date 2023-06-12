import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from '../state.controller';

import { StateService } from '../state.service';

import { statesMock } from '../__mocks__/states.mock';

describe('StateController', () => {
  let controller: StateController;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            getAllStates: jest.fn().mockResolvedValue(statesMock),
          },
        },
      ],
      controllers: [StateController],
    }).compile();

    controller = module.get<StateController>(StateController);
    stateService = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(stateService).toBeDefined();
  });

  // getAllStates
  it('should return StateEntity[] in getAllStates', async () => {
    const states = await controller.getAllStates();

    expect(states).toEqual(statesMock);
  });
});
