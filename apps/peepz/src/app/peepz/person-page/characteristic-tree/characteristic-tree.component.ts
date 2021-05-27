import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { Characteristic, Person } from 'libs/api-interfaces/src';
import { BehaviorSubject } from 'rxjs';
import { PersonService } from '../../person.service';
import { v4 as uuidv4 } from 'uuid';
import { CryptoService } from '../../../crypto.service';

/** Flat to-do item node with expandable and level information */
export class CharacteristicFlatNode {
  name: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'peepz-characteristic-tree',
  templateUrl: './characteristic-tree.component.html',
  styleUrls: ['./characteristic-tree.component.scss'],
})
export class CharacteristicTreeComponent implements OnInit {
  @Input() characteristicGroup: Characteristic;
  @Input() person: Person;
  dataChange = new BehaviorSubject<Characteristic[]>([]);

  get data(): Characteristic[] {
    return this.dataChange.value;
  }

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CharacteristicFlatNode, Characteristic>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<Characteristic, CharacteristicFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: CharacteristicFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<CharacteristicFlatNode>;

  treeFlattener: MatTreeFlattener<Characteristic, CharacteristicFlatNode>;

  dataSource: MatTreeFlatDataSource<Characteristic, CharacteristicFlatNode>;

  constructor(
    private personService: PersonService,
    private _snackBar: MatSnackBar,
    public cryptoService: CryptoService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<CharacteristicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.dataChange.subscribe((data) => {
      this.dataSource.data = data;
      this.treeControl.expandAll();
    });
  }
  ngOnInit(): void {
    this.dataChange.next([this.characteristicGroup]);
  }

  /** The selection for checklist */
  checklistSelection = new SelectionModel<CharacteristicFlatNode>(
    true /* multiple */
  );
  getLevel = (node: CharacteristicFlatNode) => node.level;

  isExpandable = (node: CharacteristicFlatNode) => node.expandable;

  getChildren = (node: Characteristic): Characteristic[] =>
    node.characteristics;

  hasChild = (_: number, _nodeData: CharacteristicFlatNode) =>
    _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: CharacteristicFlatNode) =>
    _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: Characteristic, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : new CharacteristicFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = true;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /* Get the parent node of a node */
  getParentNode(node: CharacteristicFlatNode): CharacteristicFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewNode(node: CharacteristicFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    if (!parentNode.characteristics) {
      parentNode.characteristics = [];
    }
    if (parentNode.characteristics) {
      const newCharacteristic: Characteristic = {
        id: uuidv4(),
        name: '',
        characteristics: [],
      };
      parentNode.characteristics.push(newCharacteristic);
      this.dataChange.next(this.data);
    }
    this.treeControl.expand(node);
    this.persist();
  }

  nodeNameChange(event, node: CharacteristicFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    parentNode.name = this.cryptoService.encrypt(event.target.value);
    this.persist();
  }
  deleteNode(node: CharacteristicFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.deleteItem(parentNode!);
    this.persist();
  }
  deleteItem(characteristic: Characteristic) {
    this.data.forEach((element) => {
      this.removeCharacteristic(element, characteristic);
    });
    this.dataChange.next(this.data);
  }
  private removeCharacteristic(
    parent: Characteristic,
    characteristic: Characteristic
  ) {
    parent.characteristics = parent.characteristics.filter(
      (otherCharacteristic) => otherCharacteristic.id !== characteristic.id
    );
    parent.characteristics.forEach((otherCharacteristic) => {
      this.removeCharacteristic(otherCharacteristic, characteristic);
    });
  }

  private persist() {
    if (!this.cryptoService.isEncrypted()) {
      this.personService.update(this.person.id, this.person).subscribe(
        (success) => {
          console.log({ local: this.person, server: success });
          this._snackBar.open('Saved', 'Ok', { duration: 500 });
        },
        (error) => {
          console.error(error);
          this._snackBar.open(`Error - ${error.message}`, 'Ok');
        }
      );
    } else {
      this._snackBar.open('NOT Saved - Please decrypt first', 'Ok', {
        duration: 1000,
      });
    }
  }
}
