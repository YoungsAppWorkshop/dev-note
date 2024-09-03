import { FlyBehavior } from './fly-behavior';

export class FlyWithWings implements FlyBehavior {
  public fly = () => {
    console.log('I am flying!!');
  };
}
