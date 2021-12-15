import El from '@/common/el';
import Filter from '@/models/filter';
import Toy from '@/models/toy';
import cls from './card.module.scss';

class FilterColor {
  constructor(root) {
    this.root = root;
  }

  register() {
    // console.log('card++++', this.el)
    
    const btn = El.create('button');
    btn.textContent = 'dfdfdf'
    this.root.append(btn)

    btn.addEventListener('click', e => {
      Toy.filter.setColors('444')
      
      console.log(Toy.filter)
    })
  }
}

export default FilterColor;
