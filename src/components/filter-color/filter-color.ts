import Component from '@/common/component';
import El from '@/common/tag';
import Filter from '@/models/filter';
import Toy from '@/models/toy';
import cls from './card.module.scss';

class FilterColor extends Component {
  constructor(root: HTMLElement) {
    super(root);
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
