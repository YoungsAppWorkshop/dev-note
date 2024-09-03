import { QuackBehavior } from './quack-behavior';

export class Quack implements QuackBehavior {
  public quack = () => {
    console.log('Quack!!');
  };
}
