import { FlyBehavior } from './fly-behavior';

export class FlyRocketPowered implements FlyBehavior {
  public fly = () => {
    console.log('I am flying with a rocket!');
  };
}
