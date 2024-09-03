import { Duck } from './duck';
import { FlyNoWay } from './fly-no-way';
import { Quack } from './quack';

export class ModelDuck extends Duck {
  constructor(f = new FlyNoWay(), q = new Quack()) {
    super(f, q);
  }

  public display = () => {
    console.log('I am a model duck.');
  };
}
