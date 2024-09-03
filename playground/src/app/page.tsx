import ImageSlider from '@/components/ImageSlider';
import { FlyRocketPowered } from '@/head-first-design-patterns/chapter-01/fly-rocket-powered';
import { MallardDuck } from '@/head-first-design-patterns/chapter-01/mallard-duck';
import { ModelDuck } from '@/head-first-design-patterns/chapter-01/model-duck';

const mallard = new MallardDuck();
mallard.performFly();
mallard.performQuack();

const model = new ModelDuck();
model.performFly();
model.setFlyBehavior(new FlyRocketPowered());
model.performFly();

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ImageSlider />
    </main>
  );
}
