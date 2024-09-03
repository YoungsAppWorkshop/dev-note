import { Duck } from './duck';
import { FlyWithWings } from './fly-with-wings';
import { Quack } from './quack';

export class MallardDuck extends Duck {
  constructor(f = new FlyWithWings(), q = new Quack()) {
    super(f, q);
  }

  public display = () => {
    console.log('I am a real Mallard duck.');
  };
}
