import { RegulationController } from './regulation';
import { EnactmentController } from './enactment';
import { RegulationClassController } from './regulationClass';
import { StateController } from './state';
import { DistrictController } from './district';

export const CONTROLLERS = [
    new RegulationController(),
    new EnactmentController(),
    new RegulationClassController(),
    new StateController(),
    new DistrictController()
];