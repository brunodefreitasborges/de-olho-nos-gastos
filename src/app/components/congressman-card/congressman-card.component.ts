import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Congressmen } from 'src/app/integration/congressmen/congressmen.model';

@Component({
  selector: 'app-congressman-card',
  templateUrl: './congressman-card.component.html',
})
export class CongressmanCardComponent {
  @Input() congressmen?: Congressmen;
  @Output() details: EventEmitter<string> = new EventEmitter;

  onDetails(id: number) {
    this.details.emit(id.toString());
  }
}
