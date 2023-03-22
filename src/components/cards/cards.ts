import { Component } from '@/common/component';
import { Tag } from '@/common/tag';
import { EventEmitter } from '@/common/event-emitter';
import { Toy } from '@/models/toy';
import { Tags } from '@/types/enums';
import { Card } from '../card/card';
import { LS } from '@/common/local-storage';
import { lng } from '@/language/lng';
import cls from './cards.module.scss';

class Cards extends Component {
  static toyList = Tag.create(Tags.div, `${cls.toyList}`);

  static headRoot = Tag.create(Tags.div);

  constructor(root: HTMLElement) {
    super(root);

    EventEmitter.subscribe('change:filter', () => {
      Toy.filterList();
      Cards.renderCrads();
      Cards.renderHead();
    });

    EventEmitter.subscribe('change:sorter', () => {
      Toy.sortList();
      Cards.renderCrads();
    });

    EventEmitter.subscribe('reset:filter', () => {
      Toy.filterList();
      Toy.sortList();
      Cards.renderCrads();
      Cards.renderHead();
    });

    EventEmitter.subscribe('reset:storage', () => {
      Toy.sortList();
      Cards.renderHead();
    });

    Toy.filter.filter.favourite = LS.ls.fav;
    Toy.filter.filter = LS.ls.filter;
    Toy.filter.filter.favourite = LS.ls.fav;
    Toy.filter.sorter = LS.ls.sorter;
  }

  static renderCrads() {
    Cards.toyList.innerHTML = '';

    if (Toy.filterd.length === 0) {
      Cards.toyList.innerHTML = lng.sorry;
    } else {
      Toy.filterd.forEach((element) => {
        const toy = new Card(Cards.toyList, element);
        toy.register();
      });
    }
  }

  static renderHead() {
    const head = `
      <div class=${cls.toysHead}>${lng.toys} (${Toy.filterd.length})</div>
    `;

    const headTpl = <HTMLTemplateElement>Tag.create(Tags.tpl);
    headTpl.innerHTML = head;

    Cards.headRoot.innerHTML = '';
    Cards.headRoot.append(headTpl.content);
  }

  async register() {
    await Toy.getList();

    const btn = Tag.create(Tags.btn, cls.reset);
    btn.textContent = lng.clearFilter;
    btn.addEventListener('click', () => {
      Toy.resetFilter();
    });

    const btnClear = Tag.create(Tags.btn, `${cls.reset} ${cls.resetML}`);
    btnClear.textContent = lng.clearStorage;
    btnClear.addEventListener('click', () => {
      Toy.resetStorage();
    });

    Cards.renderHead();
    this.root.append(Cards.headRoot, Cards.toyList);

    Cards.renderCrads();
    Cards.toyList.before(btn, btnClear);
  }
}

export { Cards };
